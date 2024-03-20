package com.example.chart;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ResultDateDTO {

	@JsonProperty("date")
	private String date;
	
	@JsonProperty("count")
	private int count;
}
