package com.avis.todo.controllers;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.avis.todo.models.DbCategory;
import com.avis.todo.models.Task;
import com.avis.todo.models.User;
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
	public String home(Model view, HttpSession session, @ModelAttribute("categoryId")DbCategory categoryId, @ModelAttribute("userId")User userIdToShowAllTasksWhenSelected ) {
		Long idInSession = (Long) session.getAttribute("loggedInUserId");
		if( idInSession == null ) {
			return "redirect:/login";
		}
		view.addAttribute("user", this.userService.getOneUser(idInSession));
		view.addAttribute("categoryForm", new DbCategory());
		if(categoryId != null) {
//			if one category is selected
			System.out.println("select category is not null");
			view.addAttribute("categoryToShow", this.categoryService.getOneCategory(categoryId.getId()) );
		}else if (userIdToShowAllTasksWhenSelected != null) {
//			if show all tasks is selected 
			System.out.println(" all tasks is not null");
			view.addAttribute("categoryToShow", this.taskService.getAllTasks());
		}
		view.addAttribute("taskForm", new Task());
		view.addAttribute("allTasks", this.taskService.getAllTasks());
		System.out.println("current category to show " + categoryId.getId());
		System.out.println(idInSession);
		
		return "home.jsp";
	}
	
	
	
	
	
}
