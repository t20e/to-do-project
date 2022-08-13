package com.avis.todo.controllers;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.avis.todo.models.Category;
import com.avis.todo.models.Task;
import com.avis.todo.services.ServiceCategory;
import com.avis.todo.services.ServiceTask;
import com.avis.todo.services.ServiceUser;

@Controller
public class MainController {
	@Autowired
	private ServiceUser userService;
	@Autowired
	private ServiceTask taskService;
	@Autowired
	private ServiceCategory categoryService;
	
	@GetMapping("/")
	public String home(Model view, HttpSession session ) {
		Long idInSession = (Long) session.getAttribute("loggedInUserId");
		if( idInSession == null ) {
			return "redirect:/login";
		}
		view.addAttribute("user", this.userService.getOneUser(idInSession));
//		view.addAttribute("categoryForm", new Category());
//		view.addAttribute("taskForm", new Task());
		return "home.jsp";
	}
	
	
	
	
	
}
