package com.exam.serviceImpl;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.exception.UserFoundException;
import com.exam.exception.UserNotFoundException;
import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.repository.RoleRepository;
import com.exam.repository.UserRepository;
import com.exam.service.UserService;
import com.exam.utils.Constants;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Override
	public User creatUser(User user, Set<UserRole> userRoles) {

		User userLocal = this.userRepository.findByUserName(user.getUsername());

		if (userLocal != null) {
			log.error(Constants.USER_ALREADY_REGISTER);
			throw new UserFoundException();
		} else {

			userRoles.forEach(rl -> {
				roleRepository.save(rl.getRole());
			});

			user.getUserRoles().addAll(userRoles);

			userLocal = userRepository.save(user);

		}
		return userLocal;
	}

	@Override
	public User getUserByUserName(String userName) {
		User userLocal = this.userRepository.findByUserName(userName);
		if (userLocal == null) {
			throw new UserNotFoundException();
		}
		Role role = this.roleRepository.findById(userLocal.getId()).get();
		UserRole us = new UserRole();
		us.setRole(role);
		userLocal.getUserRoles().add(us);

		return userLocal;

	}

	@Override
	public boolean deleteUserByUserId(Long userId) {
		userRepository.deleteById(userId);
		return true;
	}

	@Override
	public User getUserByUserId(Long userId) {
		return userRepository.findById(userId).get();
	}

	@Override
	public User updateUser(User user) {
		return userRepository.save(user);
	}

	@Override
	public List<User> getAllUsersNormal() {
		List<User> list = userRepository.findAll().stream().filter(user -> user.getProfile().equalsIgnoreCase(Constants.NORMAL)).toList();
		list.forEach(u -> u.setImageData(null));
		return list;
	}

}
