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
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.jsonFormatVisitors.JsonArrayFormatVisitor;

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
		if (result.hasErrors()) {
			HashMap<String, String> validations = new HashMap<>(){{
				put("validations", "failed");
			}};
			return new ResponseEntity<>(validations, HttpStatus.OK);
		}
		User user = this.servUser.getOneUser( (Long) session.getAttribute("loggedInUserId"));
		out.println(user);
		category.setUser(user);
		category = categoryService.createCategory(category);
		HashMap<String, Object> validations = new HashMap<>(){{
			put("validations", "passed");
		}};
		validations.put("category_id", category.getId());
		validations.put("category_priority", category.getPriority());
		return new ResponseEntity<>(validations, HttpStatus.OK);
	}
	@GetMapping("/category/{id}")
	public List getAllTasksPerCat(@PathVariable("id") Long id){
		DbCategory category = categoryService.getOneCategory(id);
		List allTasksForCat = category.getTasks();
		out.print(allTasksForCat);
		return allTasksForCat;
	}
}
