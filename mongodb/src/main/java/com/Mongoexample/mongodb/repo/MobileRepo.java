package com.Mongoexample.mongodb.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.Mongoexample.mongodb.model.Mobile;

@Repository
public interface MobileRepo extends MongoRepository<Mobile, String>{
	Mobile findByModel(String model);
}
