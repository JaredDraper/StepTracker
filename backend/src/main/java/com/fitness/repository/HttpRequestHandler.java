package com.fitness.repository;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import javax.net.ssl.HttpsURLConnection;
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fitness.model.Steps;
import com.fitness.model.StepsInfo;

public class HttpRequestHandler {
	private final String USER_AGENT = "Mozilla/5.0";
	
	@GET
    @Produces(MediaType.APPLICATION_JSON)
	public List<Steps> sendGet(String token) throws Exception {
		 String tempToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzN1RHRkgiLCJhdWQiOiIyMjg2OFciLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3YWN0IiwiZXhwIjoxNDgzMDM4OTE1LCJpYXQiOjE0ODI5NzU3MTl9.in3uIA8G1bi_Vwa_UxmTQ9ghwYb8LxZl4Im2nnqT2Kk";

		String url = "https://api.fitbit.com/1/user/-/activities/steps/date/2016-12-01/2016-12-31.json";

		URL obj = new URL(url);
		HttpURLConnection con = (HttpURLConnection) obj.openConnection();

		// optional default is GET
		con.setRequestMethod("GET");

		//add request header
		con.setRequestProperty("Authorization", "Bearer " + tempToken);

		System.out.println("\nSending 'GET' request to URL : " + url);

		
		BufferedReader in = new BufferedReader(
		        new InputStreamReader(con.getInputStream()));
		String inputLine;
		StringBuffer response = new StringBuffer();

		while ((inputLine = in.readLine()) != null) {
			response.append(inputLine);
		}
		in.close();

		//print result
		String json = response.toString();
		json = json.substring(20,json.length() -1);
		ObjectMapper mapper = new ObjectMapper();
		StepsInfo[] monthStepsInfo = mapper.readValue(json, StepsInfo[].class);
		List<Steps> monthSteps = new ArrayList<Steps>();
		for(StepsInfo info : monthStepsInfo){
			Steps steps = new Steps();
			steps.setAmount(info.getValue());
			monthSteps.add(steps);
		}
		System.out.println(response.toString());
		monthSteps.toString();
		return monthSteps;
	}

	// HTTP POST request
	 public void sendPost() throws Exception {

		String url = "https://api.fitbit.com/1/user/-/activities.json?activityId=90009&startTime=12%3A20&durationMillis=800000&date=2016-12-18&distance=8";
		URL obj = new URL(url);
		HttpsURLConnection con = (HttpsURLConnection) obj.openConnection();

		//add reuqest header
		con.setRequestMethod("POST");
		con.setRequestProperty("User-Agent", USER_AGENT);
		con.setRequestProperty("Accept-Language", "en-US,en;q=0.5");

		String urlParameters = "sn=C02G8416DRJM&cn=&locale=&caller=&num=12345";

		// Send post request
		con.setDoOutput(true);
		DataOutputStream wr = new DataOutputStream(con.getOutputStream());
		wr.writeBytes(urlParameters);
		wr.flush();
		wr.close();

		int responseCode = con.getResponseCode();
		System.out.println("\nSending 'POST' request to URL : " + url);
		System.out.println("Post parameters : " + urlParameters);
		System.out.println("Response Code : " + responseCode);

		BufferedReader in = new BufferedReader(
		        new InputStreamReader(con.getInputStream()));
		String inputLine;
		StringBuffer response = new StringBuffer();

		while ((inputLine = in.readLine()) != null) {
			response.append(inputLine);
		}
		in.close();

		//print result
		System.out.println(response.toString());

	}
}
