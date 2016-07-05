import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../../app.settings';

export class County{
    public County : string;
    public State : string;
    public CountyID : string;
}

export class Proposal
{
    public id : string;
    public proposalURL ;
    public latitude : string;
    public longitude : string;
    public imageURL : string;
    public shortdescription : string;
    public costToComplete : string;
    public expirationDate : string;
    public schoolName : string;
    public city : string;
    public state : string;
    public povertyLevel : string;
    public title : string;
}

export class DonorChooseObject
{
    public searchTerms : string;
    public searchURL : string;
    public totalProposals : string;
    public index : string;
    public max : string;
    //public breadcrumb : string[string[]];
    public proposals : Proposal[];
}

@Injectable()
export class DonorChooseService {
    
    constructor(private _http: Http, private _jsonp : Jsonp) {}
 
    public getDonorResult(donor:string): Observable<DonorChooseObject> { 
        let url = AppSettings.DONOR_CHOOSE_API_ENDPOINT.replace("{0}", donor); 
        return this._http.get(url)
        .map((response: Response) => <DonorChooseObject> response.json())
         .do(data => console.log('All: ' +  JSON.stringify(data)))
         .catch(this.handleError);
    }

    public getCountyOptions(): Observable<County[]> {
        return this._http.get(AppSettings.DONOR_COUNTIES_LOCAL_JSON_ENDPOINT)
         .map((response: Response) => <County[]> response.json())
         .do(data => console.log('All: ' +  JSON.stringify(data)))
         .catch(this.handleError);
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}