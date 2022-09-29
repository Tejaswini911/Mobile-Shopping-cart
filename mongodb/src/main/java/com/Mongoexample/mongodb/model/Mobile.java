package com.Mongoexample.mongodb.model;


import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//import lombok.Getter;
//import lombok.Setter;
import lombok.ToString;

//@Getter
//@Setter
@ToString
@Document("Mobile")
public class Mobile {
	@Id
	private String id;
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public String getRam() {
		return ram;
	}

	public void setRam(String ram) {
		this.ram = ram;
	}

	public String getRom() {
		return rom;
	}

	public void setRom(String rom) {
		this.rom = rom;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public List<String> getImg() {
		return img;
	}

	public void setImg(List<String> img) {
		this.img = img;
	}

	private String model;
	private String ram;
	private String rom;
	private int price;
	private int count;
	private List<String> img;
	
	public Mobile(String id, String model, String ram, String rom,int price, int count, List<String> img ) {
		super();
		this.id = id;
		this.model=model;
		this.ram= ram;	
		this.rom=rom;
		this.price=price;
		this.count=count;
		this.img=img;
	}
	
}
