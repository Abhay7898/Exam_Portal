package com.exam.service;

import java.util.List;

import com.exam.model.exam.Category;
import com.exam.model.exam.Quiz;

public interface QuizService {

	public Quiz addQuiz(Quiz quiz);
	
	public Quiz updateQuiz(Quiz quiz);
	
	public Quiz updateByData(Quiz quiz);

	public List<Quiz> getQuizzes();
	
	public Quiz getQuiz(Long qid);

	public void deleteQuiz(Long qid);

	public List<Quiz> getQuizzesOfCategory(Category category);
	
	public List<Quiz> getActiveQuiz();

	public List<Quiz> getActiveQuizByCategory(Category category);


}
