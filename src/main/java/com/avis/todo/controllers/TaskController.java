package com.avis.todo.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.avis.todo.models.Category;
import com.avis.todo.models.Task;
import com.avis.todo.models.User;
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
	public HashMap getAllTasks(HttpSession session) {
		User user = userServ.getOneUser((Long) session.getAttribute("loggedInUserId"));
		List<Task> tasks = user.getTasks();
		List divideTasks = new ArrayList();
		for (Task task : tasks) {
			HashMap<String, Object> allTaskHashMap = new HashMap<>() {
				{
					put("id", task.getId());
					put("name", task.getName());
					put("due", task.getDue());
					put("priority", task.getPriority());
					put("location", task.getLocation());
					put("notes", task.getNotes());
					put("complete", task.getComplete());
				}
			};
			divideTasks.add(allTaskHashMap);
		}
		HashMap<String, Object> jsonRes = new HashMap<>() {
			{
				put("category_name", "All Tasks");
				put("allTaskPerCat", divideTasks);
				put("category_id", 0);
				put("purpose", "category");
			}
		};

		return jsonRes;
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
		task.setComplete(false);
//		System.out.printf("task complete: %s /n",task.getComplete());
		task.setUser(this.userServ.getOneUser((Long) session.getAttribute("loggedInUserId")));
		this.taskServ.createTask(task);
		response.put("purpose", "task");
		response.put("validations", "passed");
		// only put this to check if the category is right
		System.out.println(task.getCategory());
		Category cat = task.getCategory();
		response.put("cat", cat.getId());
		// System.out.println(catServ.getOneCategory( (Long) task.getCategory()));
		return response;
	}

	// since this get doesn't use json only a path variable then u don't need
	// consumes = MediaType.APPLICATION_JSON
	@GetMapping(value = "/task/forCalendar/{date}")
	public HashMap getTasksForCalendarHashMap(@PathVariable("date") String date, HttpSession session) {
		String year = date.substring(0, 4);
		String month = date.substring(4);
		System.out.printf("month: %s, year: %s %n",month, year);
		// use the date and year to query the db for all task for it
		List divideTasks = new ArrayList();
		List<Task> tasks = taskServ.getAllTasksInDate(month, year, (Long) session.getAttribute("loggedInUserId"));
		for (Task task : tasks) {
			System.out.println(task.getName());
			
			HashMap<String, Object> allTaskHashMap = new HashMap<>() {
				{
					put("id", task.getId());
					put("name", task.getName());
					put("due", task.getDue());
					put("priority", task.getPriority());
					put("location", task.getLocation());
					put("notes", task.getNotes());
					put("complete", task.getComplete());
				}
			};
			divideTasks.add(allTaskHashMap);
		}

		HashMap<String, Object> allTasksHashMap = new HashMap<>() {
			{
				put("year", year);
				put("tasks", divideTasks);
				put("month", month);
				put("purpose", "get_tasks_for_calendar");
			}
		};
		return allTasksHashMap;
	}
	@GetMapping(value = "/task/forCalendarToShow/{date}")
	public HashMap calendarTaskToDisplay(@PathVariable("date") String date, HttpSession session) {
		String year = date.substring(0, 4);
		String month = date.substring(4,6);
		String day = date.substring(6,8);
		System.out.printf("year; %s, month: %s, day: %s", year, month, day);
		List divideTasks = new ArrayList();
		List<Task> tasks = taskServ.getTaskForCal(year, month, day, (Long) session.getAttribute("loggedInUserId"));
		for (Task task : tasks) {
			HashMap<String, Object> allTaskHashMap = new HashMap<>() {
				{
					put("id", task.getId());
					put("name", task.getName());
					put("due", task.getDue());
					put("priority", task.getPriority());
					put("location", task.getLocation());
					put("notes", task.getNotes());
				}
			};
			divideTasks.add(allTaskHashMap);
		}

		HashMap<String, Object> allTasksHashMap = new HashMap<>() {
			{
				put("year", year);
				put("month", month);
				put("day",day);
				put("tasks", divideTasks);
				put("purpose", "showTaskOnCalendar");
			}
		};
		return allTasksHashMap;
	}
	
	@PostMapping(value = "/task/complete")
	public HashMap completeTask(HttpEntity<HashMap> httpEntity) {
		HashMap json = httpEntity.getBody();
		// System.out.printf("taskId: %s other var: %s", json.get("taskId"), json);
		Task task = taskServ.getOneTask(Long.valueOf(json.get("taskId").toString()));
		task.setComplete(!task.getComplete());
		taskServ.updateTask(task);
		// System.out.println(idLong.getClass());
		HashMap resJson = new HashMap<>() {
			{
				put("purpose", "completeTask");
				put("taskId", task.getId());
				put("complete", task.getComplete());
				put("validations", "passed");
			}
		};
		return resJson;
	}
}
