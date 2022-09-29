package com.Mongoexample.mongodb.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.Mongoexample.mongodb.model.User;

@Repository
public interface UserRepo extends MongoRepository<User, String>{

	//User getOne(String id);

}
