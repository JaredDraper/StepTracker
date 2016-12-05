import{ Injectable } from '@angular/core';

@Injectable()
export class CourseService{

	getSteps() : string[] {
		return [" ","1000","2000","3000","4000","5000","6000","7000","8000","9000","1000", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
	}

	getMonth() : string {
		return "December";
	}
}