import{ Injectable } from '@angular/core';
import{ Http, Response } from '@angular/http';
import{ Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { OAuthService } from 'angular2-oauth2/oauth-service';

import{ ISteps } from './steps';

@Injectable()
export class CalendarService{
	private _getStepsUrl = '/fitness/steps/';
	private _sendStepsUrl = '/fitness/steps/submit/';

	constructor(
		private _http: Http,
		private oauthService: OAuthService){
		
	}

	public getStepsPerMonth(date: string) : Observable<ISteps[]> {
		if(this.oauthService.hasValidAccessToken() == false){
			this.oauthService.initImplicitFlow();
		}

		let headers = new Headers({ 'Content-Type': 'application/json' });
		headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken());
		let options = new RequestOptions({ headers: headers });
		return this._http.get(this._getStepsUrl + date, options).map((response: Response) => <ISteps[]>response.json())
		.do(data => console.log('All: ' + JSON.stringify(data))).catch(this.handleError);
	}

	private handleError(error: Response){
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}

	public updateStepsPerMonth(updatedSteps: string): Observable<ISteps[]> {
		console.log("Got here");

		let headers = new Headers({ 'Content-Type': 'application/json' });
		headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken());
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(updatedSteps);

        return this._http.put(this._sendStepsUrl, body, options)
                    .map((res: Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
  	}

  		public updateString(string: string): Observable<string> {
		console.log("Got here");
		let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(string);
        console.log("Got here2");


        return this._http.post(this._sendStepsUrl, {string}, options)  //body, options)
        .map(this.extractData).catch(this.handleError);
                    //.map((res: Response) => res.json())
                    //.catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
  	}

  	private extractData(res: Response) {
  		let body = res.json();
  		return body.data || { };
	}
}
