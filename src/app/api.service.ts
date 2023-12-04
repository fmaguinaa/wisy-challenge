import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { customApiUrl } from './utils';
import { EnumCities } from './constants';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getData(id: EnumCities) {
    return this.http.get(customApiUrl(id));
  }
}
