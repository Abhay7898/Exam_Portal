package com.exam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.exam.model.exam.Category;
import com.exam.model.exam.Quiz;

import jakarta.transaction.Transactional;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

	List<Quiz> findByCategory(Category category);
	
	List<Quiz> findByActive(Boolean b);
	
	List<Quiz> findByCategoryAndActive(Category category, Boolean b);
	
	@Modifying
	@Transactional
	@Query("UPDATE Quiz SET title = :title, description = :description, maxMarks = :maxMarks, numberOfQuestions = :numberOfQuestions, active = :active WHERE qid = :qid")
	public void updateQuizByData(@Param("title") String title, @Param("description") String description, @Param("maxMarks") String maxMarks, @Param("numberOfQuestions") String numberOfQuestions, @Param("active") boolean active, @Param("qid") Long qid);


}
