package com.avis.todo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.avis.todo.models.Category;
import com.avis.todo.repositories.RepoCategory;

@Service
public class ServiceCategory {
	@Autowired
	private RepoCategory categoryRepo;
	
	//create category
	public Category createCategory(Category c) {
		return this.categoryRepo.save(c);
	}
	//get all categories
	public List<Category> getAllCategories(){
		return (List<Category>)this.categoryRepo.findAll();
	}
	//get one category by id
	public Category getOneCategory(Long id) {
		return this.categoryRepo.findById(id).orElse(null);
	}
	
	//	update Category
	public Category updateCategory(Category c) {
		return this.categoryRepo.save(c);
	}
//	//get all tasks where category id = 8
//	public Task getAllTasksFromCategory(Long id) {
//		return List<Task> 
//	}
	
	
}
