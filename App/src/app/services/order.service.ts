import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalVariables } from '../common/global-variables';
import { Order } from 'src/models/order';

@Injectable()
export class OrderService {

    constructor(private http: HttpClient) { }

    send(data:string): Observable<string> {

        return this.http
            .post<string>(GlobalVariables.apiURI + "order/create", data, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer  ' + GlobalVariables.tokenJwt
                }) 
            });
    }

    get(id:string): Observable<Order> {      
        
        let parameters = new HttpParams();
        parameters = parameters.append('id', id);
        
        return this.http
            .get<Order>(GlobalVariables.apiURI + "order", { 
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + GlobalVariables.tokenJwt
                }), params: parameters
            });
    }
}