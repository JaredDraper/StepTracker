package com.fitness.model;

public class Steps implements ISteps {
	private String amount;

	/* (non-Javadoc)
	 * @see com.fitness.model.ISteps#getAmount()
	 */
	public String getAmount() {
		return amount;
	}

	/* (non-Javadoc)
	 * @see com.fitness.model.ISteps#setAmount(java.lang.String)
	 */
	public void setAmount(String amount) {
		this.amount = amount;
	}
}
