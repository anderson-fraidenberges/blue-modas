import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../../models/product';
import { Observable } from 'rxjs';
import { GlobalVariables } from '../common/global-variables';

@Injectable()
export class ProductService {

    constructor(private http: HttpClient) { }

    listProduct(): Observable<Product[]> {
        return this.http
            .get<Product[]>(GlobalVariables.apiURI + "product", {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + GlobalVariables.tokenJwt
                })
            });
    }
}