package com.exam.service;

import java.util.List;
import java.util.Set;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;

public interface QuestionService {

	public Question addQuestion(Question question);

	public Question updateQuestion(Question question);

	public List<Question> getQuestions();

	public Question getQuestion(Long qid);

	public void deleteQuestion(Long qid);
	
	public Set<Question> getQuestionsOfQuiz(Quiz quiz);
	
	public Question getQustionWithAnswer(Long qusId);
}
