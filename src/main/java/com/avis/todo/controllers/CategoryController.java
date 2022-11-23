package com.avis.todo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.avis.todo.models.Category;
import com.avis.todo.models.Task;
import com.avis.todo.models.User;
import com.avis.todo.services.ServiceCategory;
import com.avis.todo.services.ServiceUser;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class CategoryController {
	@Autowired
	private ServiceCategory categoryService;
	@Autowired
	private ServiceUser servUser;

	@PostMapping(value = "/category/add", consumes = MediaType.APPLICATION_JSON_VALUE)
	// @RequestMapping(value = "/category/add", method = {RequestMethod.GET, RequestMethod.POST})
	public ResponseEntity addCategory(@Valid @RequestBody Category category, BindingResult result,
			HttpSession session) {
		HashMap<String, Object> validations = new HashMap<>();
		if (result.hasErrors()) {
			validations.put("validations", "failed");
			return new ResponseEntity<>(validations, HttpStatus.OK);
		}
		User user = this.servUser.getOneUser((Long) session.getAttribute("loggedInUserId"));
		category.setUser(user);
		category = categoryService.createCategory(category);
		validations.put("validations", "passed");
		validations.put("category_id", category.getId());
		validations.put("category_priority", category.getPriority());
		validations.put("purpose", "category");
		return new ResponseEntity<>(validations, HttpStatus.OK);
	}

	@GetMapping("/category/{id}")
	public HashMap allTasksForCat(@PathVariable("id") Long id) {
		Category category = categoryService.getOneCategory(id);
		HashMap responseJson = new HashMap<>() {
			{
				// put("category", category);
				put("category_name", category.getName());
				put("category_id", category.getId());
				put("purpose", "category");

			}
		};
		List divideTasks = new ArrayList();
		for (Task task : category.getTasks()) {
			HashMap<String, Object> allTaskHashMap = new HashMap<>() {
				{
					put("id", task.getId());
					put("name", task.getName());
					put("due", task.getDue());
					put("priority", task.getPriority());
					put("location", task.getLocation());
					put("notes", task.getNotes());
					put("complete", task.getComplete());
					put("createdAt", task.getCreatedAt());
					put("updatedAt", task.getUpdatedAt());
				}
			};
			divideTasks.add(allTaskHashMap);
		}
		if(divideTasks.size() > 0){
			responseJson.put("allTaskPerCat", divideTasks);
			return responseJson;

		}else{
			responseJson.put("task_in_this_cat", false);
			return responseJson;
		}
	}

	@GetMapping("/category/getCat/{id}")
	public Category getOneCat(@PathVariable("id") Long id) {
		Category cat = categoryService.getOneCategory(id);
		return cat;
	}
}