package com.avis.todo.controllers;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.avis.todo.models.LoginUser;
import com.avis.todo.models.User;
import com.avis.todo.services.ServiceUser;

@Controller
public class UserController {

	@Autowired
	private ServiceUser servUser;
	
	//login
	@GetMapping("/login")
	public String login(Model view) {
		view.addAttribute("loginUser", new LoginUser());
		return "login.jsp";
	}
	@PostMapping("/logging")
	public String logging(@Valid @ModelAttribute("loginUser")LoginUser loginUser, BindingResult result, HttpSession session ) {
		User user = this.servUser.login(loginUser, result);
		if(result.hasErrors()) {
			return "login.jsp";
		}
		session.setAttribute("loggedInUserId", user.getId());
		return "redirect:/";
	}
	
	//register
	@GetMapping("/register")
	public String register(Model view) {
		view.addAttribute("newUser", new User());
		return "register.jsp";
	}
	@PostMapping("/registering")
	public String registeringUser(@Valid @ModelAttribute("newUser") User newUser, BindingResult result, HttpSession session ) {
		User user = this.servUser.register(newUser, result);
		if(result.hasErrors()) {
			return "register.jsp";
		}
		session.setAttribute("loggedInUserId", user.getId());
		return "redirect:/";
		
	}
}
