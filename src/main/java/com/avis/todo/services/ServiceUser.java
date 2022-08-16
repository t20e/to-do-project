package com.avis.todo.services;

import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import com.avis.todo.models.LoginUser;
import com.avis.todo.models.User;
import com.avis.todo.repositories.RepoUser;

@Service
public class ServiceUser {
	@Autowired
	private RepoUser repoUser;

	// get one user by id
	public User getOneUser(Long id) {
		return this.repoUser.findById(id).orElse(null);
	}

	// update User
	public User updateUser(User u) {
		return this.repoUser.save(u);
	}

	// register user
	public User register(User newUser, BindingResult result) {
		Optional<User> checkNewUserEmail = this.repoUser.findByEmail(newUser.getEmail());
		if (checkNewUserEmail.isPresent()) {
			result.rejectValue("email", "emailTaken", "email is taken!");
		}
		if (!newUser.getPassword().equals(newUser.getConfirmPassword())) {
			result.rejectValue("password", "passwordDontMatch", "passwords must match!");
		}
		if (result.hasErrors()) {
			return null;
		} else {
			String hashed = BCrypt.hashpw(newUser.getPassword(), BCrypt.gensalt());
			newUser.setPassword(hashed);
			return this.repoUser.save(newUser);
		}
	}

	// login
	public User login(LoginUser loginUser, BindingResult result) {
		Optional<User> checkUserEmail = this.repoUser.findByEmail(loginUser.getEmail());
		if (!checkUserEmail.isPresent()) {
			result.rejectValue("email", "emailNotFound", "invalid email/password");
		} else {
			if (!BCrypt.checkpw(loginUser.getPassword(), checkUserEmail.get().getPassword())) {
				result.rejectValue("password", "invalidPassword", "invalid email/password");
			}
		}
		if (result.hasErrors()) {
			return null;
		} else {
			return checkUserEmail.get();
		}
	}

}
