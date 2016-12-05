import {Component} from '@angular/core';
import {CalendarComponent} from './calendar.component'

@Component({
    selector: 'my-app',
    template: `<h1>Welcome to Step Tracker</h1><days></days>`,
    entryComponents: [CalendarComponent]
})
export class AppComponent { }
