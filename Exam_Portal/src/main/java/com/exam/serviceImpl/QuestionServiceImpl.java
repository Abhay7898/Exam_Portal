package com.exam.serviceImpl;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.repository.QuestionRepository;
import com.exam.service.QuestionService;

@Service
public class QuestionServiceImpl implements QuestionService {

	@Autowired
	QuestionRepository questionRepository;

	@Override
	public Question addQuestion(Question question) {
		return this.questionRepository.save(question);
	}

	@Override
	public Question updateQuestion(Question question) {
		return this.questionRepository.save(question);
	}

	@Override
	public List<Question> getQuestions() {
		return this.questionRepository.findAll();
	}

	@Override
	public Question getQuestion(Long qid) {
		return this.questionRepository.findById(qid).get();
	}

	@Override
	public Set<Question> getQuestionsOfQuiz(Quiz quiz) {
		return this.questionRepository.findByQuiz(quiz);
	}

	@Override
	public void deleteQuestion(Long qid) {
		this.questionRepository.deleteById(qid);		
	}

	@Override
	public Question getQustionWithAnswer(Long qusId) {
		return questionRepository.findById(qusId).get();
	}
	
	


}
