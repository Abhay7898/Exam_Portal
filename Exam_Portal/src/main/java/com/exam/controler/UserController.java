package com.exam.controler;

import java.util.Base64;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.exam.exception.UserNameFoundException;
import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.model.dto.UserDTO;
import com.exam.repository.UserRepository;
import com.exam.service.UserService;
import com.exam.utils.API_Constants;
import com.exam.utils.Constants;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping(API_Constants.USER)
@CrossOrigin("*")
@Slf4j
public class UserController {

	@Autowired
	UserService userService;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	private UserRepository userRepository;

	@PostMapping("/")
	public ResponseEntity<Object> createUser(@RequestBody User user) {
		
		user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));
		Set<UserRole> s = new HashSet<>();
		UserRole us = new UserRole();
		Role r = new Role();
		r.setRoleName(user.getProfile());
		us.setRole(r);
		s.add(us);
		user.setUserRoles(s);
		User userRespose = userService.creatUser(user, user.getUserRoles());
		if(userRespose == null) {
			return ResponseEntity.ok(Constants.USER_ALREADY_REGISTER);
		}
		return ResponseEntity.ok(userRespose);
	}
	
	@PostMapping(API_Constants.UPDATE_USER)
	public ResponseEntity<Object> updateUser(@RequestBody UserDTO userRequest) {
		
		
		
		User user = userService.getUserByUserId(userRequest.getId());
		
		if(!userRequest.getUsername().equalsIgnoreCase(user.getUsername())) {
			User userLocal = userRepository.findByUserName(userRequest.getUsername());

			if (userLocal != null) {
				log.error(Constants.USER_NAME_ALREADY_EXIST);
				throw new UserNameFoundException();
			}
		}
		
		user.setUserName(userRequest.getUsername());
		user.setPassword(this.bCryptPasswordEncoder.encode(userRequest.getPassword()));
		user.setFirstName(userRequest.getFirstName());
		user.setLastName(userRequest.getLastName());
		user.setEmail(userRequest.getEmail());
		user.setPhone(userRequest.getPhone());
		user.setImageData(Base64.getEncoder().encodeToString(Base64.getDecoder().decode(userRequest.getImageData())));
		User updatedUser = userService.updateUser(user);
		return ResponseEntity.ok(updatedUser);
	}

	@GetMapping(API_Constants.USER_NAME)
	public User getUser(@PathVariable("username") String userName) {
		return userService.getUserByUserName(userName);
	}
	
	@GetMapping(API_Constants.USER_ONE_ID)
	public User getUserById(@PathVariable("userid") Long userId) {
		return userService.getUserByUserId(userId);
	}

	@DeleteMapping(API_Constants.USER_ID)
	public boolean deleteUser(@PathVariable("userid") Long userId) {
		return userService.deleteUserByUserId(userId);
	}
	
	@PostMapping(API_Constants.IMAGE)
	public void imageUpload(@PathVariable("userId") Long id, @RequestParam("file") MultipartFile file) {
		User user = userService.getUserByUserId(id);
		try {
			user.setImageData(Base64.getEncoder().encodeToString(file.getBytes()));
		} catch (Exception e) {
			log.error(e.getMessage());
		}
		userService.updateUser(user);
	}
	
	@GetMapping(API_Constants.ALL_USERS)
	public List<User> getAllUsers() {
		return userService.getAllUsersNormal();
	}
	
}
