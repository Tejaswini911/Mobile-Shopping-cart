package com.Mongoexample.mongodb.model;

import java.util.List;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;


@Getter
@Document(collection = "User")
public class User {
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	public List<Mobile> getCart() {
		return cart;
	}

	public void setCart(List<Mobile> cart) {
		this.cart = cart;
	}

	@Id
	private String id;
	private String name;
	private String email;
	private String password;
	private String userType;
	private List<Mobile> cart; 
	
	public User(String id, String name, String email, String password, String userType, List<Mobile> cart ) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.password= password;
		this.userType = userType;
		this.cart=cart;
	}
}
