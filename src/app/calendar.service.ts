import{ Injectable } from '@angular/core';
import{ Http, Response } from '@angular/http';
import{ Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import{ ISteps } from './steps';

@Injectable()
export class CalendarService{
	private _productUrl = 'api/steps/steps.json';

	constructor(private _http: Http){}

	private getStepsPerMonth(date: Date) : Observable<ISteps[]> {
		return this._http.get(this._productUrl).map((response: Response) => <ISteps[]>response.json())
		.do(data => console.log('All: ' + JSON.stringify(data))).catch(this.handleError);
	}

	private handleError(error: Response){
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}

	private updateStepsPerMonth(updatedSteps: ISteps[]): Observable<ISteps[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(this._productUrl, { updatedSteps }, options)
                    .map(this.extractData).catch(this.handleError);
  	}

  	private extractData(res: Response) {
  		let body = res.json();
  		return body.data || { };
	}
}
