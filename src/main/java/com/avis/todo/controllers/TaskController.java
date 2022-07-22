package com.avis.todo.controllers;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.avis.todo.models.Category;
import com.avis.todo.models.Task;
import com.avis.todo.models.User;
import com.avis.todo.repositories.RepoTask;
import com.avis.todo.repositories.RepoUser;
import com.avis.todo.services.ServiceCategory;
import com.avis.todo.services.ServiceTask;
import com.avis.todo.services.ServiceUser;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class TaskController {
	@Autowired
	private ServiceTask taskServ;
	@Autowired
	private ServiceUser userServ;
	@Autowired
	private ServiceCategory catServ;

	@GetMapping("/task/getAll")
	public List getAllTasks(HttpSession session) {
		User user = userServ.getOneUser((Long) session.getAttribute("loggedInUserId"));
		List allTasksPerUser = user.getTasks();
		return allTasksPerUser;
	}

	@PostMapping(value = "/task/add", consumes = MediaType.APPLICATION_JSON_VALUE)
	public HashMap addTask(@Valid @RequestBody Task task, BindingResult result, HttpSession session) {
		HashMap response = new HashMap<>();
		if (result.hasErrors()) {
			System.out.println(result.getAllErrors());
			response.put("validations", "failed");
			response.put("formErrors", "");
			return response;
		}
		task.setUser(this.userServ.getOneUser((Long) session.getAttribute("loggedInUserId")));
		this.taskServ.createTask(task);
		response.put("purpose", "task");
		response.put("validations", "passed");
		// only put this to check if the category is right
		System.out.println(task.getCategory());
		response.put("cat", task.getCategory());
//		System.out.println(catServ.getOneCategory( (Long) task.getCategory()));
		return response;
	}

	// @GetMapping("/category/alltasks/{userId}")
	// public String showAllTasks(@PathVariable("userId")User userId,
	// RedirectAttributes redirectAttributes ) {
	// redirectAttributes.addFlashAttribute("userId", userId);
	// return "redirect:/";
	// }
}
