package com.avis.todo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.avis.todo.models.DbCategory;
import com.avis.todo.models.Task;
import com.avis.todo.models.User;
import com.avis.todo.services.ServiceCategory;
import com.avis.todo.services.ServiceUser;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static java.lang.System.*;

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
	public ResponseEntity addCategory(@Valid @RequestBody DbCategory category, BindingResult result, HttpSession session) {
		HashMap<String, Object> validations = new HashMap<>();
		if (result.hasErrors()) {
				validations.put("validations", "failed");
			return new ResponseEntity<>(validations, HttpStatus.OK);
		}
		User user = this.servUser.getOneUser( (Long) session.getAttribute("loggedInUserId"));
		category.setUser(user);
		category = categoryService.createCategory(category);
		validations.put("validations", "passed");
		validations.put("category_id", category.getId());
		validations.put("category_priority", category.getPriority());
		validations.put("purpose", "category");
		return new ResponseEntity<>(validations, HttpStatus.OK);
	}

	@GetMapping("/category/{id}")
	public List allTasksForCat(@PathVariable("id") Long id){
		DbCategory category = categoryService.getOneCategory(id);
		List responseJson = new ArrayList<>();
		HashMap addName = new HashMap<>() {{
			put("category_name", category.getName());
		}};
		responseJson.add(addName);
		for(Task task: category.getTasks()) {
			HashMap<String, Object> allTaskHashMap = new HashMap<>() {{
			}};
			allTaskHashMap.put("id", task.getId());
			allTaskHashMap.put("name", task.getName());
			allTaskHashMap.put("due", task.getDue());
			allTaskHashMap.put("priority", task.getPriority());
			allTaskHashMap.put("location", task.getLocation());
			allTaskHashMap.put("notes", task.getNotes());
			allTaskHashMap.put("complete", task.getComplete());
			allTaskHashMap.put("createdAt", task.getCreatedAt());
			allTaskHashMap.put("updatedAt", task.getUpdatedAt());
			responseJson.add(allTaskHashMap);
		}
		out.print(responseJson.size());		
		
		if (responseJson.size() <= 1) {
			responseJson.add("no tasks for this category");
			responseJson.add(false);
			return responseJson;
		}
		return responseJson;
	}
}