package com.example.chart;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.ProjectionOperation;
import org.springframework.data.mongodb.core.aggregation.SortOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.datetime.DateFormatter;
import org.springframework.stereotype.Service;

@Service
public class DataService {

	@Autowired
	DataRepository repository;

	@Autowired
	MongoTemplate mongoTemplate;

//	Faker faker = new Faker();
//
//	public void insertUsers() {
//
//		for (int i = 0; i < 20; i++) {
//
//			LocalDate today = LocalDate.now().plusDays(5);
//			ZonedDateTime zonedDateTime = today.atStartOfDay(ZoneId.of("UTC"));
//			Date utcDate = Date.from(zonedDateTime.toInstant());
//
//			User user = User
//					.builder().name(faker.name().firstName()).date(utcDate).country(faker.address().country()).state(
//							faker.address().state())
//					.district(faker.address().city())
//					.location(Location.builder().type("Point")
//							.coordinates(List.of(Double.parseDouble(faker.address().latitude()),
//									Double.parseDouble(faker.address().longitude())))
//							.build())
//					.build();
//
//			repository.save(user);
//		}
//	}

	public List<User> getUsers() {
		return repository.findAllByOrderByDateAsc();
	}

	public List<ResultDateDTO> getUserByMonth(int month, int year) {

		LocalDate startDate = LocalDate.of(year, month, 1);
		LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

		Date date2 = Date.from(startDate.atStartOfDay(ZoneId.of("UTC")).toInstant());
		Date date3 = Date.from(endDate.atStartOfDay(ZoneId.of("UTC")).toInstant());

		List<User> users = repository.findByDateBetween(date2, date3);

		List<ResultDateDTO> result = new ArrayList<>();

		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("MM-dd-yyyy");

		for (User user : users) {

			String date = simpleDateFormat.format(user.getDate());
			int flag = 0;

			if (result.size() == 0) {
				ResultDateDTO resultDateDTO2 = ResultDateDTO.builder().date(date).count(1).build();
				result.add(resultDateDTO2);
			} else {
				for (int i = 0; i < result.size(); i++) {
					if ((result.get(i).getDate()).equals(date)) {
						flag = 1;
						result.get(i).setCount(result.get(i).getCount() + 1);
						break;
					}
				}

				if (flag == 0) {
					ResultDateDTO resultDateDTO2 = ResultDateDTO.builder().date(date).count(1).build();
					result.add(resultDateDTO2);
				}
			}
		}

		return result;
	}

	public List<ResponseDTO> getUserByDistrict() {

		GroupOperation groupOperation = Aggregation.group("state").count().as("count");

		ProjectionOperation projectionOperation = Aggregation.project("count").and("state").previousOperation();

		Aggregation aggregation = Aggregation.newAggregation(groupOperation, projectionOperation);

		AggregationResults<ResponseDTO> results = mongoTemplate.aggregate(aggregation, User.class, ResponseDTO.class);

		return results.getMappedResults();

	}

	public List<LatitudeLongitudeResponseDTO> getUserByLongitudeLatitudeDensity() {

		GroupOperation groupOperation = Aggregation.group("longitude", "latitude").count().as("count");

		ProjectionOperation projectionOperation = Aggregation.project("count").andInclude("longitude", "latitude");

		Aggregation aggregation = Aggregation.newAggregation(groupOperation, projectionOperation);

		AggregationResults<LatitudeLongitudeResponseDTO> results = mongoTemplate.aggregate(aggregation, User.class,
				LatitudeLongitudeResponseDTO.class);

		return results.getMappedResults();
	}

	public List<YearDTO> getUserByYear() {

		List<User> users = repository.findAll();

		List<YearDTO> yearDTOs = new ArrayList<YearDTO>();

		for (User user : users) {
			int flag = 0;
			LocalDate localDate = user.getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
			int year = localDate.getYear();

			if (yearDTOs.size() == 0) {
				YearDTO yearDTO2 = YearDTO.builder().year(year).count(1).build();
				yearDTOs.add(yearDTO2);
			} else {
				for (YearDTO yearDTO : yearDTOs) {
					if (yearDTO.getYear() == year) {
						flag = 1;
						yearDTO.setCount(yearDTO.getCount() + 1);
						break;
					}
				}

				if (flag == 0) {
					YearDTO yearDTO2 = YearDTO.builder().year(year).count(1).build();
					yearDTOs.add(yearDTO2);
				}
			}
		}

		return yearDTOs;
	}

	public List<TimeResponseDTO> getUserByTime(int month, int year) {

		List<User> users = repository.findAll();

		List<TimeResponseDTO> timeResponseDTOs = new ArrayList<>();

		for (User user : users) {
			int flag = 0;
			LocalDate localDate = user.getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
			int year2 = localDate.getYear();

			if (user.getDate().getMonth() == month && year2 == year) {
				Date date = user.getDate();
				int hour = date.getHours();
				int interval = hour / 2;

				if (timeResponseDTOs.size() == 0) {
					ArrayList<Date> dates = new ArrayList<Date>();
					dates.add(date);
					
					TimeResponseDTO timeResponseDTO = TimeResponseDTO.builder().interval(interval).times(dates).count(1).build();
					timeResponseDTOs.add(timeResponseDTO);
				} else {
					for (TimeResponseDTO timeResponseDTO : timeResponseDTOs) {
						if (timeResponseDTO.getInterval() == interval) {
							ArrayList<Date> dates = new ArrayList<Date>(); // Create a new ArrayList for each TimeResponseDTO
					        dates.addAll(timeResponseDTO.getTimes()); // Copy existing dates if needed
					        dates.add(date); // Add the new date
					        timeResponseDTO.setTimes(dates); // Set the new list to the TimeResponseDTO
					        timeResponseDTO.setCount(timeResponseDTO.getCount() + 1);
					        flag = 1;
					        break;
						}
					}

					if (flag == 0) {
						ArrayList<Date> dates = new ArrayList<Date>();
						dates.add(date);
						TimeResponseDTO timeResponseDTO = TimeResponseDTO.builder().interval(interval).times(dates).count(1).build();
						timeResponseDTOs.add(timeResponseDTO);
					}
				}
			}
		}
		
		System.out.println(timeResponseDTOs);

		return timeResponseDTOs;
	}
}
