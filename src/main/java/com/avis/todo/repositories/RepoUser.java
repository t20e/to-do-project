package com.avis.todo.repositories;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.avis.todo.models.User;

@Repository
public interface RepoUser extends CrudRepository<User, Long>{
	Optional<User>findByEmail(String email);
}
