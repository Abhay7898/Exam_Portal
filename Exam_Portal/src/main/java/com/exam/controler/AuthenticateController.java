package com.exam.controler;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.exam.config.JwtUtil;
import com.exam.model.JwtRequest;
import com.exam.model.JwtResponse;
import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.repository.RoleRepository;
import com.exam.utils.API_Constants;
import com.exam.utils.Constants;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@CrossOrigin("*")
@RestController
public class AuthenticateController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private JwtUtil jwtUtil;
	
	String password = null;
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@PostMapping(API_Constants.GENERATE_TOKEN)
	public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest){
		try {
			password = jwtRequest.getPassword();
			authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());
			
		} catch (UsernameNotFoundException e) {
			log.error(Constants.USER_NOT_FOUND + e.getMessage());
			throw new UsernameNotFoundException(Constants.USER_NOT_FOUND);
		}
		UserDetails userDetails = this.userDetailsService.loadUserByUsername(jwtRequest.getUsername());
		String token = this.jwtUtil.generateToken(userDetails);
		log.info(Constants.TOKEN_SUCCESSFULL_GENERATED);
		return ResponseEntity.ok(new JwtResponse(token));
	}
		
	private void authenticate(String userName, String password) {

		try {

			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userName, password));
		} catch (DisabledException e) {
			log.error(Constants.USER_DISABLED + e.getMessage());
		} catch (BadCredentialsException e) {
			log.error(Constants.INVALID_DETAILS + e.getMessage());
		} catch (Exception e) {
			log.error(Constants.EXCEPTION + e.getMessage());
		}
	}
	
	@GetMapping(API_Constants.CURRENT_USER)
	public User getCurrentUser(Principal principal) {
		User user = (User) this.userDetailsService.loadUserByUsername(principal.getName());	
		Role role = this.roleRepository.findById(user.getId()).get();
		UserRole us = new UserRole();
		us.setRole(role);
		user.getUserRoles().add(us);
		user.setPasswordMatch(bCryptPasswordEncoder.matches(password, user.getPassword()));
		return user;
	}
}
