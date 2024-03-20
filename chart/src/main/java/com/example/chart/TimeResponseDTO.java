package com.example.chart;

import java.util.ArrayList;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TimeResponseDTO {
	
	@JsonProperty("interval")
	private int interval;

	@JsonProperty("time")
	private ArrayList<Date> times;
	
	@JsonProperty("count")
	public int count;
}
