package com.exam.exception;

import com.exam.utils.Constants;

public class QuizNotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;


	public QuizNotFoundException() {
		super(Constants.NO_QUIZ_FOUND);
	}
	
	
	public QuizNotFoundException(String msg){
		super(msg);
	}
	
}
