package com.example.chart;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

@Builder
public class ResponseDTO {

	@JsonProperty("state")
	private String state;
	
	@JsonProperty("count")
	private int count;
}
