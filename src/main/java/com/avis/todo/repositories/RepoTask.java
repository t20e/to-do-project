package com.avis.todo.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.avis.todo.models.Task;

@Repository
public interface RepoTask extends CrudRepository<Task, Long> {
//	List<Task> findAllBYCategoryId(Long id);
	//get a list of tasks in priority order
}
