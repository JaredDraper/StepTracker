package com.fitness.repository;

import com.fitness.model.ISteps;
import com.fitness.model.Steps;

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
    public static List<ISteps> findStepsPerMonth(String monthYear) {
        List<ISteps> stepsList = new ArrayList<ISteps>();

        for (int x = 1; x < 32; x++) {
            ISteps steps = new Steps();
            steps.setAmount(x + "345");
            stepsList.add(steps);
        }

        return stepsList;
    }
}
