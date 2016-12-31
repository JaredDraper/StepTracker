import{Component, OnInit} from '@angular/core';
import{CalendarService} from './calendar.service';
import{AutoGrowDirective} from './auto-grow.directive';
import { ISteps } from './steps';

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
  <li *ngFor="let day of days">{{ day }} 
  <input type="text" *ngIf="stepsList" class="error" id="{{ day }}" value="{{ stepsList[day-1].amount }}">
  </li>
</ul>
<br>
<button (click)="submitSteps()">Submit</button>
<button>Logout</button>
	`
})

export class CalendarComponent {
	title: string;
	days: string[];
	notDays: string[];
	month: string;
	year: string;
	stepsList: ISteps[];
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
		for (let i = 1; i <= new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth() + 1, 0).getDate(); i++) {
			this.days.push((i).toString());
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
		/*for (let day of this.days){
			let newCount = (<HTMLInputElement>document.getElementById(day));
			this.stepsList[day].steps = newCount.value;
		}
		if (!this.stepsList) { return; }*/
		//this.calendarService.updateStepsPerMonth(this.stepsList);
		//this.calendarService.updateStepsPerMonth('hope');
		this.calendarService.updateString('hope').then(ISteps => {
      this.stepsList.push(ISteps);
    });
                //.subscribe(stepsList => this.stepsList.push(stepsList),
                 //          error => this.errorMessage = <any>error);
	}

	populateScreen() {
		this.daysInMonth();
		this.month = this.getMonthName();
		this.year = this.calendarDate.getFullYear().toString();
		this.calculateNotDays();
		this.calendarService.getStepsPerMonth((this.calendarDate.getMonth() + 1).toString() + "," + this.calendarDate.getFullYear().toString())
                .subscribe(stepsList => this.stepsList = stepsList,
                           error => this.errorMessage = <any>error);
	}

	    ngOnInit(): void {
        this.populateScreen();
    }

}