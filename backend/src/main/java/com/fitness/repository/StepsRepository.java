package com.fitness.repository;

import java.util.ArrayList;
import java.util.List;

import com.fitness.model.ISteps;
import com.fitness.model.Steps;

public class StepsRepository {


	public static List<ISteps> findStepsPerMonth(String monthYear) {
		List<ISteps> stepsList = new ArrayList<ISteps>();
		ISteps steps1 = new Steps();
		steps1.setAmount("1234");
		
		ISteps steps2 = new Steps();
		steps2.setAmount("5634");
		
		stepsList.add(steps1);
		stepsList.add(steps2);
		return stepsList;
	}
}
