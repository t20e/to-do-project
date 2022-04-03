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
import com.avis.todo.services.ServiceCategory;

@Controller
public class CategoryController {
	@Autowired
	private ServiceCategory categoryService;
	
	@PostMapping("/category/add")
	public String addCategory(@Valid @ModelAttribute("categoryForm")DbCategory category, BindingResult result, Model view ) {
		if(result.hasErrors()) {
			view.addAttribute("taskForm", new Task());
			return "home.jsp";
		}
		DbCategory addCategory = this.categoryService.createCategory(category);
		return "redirect:/";
	}
	@GetMapping("category/{id}")
	public String showAlltasksForOneCategory(@PathVariable("id") DbCategory categoryid, RedirectAttributes redirectAttributes) {
		redirectAttributes.addFlashAttribute("categoryId", categoryid);
		return "redirect:/";
	}


}
