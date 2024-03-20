package com.example.chart;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class YearDTO {

	@JsonProperty("year")
	public int year;
	
	@JsonProperty("count")
	public int count;
}
