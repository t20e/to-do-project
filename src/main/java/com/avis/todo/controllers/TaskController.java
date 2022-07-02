package com.avis.todo.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.avis.todo.models.DbCategory;
import com.avis.todo.models.Task;
import com.avis.todo.models.User;
import com.avis.todo.repositories.RepoTask;
import com.avis.todo.repositories.RepoUser;
import com.avis.todo.services.ServiceTask;
import com.avis.todo.services.ServiceUser;

@RestController
@RequestMapping("/api")
public class TaskController {
	@Autowired
	private ServiceTask taskServ;
	@Autowired
	private ServiceUser userServ;
	
	@GetMapping("/task/getAll")
	public List getAllTasks (HttpSession session) {
		User user = userServ.getOneUser( (Long) session.getAttribute("loggedInUserId"));
		List allTasksPerUser = user.getTasks();
		return allTasksPerUser;
	}
	
	@PostMapping(value = "/task/add" , consumes =  MediaType.APPLICATION_JSON_VALUE)
	public HashMap addTask(@Valid @RequestBody Task task, BindingResult result, HttpSession session) {
		HashMap response= new HashMap<>() {{put("here", "here");}};
		if(result.hasErrors()) {
			response.put("validations", "failed");
		}
		task.setUser(this.userServ.getOneUser((Long) session.getAttribute("loggedInUserId")));
		task = taskServ.createTask(task);
		response.put("purpose", "task");
		response.put("validations", "passed");
		return response;
	}
	
//	@GetMapping("/category/alltasks/{userId}")
//	public String showAllTasks(@PathVariable("userId")User userId, RedirectAttributes redirectAttributes  ) {
//		redirectAttributes.addFlashAttribute("userId", userId);
//		return "redirect:/";
//	}
}
