package com.avis.todo.repositories;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.avis.todo.models.Task;

@Repository
public interface RepoTask extends JpaRepository<Task, Long> {
	@Query(value = "SELECT * FROM tasks WHERE YEAR(due) = ?1 AND MONTH(due) = ?2 AND user_id = ?3 And complete = 0 ORDER BY due ASC", nativeQuery = true)
	Collection<Task> findAllTaskWithinDate(String year, String month, Long userId);
//	the nativeQuery allows me to give a custom sql query and it will go striaght to the db instead of first going to the jpa
	
	@Query(value = "SELECT * FROM tasks WHERE YEAR(due) = ?1 AND MONTH(due) = ?2 AND DAY(due) = ?3 AND user_id = ?4 And  complete = 0 ORDER BY due ASC", nativeQuery = true)
	Collection<Task> getTaskForCalendar(String year, String month, String day, Long userId);
	
}
