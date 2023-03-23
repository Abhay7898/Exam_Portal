package com.exam.exception;

import com.exam.utils.Constants;

public class UserNameFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;


	public UserNameFoundException() {
		super(Constants.USER_NAME_ALREADY_EXIST);
	}
	
	
	public UserNameFoundException(String msg){
		super(msg);
	}
	
}
