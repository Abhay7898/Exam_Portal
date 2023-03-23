package com.exam.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.exception.QuizNotFoundException;
import com.exam.model.exam.Category;
import com.exam.model.exam.Quiz;
import com.exam.repository.QuizRepository;
import com.exam.service.QuizService;

@Service
public class QuizServiceImpl implements QuizService {

	@Autowired
	QuizRepository quizRepository;
	
	@Override
	public Quiz addQuiz(Quiz quiz) {
		return this.quizRepository.save(quiz);
	}

	@Override
	public Quiz updateQuiz(Quiz quiz) {
		return this.quizRepository.save(quiz);
	}
	
	@Override
	public Quiz updateByData(Quiz quiz) {
		 this.quizRepository.updateQuizByData(quiz.getTitle(),quiz.getDescription(),quiz.getMaxMarks(),quiz.getNumberOfQuestions(),quiz.isActive(),quiz.getQid());
		 return quiz;
	}

	@Override
	public List<Quiz> getQuizzes() {
		return this.quizRepository.findAll();
	}

	@Override
	public Quiz getQuiz(Long qid) {
		try {
		return this.quizRepository.findById(qid).get();
		}catch (Exception e) {
			throw new QuizNotFoundException();
		}
	}

	@Override
	public void deleteQuiz(Long qid) {
		this.quizRepository.deleteById(qid);
			
	}

	@Override
	public List<Quiz> getQuizzesOfCategory(Category category) {
		return this.quizRepository.findByCategory(category);
	}

	@Override
	public List<Quiz> getActiveQuiz() {
		return this.quizRepository.findByActive(true);
	}

	@Override
	public List<Quiz> getActiveQuizByCategory(Category category) {
		return this.quizRepository.findByCategoryAndActive(category, true);
	}


}
