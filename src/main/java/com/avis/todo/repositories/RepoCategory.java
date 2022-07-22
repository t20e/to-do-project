package com.avis.todo.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.avis.todo.models.Category;

@Repository
public interface RepoCategory extends CrudRepository<Category, Long> {

//	get a list of categories in order of there priority
}
