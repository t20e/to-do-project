package com.avis.todo.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.avis.todo.models.DbCategory;
import com.avis.todo.models.Task;
import com.avis.todo.models.User;
import com.avis.todo.repositories.RepoTask;

@Controller
public class TaskController {
	@Autowired
	private RepoTask taskRepo;
	
	@PostMapping("/task/add")
	public String addTask(@Valid @ModelAttribute("taskForm")Task task, BindingResult result, Model view ) {
		if(result.hasErrors()){
			view.addAttribute("categoryForm", new DbCategory());
			System.out.println("error adding task");
			return "home.jsp";
		}
		task = this.taskRepo.save(task);
		return "redirect:/";
	}
	@GetMapping("/category/alltasks/{userId}")
	public String showAllTasks(@PathVariable("userId")User userId, RedirectAttributes redirectAttributes  ) {
		redirectAttributes.addFlashAttribute("userId", userId);
		return "redirect:/";
	}
}
