import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINT } from '../../config/constants';

/*
  Generated class for the ProductProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductProvider {

  constructor(public http: HttpClient) {
  }

  getAllProducts(category) {
    return this.http
      .get(API_ENDPOINT.concat('/category/', category, '/', 'products'))
      .map((res: any) => res.data);
  }

}
