import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalVariables } from '../common/global-variables';

@Injectable()
export class ControlAccessAplicationService {

constructor(private http: HttpClient) { }
   
    getTokenJwt() :Observable<object> {                
         return this.http.get<object>(GlobalVariables.apiURI + "controlaccess/authenticate", { headers: new HttpHeaders({           
             'Access-Aplication-Token': GlobalVariables.tokenApplication
         })});                 
    }
}