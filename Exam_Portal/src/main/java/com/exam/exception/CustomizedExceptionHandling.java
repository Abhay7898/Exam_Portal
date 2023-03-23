package com.exam.exception;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.exam.utils.Constants;

import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice
public class CustomizedExceptionHandling extends ResponseEntityExceptionHandler {

	@ExceptionHandler(QuizNotFoundException.class)
	public ResponseEntity<Object> exceptionHandler(QuizNotFoundException ex) {
		log.error("!!!!!!!!! Exception found quiz Not Found : {}", ex.getMessage());
		List<String> details = new ArrayList<>();
		details.add(ex.getLocalizedMessage());
		var error = new ExceptionResponse(Constants.NO_QUIZ_FOUND, details);
		error.setExcepion(ex.getClass().getSimpleName());
		return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(UserFoundException.class)
	public ResponseEntity<?> exceptionHandler(UserFoundException ex) {
		log.error("!!!!!!!!! Exception found user Found : {}", ex.getMessage());
		List<String> details = new ArrayList<>();
		details.add(ex.getLocalizedMessage());
		var error = new ExceptionResponse(Constants.USER_ALREADY_REGISTER, details);
		error.setExcepion(ex.getClass().getSimpleName());
		return new ResponseEntity<>(error, HttpStatus.CONFLICT);

	}
	
	@ExceptionHandler(UserNameFoundException.class)
	public ResponseEntity<?> exceptionHandler(UserNameFoundException ex) {
		log.error("!!!!!!!!! Exception found user Found : {}", ex.getMessage());
		List<String> details = new ArrayList<>();
		details.add(ex.getLocalizedMessage());
		var error = new ExceptionResponse(Constants.USER_NAME_ALREADY_EXIST, details);
		error.setExcepion(ex.getClass().getSimpleName());
		return new ResponseEntity<>(error, HttpStatus.CONFLICT);

	}

	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<?> userNotExceptionHandler(UserNotFoundException ex) {
		log.error("!!!!!!!!! Exception found user Not Found : {}", ex.getMessage());
		List<String> details = new ArrayList<>();
		details.add(ex.getLocalizedMessage());
		var error = new ExceptionResponse(Constants.USER_NOT_FOUND, details);
		error.setExcepion(ex.getClass().getSimpleName());
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);

	}

	@ExceptionHandler(DataNotFoundException.class)
	public ResponseEntity<Object> dataNotFoundExceptionHandler(DataNotFoundException ex, WebRequest request,
			HttpServletResponse response) {
		log.error("!!!!!!!!! Exception found Data Not Found : {}", ex.getMessage());
		List<String> details = new ArrayList<>();
		details.add(ex.getLocalizedMessage());
		var error = new ExceptionResponse(Constants.INVALID_REQUEST, details);
		error.setExcepion(ex.getClass().getSimpleName());
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(UsernameNotFoundException.class)
	public ResponseEntity<Object> userNameNotFoundExceptionHandler(UsernameNotFoundException ex, WebRequest request,
			HttpServletResponse response) {
		log.error("!!!!!!!!! Exception found User Data Not Found : {}", ex.getMessage());
		List<String> details = new ArrayList<>();
		details.add(ex.getLocalizedMessage());
		var error = new ExceptionResponse(Constants.USER_NOT_FOUND, details);
		error.setExcepion(ex.getClass().getSimpleName());
		return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<Object> exceptionHandler(Exception ex, WebRequest request,
			HttpServletResponse response) {
		log.error("!!!!!!!!! Exception : {}", ex.getMessage());
		List<String> details = new ArrayList<>();
		details.add(ex.getLocalizedMessage());
		var error = new ExceptionResponse(Constants.EXCEPTION + ex.getMessage(), details);
		error.setExcepion(ex.getClass().getSimpleName());
		return new ResponseEntity<>(error, HttpStatus.EXPECTATION_FAILED);
	}
	
	
	@ExceptionHandler(ExpiredJwtTokenException.class)
	public ResponseEntity<Object> expiredJwtExceptionHandler(ExpiredJwtTokenException ex, WebRequest request,
			HttpServletResponse response) {
		log.error("!!!!!!!!! Exception Jwt Token Expired !!! : {}", ex.getMessage());
		List<String> details = new ArrayList<>();
		details.add(ex.getLocalizedMessage());
		var error = new ExceptionResponse(Constants.JWT_TOKEN_EXPIRED, details);
		error.setExcepion(ex.getClass().getSimpleName());
		return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
	}
	
}
