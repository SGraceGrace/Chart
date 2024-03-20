package com.example.chart;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TimeResponseDTO {
	
	@JsonProperty("interval")
	private int interval;

	@JsonProperty("times")
	private String times;
	
	@JsonProperty("count")
	public int count;
}
