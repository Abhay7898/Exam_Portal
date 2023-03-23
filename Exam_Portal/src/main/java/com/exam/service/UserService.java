package com.exam.service;

import java.util.List;
import java.util.Set;

import com.exam.model.User;
import com.exam.model.UserRole;

public interface UserService {

	public User creatUser(User user, Set<UserRole> userRoles);

	public User getUserByUserName(String userName);

	public boolean deleteUserByUserId(Long userName);

	public User getUserByUserId(Long userId);

	public User updateUser(User user);
	
	public List<User> getAllUsersNormal();
	
	

}
