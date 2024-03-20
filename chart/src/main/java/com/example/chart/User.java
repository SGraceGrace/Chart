package com.example.chart;


import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Builder;
import lombok.Data;


@Document(collection = "user")
@Builder
@Data
public class User {
	@Id
	private String id;
	
	@Field("first_name")
	private String firstname;
	
	@Field("last_name")
	private String lastname;
	
	@Field("email")
	private String email;
	
	@Field("gender")
	private String gender;
	
	@Field("date")
	private Date date;
	
	@Field("country")
	private String country;
	
	@Field("state")
	private String state;
	
	@Field("latitude")
	private double latitude;
	
	@Field("longitude")
	private double longitude;
	
}

@Builder
@Data
class Location{
	private String type;
	private List<Double> coordinates;
}
