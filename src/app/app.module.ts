import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { CalendarComponent } from './calendar.component';
import { AutoGrowDirective } from './auto-grow.directive';
import { CalendarService } from './calendar.service';

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ AppComponent, CalendarComponent, AutoGrowDirective],
  bootstrap:    [ AppComponent ],
  providers: [CalendarService]
})
export class AppModule { }
