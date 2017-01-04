import{ Injectable } from '@angular/core';
import{ Http, Response, Headers, RequestOptions } from '@angular/http';
import{ Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { OAuthService } from 'angular2-oauth2/oauth-service';

import{ Steps } from './steps';

@Injectable()
export class CalendarService{
	private _getStepsUrl = '/fitness/steps/';
	private _sendStepsUrl = '/fitness/steps/submit/';

	constructor(
		private _http: Http,
		private oauthService: OAuthService){
		
	}
	public getTestStepsPerMonth(date: string){
		let stepsList: Steps[] = [];
		for(let x =0; x<31; x++){
			stepsList.push(new Steps(x + "124"));
		}
		return stepsList;
	}

	public getStepsPerMonth(date: string) : Observable<Steps[]> {
		if(this.oauthService.hasValidAccessToken() == false){
			this.oauthService.initImplicitFlow();
			return;
		}
		if(window.localStorage.getItem('access_token') == null){
			
		}

		let headers = new Headers({ 'Content-Type': 'application/json' });
		headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken());
		let options = new RequestOptions({ headers: headers });
		return this._http.get(this._getStepsUrl + date, options).map((response: Response) => <Steps[]>response.json())
		.do(data => console.log('All: ' + JSON.stringify(data))).catch(this.handleError);
	}


	private handleError(error: Response){
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}

	public updateStepsPerMonth(updatedSteps: Steps[], date: string): Observable<Steps[]> {
		console.log("Got here");

		let headers = new Headers({ 'Content-Type': 'application/json' });
		headers.set('Authorization', date + '&' + 'Bearer ' + this.oauthService.getAccessToken());		headers.set('Date', date);
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(updatedSteps);

        return this._http.post(this._sendStepsUrl, body, options).map((response: Response) => <Steps[]>response.json())
		.do(data => console.log('All: ' + JSON.stringify(data))).catch(this.handleError);
  	}

  	private extractData(res: Response) {
  		let body = res.json();
  		return body.data || { };
	}
}
