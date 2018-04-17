import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINT } from '../../config/constants';
import 'rxjs/Rx';

/*
  Generated class for the CategoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoryProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CategoryProvider Provider');
  }

  getAllCategories() {
    return this.http
      .get(API_ENDPOINT.concat('/', 'category'))
      .map((res: any) => res.data);
  }

  getMenu() {
    return this.http
      .get(API_ENDPOINT.concat('/', 'category/menu'))
      .map((res: any) => res.data);
  }

}
