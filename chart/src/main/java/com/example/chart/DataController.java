package com.example.chart;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class DataController {

	@Autowired
	DataService service;
	
//	@PostMapping("/add-user")
//	public void insertUsers(){
//		service.insertUsers();
//	}

	@GetMapping("/get-user")
	public List<User> getUsers(){
		return service.getUsers();
	}
	
	@GetMapping("/get-user-by-month/{month}/{year}")
	public List<ResultDateDTO> getUsersByMonth(@PathVariable int month, @PathVariable int year){
		return service.getUserByMonth(month, year);
	}
	
	@GetMapping("/get-user-districts")
	public List<ResponseDTO> getUserDistrict(){
		return service.getUserByDistrict();
	}
	
	@GetMapping("/get-user-point")
	public List<LatitudeLongitudeResponseDTO> getUserByLatitudeLongitude(){
		return service.getUserByLongitudeLatitudeDensity();
	}
	
	@GetMapping("/get-user-year")
	public List<YearDTO> getUsersByYear(){
		return service.getUserByYear();
	}
	
	@GetMapping("/get-user-time/{month}/{year}")
	public List<TimeResponseDTO>  getUserByTime(@PathVariable int month, @PathVariable int year){
		return service.getUserByTime(month, year);
	}
}