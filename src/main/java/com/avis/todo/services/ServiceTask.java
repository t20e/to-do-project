package com.avis.todo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.avis.todo.models.Task;
import com.avis.todo.repositories.RepoTask;

@Service
public class ServiceTask {
	@Autowired
	private RepoTask taskRepo;
	
	//	create taske
	public Task createTask(Task t) {
		System.out.println(t.getDue());
		return this.taskRepo.save(t);
	}
	//get all tasks
	public List<Task> getAllTasks(){
		return (List<Task>)this.taskRepo.findAll();
	}
	//get one task
	public Task getOneTask(Long id) {
		return this.taskRepo.findById(id).orElse(null);
	}
	//update task
	public Task updateTask(Task t) {
		return this.taskRepo.save(t);
	}
	
	
	
}
