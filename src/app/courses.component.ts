import{Component} from '@angular/core'
import{CourseService} from './course.service'
import{AutoGrowDirective} from './auto-grow.directive'

@Component({
	selector: 'days',
	template: `
	<h2>Edit your steps for the Month</h2>
	<br>
	<div class="month"> 
  <ul>
    <li class="prev" (click)="getPreviousMonth()">&#10094;</li>
    <li class="next" (click)="getNextMonth()">&#10095;</li>
    <li>
      {{ month }}<br>
      <span style="font-size:18px">{{ year }}</span>
    </li>
  </ul>
</div>

<ul class="weekdays">
  <li>Su</li>
  <li>Mo</li>
  <li>Tu</li>
  <li>We</li>
  <li>Th</li>
  <li>Fr</li>
  <li>Sa</li> 
</ul>

<ul class="days"> 
  <li *ngFor="let notDay of notDays">
  <li *ngFor="let day of days">{{ day }} 
  <input type="text" id="{{ day }}" value="{{steps[day]}}">
  </li>
</ul>
<br>
<button type="button">Submit</button>
<button type="button">Logout</button>
<button type="button">Change User</button>
	`	
})
export class CoursesComponent{
	courseService: CourseService;
	title: string;
	days: string[];
	notDays: string[];
	month: string;
	year: string;
	steps: string[];
	calendarDate: Date;
	monthNames: Array<string> = [
    	"January", "February", "March",
    	"April", "May", "June",
    	"July", "August", "September",
    	"October", "November", "December"
		];

	constructor(courseService: CourseService){	
		this.calendarDate = new Date();	
		this.courseService = courseService;
		this.populateScreen();		
	}

	getMonthName(){
		return this.monthNames[this.calendarDate.getMonth()];
	}

	 // pass in any date as parameter anyDateInMonth
	daysInMonth() {
		this.days = [];
		for (var i = 1; i <= new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth() + 1, 0).getDate(); i++) {
			this.days.push((i).toString());		
		}
	}

	calculateNotDays(){

		this.notDays =[];
		for (var i = 1; i < new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth(), 1).getDay() + 1; i++) {
			this.notDays.push(i.toString());		
		}
	}

	getPreviousMonth(){
		this.calendarDate = new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth()-1, this.calendarDate.getDay());
		this.populateScreen();
	}

	getNextMonth(){
		this.calendarDate = new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth()+1, this.calendarDate.getDay());
		this.populateScreen();
	}

	populateScreen(){
		this.steps = this.courseService.getSteps();
		this.daysInMonth();
		this.month = this.getMonthName();
		this.year = this.calendarDate.getFullYear().toString();
		this.calculateNotDays();
	}
}