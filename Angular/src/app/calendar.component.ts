import{Component, OnInit} from '@angular/core';
import{CalendarService} from './calendar.service';
import{AutoGrowDirective} from './auto-grow.directive';
import { Steps } from './steps';

@Component({
	selector: 'days',
	styleUrls: ['./calendar.component.css'],
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
  <li *ngFor="let day of days"><font size="3">{{ day }} </font>
  <input type="text" size="5" style="color:darkblue;" *ngIf="oldStepsList" class="error" id="{{ day }}" [(ngModel)]="oldStepsList[day-1].amount" disabled>
  <input type="text" size="5" *ngIf="stepsList" class="error" id="{{ day }}" [(ngModel)]="stepsList[day-1].amount">
  </li>
</ul>
<br>
<button (click)="submitSteps()">Submit</button>
<button (click)="logout()">Logout</button>
	`
})

export class CalendarComponent {
	title: string;
	days: string[];
	notDays: string[];
	month: string;
	year: string;
	oldStepsList: Steps[];
	stepsList: Steps[];
	errorMessage: string;
	calendarDate: Date;
	monthNames: Array<string> = [
    	"January", "February", "March",
    	"April", "May", "June",
    	"July", "August", "September",
    	"October", "November", "December"
		];

	constructor(private calendarService: CalendarService) {
		this.calendarDate = new Date();
		this.calendarService = calendarService;
		this.populateScreen();
	}

	getMonthName() {
		return this.monthNames[this.calendarDate.getMonth()];
	}

	 // pass in any date as parameter anyDateInMonth
	daysInMonth() {
		this.days = [];
		this.stepsList = [];
		this.oldStepsList = [];
		for (let i = 1; i <= new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth() + 1, 0).getDate(); i++) {
			this.days.push((i).toString());
			this.stepsList.push(new Steps("0"));
			this.oldStepsList.push(new Steps("0"));
		}
	}

	calculateNotDays() {

		this.notDays = [];
		for (let i = 1; i < new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth(), 1).getDay() + 1; i++) {
			this.notDays.push(i.toString());
		}
	}

	getPreviousMonth() {
		this.calendarDate = new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth() - 1, this.calendarDate.getDay());
		this.populateScreen();
	}

	getNextMonth() {
		this.calendarDate = new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth() + 1, this.calendarDate.getDay());
		this.populateScreen();
	}

	submitSteps() {
		if (!this.stepsList) { return; }
		this.calendarService.updateStepsPerMonth(this.stepsList, (this.calendarDate.getMonth()+1).toString() + "," + this.calendarDate.getFullYear().toString() + "," + this.days.length)
                .subscribe(oldStepsList => this.oldStepsList = oldStepsList,
                          error => this.errorMessage = <any>error);
     this.populateScreen();
	}
	// submitSteps(){
	// 	for (let i = this.stepsList.length - 1; i >= 0; i--) {
	// 		if(Number(this.stepsList[i].amount) > 0){

	// 			this.calendarService.updateSteps(this.stepsList[i].amount, (this.calendarDate.getMonth()+1).toString() + "-" + this.calendarDate.getFullYear().toString() + "-" + i);
	// 		}
	// 	}
	// }

	private logout() {
		window.localStorage.removeItem('access_token');
        window.localStorage.removeItem('expires_at');
        this.populateScreen();
        //navigate to login screen when it is made.
	}

	populateScreen() {
		this.daysInMonth();
		this.month = this.getMonthName();
		this.year = this.calendarDate.getFullYear().toString();
		this.calculateNotDays();
		//this.oldStepsList = this.calendarService.getTestStepsPerMonth("test");
		this.calendarService.getStepsPerMonth((this.calendarDate.getMonth()+1).toString() + "," + this.calendarDate.getFullYear().toString() + "," + this.days.length)
                .subscribe(oldStepsList => this.oldStepsList = oldStepsList,
                           error => this.errorMessage = <any>error);
	}

	    ngOnInit(): void {
        this.populateScreen();
    }

}