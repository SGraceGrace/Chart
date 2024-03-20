package com.example.chart;

import com.fasterxml.jackson.annotation.JsonProperty;

public class LatitudeLongitudeResponseDTO {

	@JsonProperty("longitude")
	public double longitude;
	
	@JsonProperty("latitude")
	public double latitude;
	
	@JsonProperty("count")
	public int count;
	
}
