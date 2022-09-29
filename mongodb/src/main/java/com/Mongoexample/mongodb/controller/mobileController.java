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

import com.Mongoexample.mongodb.model.Mobile;
import com.Mongoexample.mongodb.repo.MobileRepo;

@RestController
@CrossOrigin
public class mobileController {

	@Autowired
	private MobileRepo repo;
	
	@PostMapping("/addMobile")
	public String addMobile(@RequestBody Mobile mobile) {
		repo.save(mobile);
		return "added mobile with id"+mobile.getId();
	}
	
//	@GetMapping("/a")
//	public Mobile getData() {
//		System.out.println("working...");
//		return repo.findByModel("a8");
//		
//	}
	
	@GetMapping("/mobiles")
	public List<Mobile> getMobiles(){
		List<Mobile> mob;
		
		mob=repo.findAll();
//		
//		for(Mobile mob1 : mob) {
//			System.out.println(mob1.getCount());
//			System.out.println(mob1.getId());
//			System.out.println(mob1.getModel());
//			System.out.println(mob1.getPrice());
//			System.out.println(mob1.getRam());
//			System.out.println(mob1.getRom());
//			
//		}
		return mob;
		
	}
	
	@GetMapping("/mobile/{id}")
	public Optional<Mobile> getMobile(@PathVariable String id){
		return repo.findById(id);
	}
	
	@DeleteMapping("/delete/{id}")
	public String deleteMobile(@PathVariable String id) {
		repo.deleteById(id);
		return "deleted mobile with id" + id;
	}
	
	@PostMapping("/editMobile")
	public String edit(@RequestBody Mobile moblie) {
		try {
			
			Mobile mob = repo.findById(moblie.getId()).get();
			mob.setId(moblie.getId());
			mob.setCount(moblie.getCount());
			mob.setModel(moblie.getModel());
			mob.setRam(moblie.getRam());
			mob.setRom(moblie.getRom());
			mob.setPrice(moblie.getPrice());
			mob.setImg(moblie.getImg());
			repo.save(mob);
		return "updated";
		} catch (Exception ex) {
			return "exception occured";
		}
	}
}
