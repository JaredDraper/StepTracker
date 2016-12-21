package com.steptracker.repository;

import java.util.ArrayList;
import java.util.List;

import com.steptracker.model.Steps;

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
    public static List<Steps> findStepsPerMonth(String monthYear) {
        List<Steps> stepsList = new ArrayList<Steps>();

        for (int x = 1; x < 32; x++) {
            Steps steps = new Steps();
            steps.setAmount(x + "345");
            stepsList.add(steps);
        }

        return stepsList;
    }
}
