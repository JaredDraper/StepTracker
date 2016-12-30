import {Component} from '@angular/core';
import {CalendarComponent} from './calendar.component';
import { OAuthService } from 'angular2-oauth2/oauth-service';

@Component({
    selector: 'my-app',
    template: `<h1>Welcome to Step Tracker</h1><days></days>`,
    entryComponents: [CalendarComponent]
})
export class AppComponent {
	constructor(private oauthService: OAuthService) {
		this.oauthService.loginUrl = "https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22868W&redirect_uri=http%3A%2F%2Fwww.steptracker.org%2Foauth2_callback.html&scope=activity&expires_in=604800";
		this.oauthService.clientId = "22868W";
		this.oauthService.scope = "activity";
		this.oauthService.issuer = "http://www.steptracker.org";
		this.oauthService.redirectUri = "http://www.steptracker.org/index.html";

		this.oauthService.tryLogin({});
 }
}
