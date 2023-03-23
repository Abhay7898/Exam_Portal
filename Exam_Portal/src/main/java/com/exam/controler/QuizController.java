package com.exam.controler;

import java.util.List;

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

import com.exam.model.exam.Category;
import com.exam.model.exam.Quiz;
import com.exam.service.QuizService;
import com.exam.utils.API_Constants;
import com.exam.utils.Constants;


@RestController
@RequestMapping(API_Constants.QUIZ)
@CrossOrigin
public class QuizController {

	@Autowired
	QuizService quizService;
	
	@PostMapping("/")
	public ResponseEntity<?> addQuiz(@RequestBody Quiz auQuiz)  {
		
		Quiz quiz = quizService.addQuiz(auQuiz);
		if(quiz == null) {
			return ResponseEntity.ok(Constants.NO_QUIZ_FOUND);
		}
		return ResponseEntity.ok(quiz);
	}

	@PutMapping("/")
	public ResponseEntity<?> updateQuiz(@RequestBody Quiz quiz) {
		return ResponseEntity.ok(quizService.updateQuiz(quiz));
	}
	
	@PutMapping("/update")
	public ResponseEntity<?> updateQuizBaseOnParameter(@RequestBody Quiz quiz) {
		return ResponseEntity.ok(quizService.updateByData(quiz));
	}
	
	@GetMapping("/")
	public ResponseEntity<?> getQuizzes() {
		return ResponseEntity.ok(this.quizService.getQuizzes());
	}
	
	@GetMapping(API_Constants.QUIZ_ID)
	public Quiz getQuiz(@PathVariable("quizId") Long quLong) {
		return quizService.getQuiz(quLong);
	}

	@DeleteMapping(API_Constants.QUIZ_ID)
	public void deleteQuiz(@PathVariable("quizId") Long caLong) {
		this.quizService.deleteQuiz(caLong);
	}
	
	@GetMapping(API_Constants.CATEGORY_CID)
	public List<Quiz> getQuizzesOfCategory(@PathVariable("cid") Long cid) {
		Category category = new Category();
		category.setCid(cid);
		return quizService.getQuizzesOfCategory(category);
	}
	
	@GetMapping(API_Constants.ACTIVE)
	public List<Quiz> getActiveQuizzes() {
		return quizService.getActiveQuiz();
	}
	
	@GetMapping(API_Constants.QUIZ_ACTIVE)
	public List<Quiz> getActiveQuizzes(@PathVariable("cid") Long cid) {
		Category category = new Category();
		category.setCid(cid);
		return quizService.getActiveQuizByCategory(category);
	}
	

}
