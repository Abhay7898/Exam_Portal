package com.exam.model.dto;

import jakarta.persistence.Lob;
import lombok.Data;

@Data
public class UserDTO {

	private Long id;
	private String username;
	private String password;
	private String firstName;
	private String lastName;
	private String email;
	private String phone;
	private boolean enabled = true;
	private String profile;
	@Lob
	private String imageData;


}
