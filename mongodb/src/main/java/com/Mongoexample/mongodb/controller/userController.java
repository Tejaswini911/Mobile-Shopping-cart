package com.Mongoexample.mongodb.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.Mongoexample.mongodb.model.User;
import com.Mongoexample.mongodb.repo.UserRepo;

@RestController
@CrossOrigin
public class userController {

	@Autowired
	UserRepo userRepo;
	
	@GetMapping("/users")
	public List<User> getUsers() {
		return userRepo.findAll();
	}
	
	@PostMapping("/addUser")
	public String setUser(@RequestBody User user) {
		userRepo.save(user);
		return "user added"+user.getId();
	}
	
	@GetMapping("/user/{id}")
	public Optional<User> getMobile(@PathVariable String id){
		return userRepo.findById(id);
	}
	
	@DeleteMapping("/deleteUser/{id}")
	public String deleteMobile(@PathVariable String id) {
		userRepo.deleteById(id);
		return "deleted user with id" + id;
	} 
	
	@PostMapping("/editUser")
	public String updateUser(@RequestBody User user) {
		try {
			User emp = userRepo.findById(user.getId()).get();
			emp.setId(user.getId());
			emp.setName(user.getName());
			emp.setEmail(user.getEmail());
			emp.setPassword(user.getPassword());
			emp.setUserType(user.getUserType());
			emp.setCart(user.getCart());
			userRepo.save(emp);
			return "user updated";
		} catch (Exception ex) {
			return "exception occured";
		}
     }
}
