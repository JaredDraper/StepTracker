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
		if(this.oauthService.hasValidAccessToken() != false){
			console.log("logged in");
		}
		if(window.localStorage.getItem('access_token') == null){
			this.oauthService.initImplicitFlow();
			return;
		}

		let headers = new Headers({ 'Content-Type': 'application/json' });
		headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken());
		let options = new RequestOptions({ headers: headers });
		return this._http.get(this._getStepsUrl + date, options).map((response: Response) => <ISteps[]>response.json())
		.do(data => console.log('All: ' + JSON.stringify(data))).catch(this.handleError);
	}

	/*private authorizeFitbitToken(){
		localStorage.setItem('currentUser', JSON.stringify({token: token, name:name}));
	}*/

	private handleError(error: Response){
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}

	public updateStepsPerMonth(updatedSteps: string): Observable<ISteps[]> {
		console.log("Got here");

		let headers = new Headers({ 'Content-Type': 'application/json' });
		headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken());
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify("updatedSteps");

        return this._http.put('http://localhost:8080/fitness/steps/submit', body, options)
                    .map((res: Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
  	}

  	public updateString(string: string): Promise<ISteps> {
		console.log("Got here");
		let headers = new Headers({ 'Content-Type': 'application/json' });
		headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken());
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify('4000');
        console.log("Got here2");


        return this._http.post('http://localhost:8080/fitness/steps/testpost', JSON.stringify{'4000': amount}, options)  //body, options)
                    .toPromise().then(res => res.json().data)
    				.catch(this.handleError);
  	}

  	private extractData(res: Response) {
  		let body = res.json();
  		return body.data || { };
	}
}
