/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.fitness;

import com.fitness.model.Steps;

import com.fitness.repository.StepsRepository;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;


/**
 * DOCUMENT ME!
 *
 * @author  JDraper
 */
@Path("/steps") //
public class StepsResource {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/testget")
    public List<Steps> getSteps() {
        String token =
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzN1RHRkgiLCJhdWQiOiIyMjg2OFciLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3YWN0IiwiZXhwIjoxNDgzMTMwNDQyLCJpYXQiOjE0ODMwNDQwNDJ9.Jxl0nNequ-4B_ZHes2M6_korbL4-oMTwMPKGVAmsHos";
        String monthYear = "12,2016";
        return StepsRepository.findStepsPerMonth(monthYear, token);
    }

    // @GET
    // @Produces(MediaType.APPLICATION_JSON)
    // @Path("/{monthYear}")
    // public List<ISteps> getSteps(@PathParam("monthYear") String monthYear) {
    // return StepsRepository.findStepsPerMonth(monthYear);
    // }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{monthYear}")
    public List<Steps> getSteps(@HeaderParam("Authorization") String token, @PathParam("monthYear") String monthYear) {
        return StepsRepository.findStepsPerMonth(monthYear, token);
    }

    /**
     * @return
     */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/testpost")
    public Steps postSteps() {
        try {
            StepsRepository.sendPost("2016-12-29", "432",
                "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzN1RHRkgiLCJhdWQiOiIyMjg2OFciLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3YWN0IiwiZXhwIjoxNDgzMTMwNDQyLCJpYXQiOjE0ODMwNDQwNDJ9.Jxl0nNequ-4B_ZHes2M6_korbL4-oMTwMPKGVAmsHos");
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return new Steps(); // StepsRepository.findStepsPerMonth("567");
    }

    /**
     * Creates a new StepsResource object.
     *
     * @param  stepsList  text  stepsList
     */
    @POST
    @Path("/submit")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public void submitSteps(List<Steps> stepsList) {
        try {
            StepsRepository.sendPost("2016-12-29", "432",
                "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzN1RHRkgiLCJhdWQiOiIyMjg2OFciLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3YWN0IiwiZXhwIjoxNDgzMDM4OTE1LCJpYXQiOjE0ODI5NTY0OTJ9.GfLjc6UKBDSfsQbktWklZXz_BD2-KqS0IOfhTZPc2tM");
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        System.out.println(stepsList);
    }

    // @POST
    // @Path("/submit")
    // @Consumes(MediaType.APPLICATION_JSON)
    // @Produces(MediaType.APPLICATION_JSON)
    // public String submitSteps(String text) {
    // System.out.println(text);
    // return text;
    // }
}
