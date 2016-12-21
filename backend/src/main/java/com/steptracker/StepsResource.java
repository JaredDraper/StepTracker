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

package com.steptracker;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.steptracker.model.Steps;
import com.steptracker.repository.StepsRepository;


/**
 * DOCUMENT ME!
 *
 * @author  JDraper
 */
@Path("/steps") //
public class StepsResource {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/test")
    public List<Steps> getSteps() {
        return StepsRepository.findStepsPerMonth("567");
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{monthYear}")
    public List<Steps> getSteps(@PathParam("monthYear") String monthYear) {
        return StepsRepository.findStepsPerMonth(monthYear);
    }

    /**
     * Creates a new StepsResource object.
     *
     * @param  stepsList
     */
    @POST
    @Path("/submit")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public void submitSteps(List<Steps> stepsList) {
        System.out.println(stepsList);
    }
    
    @POST
    @Path("/oauth2callBack")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public void receiveAuthToken() {
        getSteps("044");
    }
    

    
   // http://www.steptracker.com/oauth2callBack?code=0df40f0a4bd67c761cdb7b72979a1ce529c648f4#_=_
//    @POST
//    @Path("/submit")
//    @Consumes(MediaType.APPLICATION_JSON)
//    @Produces(MediaType.APPLICATION_JSON)
//    public void submitSteps(String steps) {
//        System.out.println(steps);
//    }
}
