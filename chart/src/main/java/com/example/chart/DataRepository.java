package com.example.chart;


import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface DataRepository extends MongoRepository<User, String>{

	List<User> findAllByOrderByDateAsc();

	@Query(sort="{'date':1}")
	List<User> findByDateBetween(Date date2, Date date3);

}
