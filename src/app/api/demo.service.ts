import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

	constructor(private http: HttpClient) { }


    //Demo Api
    demo(){
        const url = `http://localhost:8000/api/gigs`;
        let headers = new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Authorization': JSON.parse(localStorage.getItem('ngLaravelPassport')).token_type+' '+JSON.parse(localStorage.getItem('ngLaravelPassport')).access_token
        });
        return this.http.get(url, { headers: headers }).pipe(map(res => {
            return res;
        }));
    }
}
