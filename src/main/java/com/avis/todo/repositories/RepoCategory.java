package com.avis.todo.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.avis.todo.models.DbCategory;

@Repository
public interface RepoCategory extends CrudRepository<DbCategory, Long> {

//	get a list of categories in order of there priority
}
