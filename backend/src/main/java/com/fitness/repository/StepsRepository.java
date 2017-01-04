package com.fitness.repository;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.net.ssl.HttpsURLConnection;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fitness.model.Steps;
import com.fitness.model.StepsInfo;


/**
 * DOCUMENT ME!
 *
 * @author  JDraper
 */
public class StepsRepository {
    /**
     * @param   monthYear
     * @param   token
     * @return
     */
    public static List<Steps> findStepsPerMonth(String monthYear, String token) {
        try {
            return sendGet(monthYear, token);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return null;
    }

    /**
     * HTTP POST request
     *
     * @param   date   monthYear
     * @param   steps  token
     * @param   token
     * @throws  Exception
     */
    public static void sendPost(String date, String steps, String token) throws Exception {
        String url = "https://api.fitbit.com/1/user/-/activities.json";

        URL obj = new URL(url);
        HttpsURLConnection con = (HttpsURLConnection) obj.openConnection();

        // add request header
        con.setRequestMethod("POST");
        con.setRequestProperty("Authorization", token);
        con.setRequestProperty("Accept-Language", "en-US,en;q=0.5");

        String urlParameters = "activityId=90013" +
            "&startTime=12%3A20&durationMillis=600000&date=" + date + "&distance=" + steps + "&distanceUnit=steps";

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

        // print result
        System.out.println(response.toString());
    }

    /**
     * @param  monthYear
     * @param  token
     * @param  monthlySteps
     * @return 
     * @throws Exception 
     */
    public static List<Steps> submitMonthlySteps(String monthYear, String token, List<Steps> monthlySteps) throws Exception {
        String[] date = monthYear.split(",");
        String month = date[0];
        String year = date[1];
        String daysInMonth = date[2];   




        for (int x = 1; x <= Integer.parseInt(daysInMonth); x++) {
            String day = (x < 10) ? ("0" + x) : ("" + x);
            String stepsDate = year + "-" + month + "-" + day;
            Integer stepsInt = Integer.parseInt(monthlySteps.get(x-1).getAmount());
            if(new Integer(0).intValue() >= stepsInt.intValue()){
            	continue;
            }

            try {
                sendPost(stepsDate, monthlySteps.get(x - 1).getAmount(), token);
            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
		return sendGet(monthYear, token);
    }

    /**
     * HTTP GET request
     *
     * @param   monthYear
     * @param   token
     * @return
     * @throws  Exception
     */
    private static List<Steps> sendGet(String monthYear, String token) throws Exception {
        String[] date = monthYear.split(",");
        String month = date[0].length() == 1? "0" + date[0] : date[0];
        String year = date[1];
        String daysInMonth = date[2];
        String url;
        int monthInt = Integer.parseInt(date[0]);
        //if(Calendar.getInstance().get(Calendar.DAY_OF_MONTH) == 1 && Calendar.getInstance().get(Calendar.MONTH) == monthInt-1){
        //	url = "https://api.fitbit.com/1/user/-/activities/steps/date/" + year + "-" + month + "-01.json";
        //}else{
        	url = "https://api.fitbit.com/1/user/-/activities/steps/date/" + year + "-" + month + "-01/" + year + "-" + month + "-" +
                    daysInMonth + ".json";
        //}

        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();
        con.setRequestMethod("GET");

        // add request headers
        con.setRequestProperty("Authorization", token);

        int responseCode = con.getResponseCode();
        System.out.println("\nSending 'GET' request to URL : " + url);
        System.out.println("Response Code : " + responseCode);

        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }

        in.close();

        // print result
        String json = response.toString();
        json = json.substring(20, json.length() - 1);

        ObjectMapper mapper = new ObjectMapper();
        StepsInfo[] monthStepsInfo = mapper.readValue(json, StepsInfo[].class);
        List<Steps> monthSteps = new ArrayList<Steps>();

        for (StepsInfo info : monthStepsInfo) {
            Steps steps = new Steps();
            steps.setAmount(info.getValue());
            monthSteps.add(steps);
        }

        System.out.println(response.toString());
        monthStepsInfo.toString();
        return monthSteps;
    }
}
