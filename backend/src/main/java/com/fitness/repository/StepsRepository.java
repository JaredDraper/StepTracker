package com.fitness.repository;

import com.fitness.model.StepsInfo;

import java.util.ArrayList;
import java.util.List;


/**
 * DOCUMENT ME!
 *
 * @author  JDraper
 */
public class StepsRepository {
    /**
     * @param   monthYear
     * @return
     */
    public static List<StepsInfo> findStepsPerMonth(String monthYear) {
        List<StepsInfo> stepsList = new ArrayList<StepsInfo>();

        for (int x = 1; x < 32; x++) {
            StepsInfo steps = new StepsInfo();
            steps.setValue(x + "345");
            stepsList.add(steps);
        }

        return stepsList;
    }
}
