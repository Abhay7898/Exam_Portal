package com.exam.exception;

import com.exam.utils.Constants;

public class ExpiredJwtTokenException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;


	public ExpiredJwtTokenException() {
		super(Constants.JWT_TOKEN_EXPIRED);
	}
	
	
	public ExpiredJwtTokenException(String msg){
		super(msg);
	}
	
}
