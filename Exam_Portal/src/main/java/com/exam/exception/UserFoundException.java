package com.exam.exception;

import com.exam.utils.Constants;

public class UserFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;


	public UserFoundException() {
		super(Constants.USER_ALREADY_REGISTER);
	}
	
	
	public UserFoundException(String msg){
		super(msg);
	}
	
}
