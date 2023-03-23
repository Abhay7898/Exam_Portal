package com.exam.controler;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;
import com.exam.utils.API_Constants;
import com.exam.utils.Constants;

@RestController
@RequestMapping(API_Constants.QUESTION)
@CrossOrigin
public class QuestionController {

	@Autowired
	QuestionService questionService;

	@Autowired
	QuizService quizService;

	@PostMapping("/")
	public ResponseEntity<?> addQuestion(@RequestBody Question question) {

		Question question2 = questionService.addQuestion(question);
		if (question2 == null) {
			return ResponseEntity.ok(Constants.NO_QUESTION_FOUND);
		}
		return ResponseEntity.ok(question2);
	}

	@PutMapping("/")
	public ResponseEntity<?> updateQuestion(@RequestBody Question question) {
		return ResponseEntity.ok(questionService.updateQuestion(question));
	}

	@GetMapping(API_Constants.QUIZ_QUIZ_ID)
	public ResponseEntity<?> getQuizzesOfQuiz(@PathVariable("questionId") Long quLong) {
		Quiz quiz = this.quizService.getQuiz(quLong);

		Set<Question> questions = questionService.getQuestionsOfQuiz(quiz);
		if(questions != null && !questions.isEmpty()) {
			questions.forEach(s -> s.setAnswer(""));
		}
		List<Question> list = new ArrayList<>(questions);
		if (list.size() > Integer.parseInt(quiz.getNumberOfQuestions())) {
			list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions() + 1));
		}

		Collections.shuffle(list);
		return ResponseEntity.ok(list);
	}

	@GetMapping(API_Constants.QUIZ_ALL_ID)
	public ResponseEntity<?> getQuestionOfQuizAdim(@PathVariable("questionId") Long quLong) {
		Quiz quiz = new Quiz();
		quiz.setQid(quLong);
		Set<Question> questions = questionService.getQuestionsOfQuiz(quiz);
		return ResponseEntity.ok(questions);
	}

	@GetMapping(API_Constants.QUESTION_ID)
	public Question getSingleQuestion(@PathVariable("questionId") Long quLong) {
		return questionService.getQuestion(quLong);
	}

	@DeleteMapping(API_Constants.QUESTION_ID)
	public void deleteQuiz(@PathVariable("questionId") Long caLong) {
		this.questionService.deleteQuestion(caLong);
	}

	@PostMapping(API_Constants.EVAL_QUIZ)
	public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questionList) {

		double marksGot = 0;
		int correctAnswers = 0;
		int attempted = 0;
		for(Question q : questionList) {
			Question question = this.questionService.getQustionWithAnswer(q.getQuesId());
			if(question.getAnswer().equalsIgnoreCase(q.getGivenAnswer())) {
				correctAnswers++;
				double marksSingle = Double.parseDouble(questionList.get(0).getQuiz().getMaxMarks())/questionList.size();
				marksGot += marksSingle;
			}
			if(q.getGivenAnswer() != null && !q.getGivenAnswer().trim().equals("")) {
				attempted++;
			}
		}
		
		Map<String, Object> map =Map.of("marksGot",marksGot,"correctAnswer",correctAnswers,"attempted" ,attempted); 		
		return ResponseEntity.ok(map);
	}
}
