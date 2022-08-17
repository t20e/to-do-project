package com.avis.todo.models;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name="users")
public class User {

	@Transient
	String lettersRegex="[a-zA-Z]+";

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@NotEmpty(message = "please enter a name")
	@Size(min=2, max=35, message = "name needs to be more than 2 characters")
	private String firstName;
	
	@NotEmpty(message = "please enter a name")
	@Size(min=2, max=35, message = "name needs to be more than 2 characters")
	private String lastName;
	
	@NotNull(message = "pleaser enter your age")
	@Min(value = 13, message = "you must be older than 13")
	private int age;
	
	@NotBlank(message = "email is required")
	@Email(message = "enter valid email")
	private String email;
	
	@NotBlank(message = "password required")
	@Size(min = 6, message = "password must be more than 6 characters")
	private String password;
	
	@Transient
	@NotEmpty(message = "confirm password required")
	private String confirmPassword;
	
	@Column(nullable = true, length = 64)
	private String profilePic;
	
	@Column(updatable = false)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date createdAt;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date updatedAt;
	
	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@OrderBy("priority DESC")
	private List<Category> categories;
	
	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	@OrderBy("complete ASC, priority DESC, due ASC ")
	private List<Task> tasks;
	
	public User() {}
	
	public User(String firstName, String lastName, int age, String email, String password, String confirmPassword, String profilePic) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.age = age;
		this.email=email;
		this.password = password;
		this.confirmPassword=confirmPassword;
		this.profilePic = profilePic;
	}
	@PrePersist
	protected void onCreate() {
		this.createdAt = new Date();
	}
	@PreUpdate
	protected void onUpdate() {
		this.updatedAt = new Date();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}

	public String getProfilePic() {
		return profilePic;
	}

	public void setProfilePic(String profilePic) {
		this.profilePic = profilePic;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public List<Category> getCategories() {
		return categories;
	}

	public void setCategories(List<Category> categories) {
		this.categories = categories;
	}

	public List<Task> getTasks() {
		return tasks;
	}

	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
	}

	
	
}
