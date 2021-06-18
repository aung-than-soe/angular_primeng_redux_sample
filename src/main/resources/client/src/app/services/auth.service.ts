import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "@environments";

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string) {
    const headers = new HttpHeaders({ "Authorization" : 'Basic ' + btoa(username + ':' + password), "Accept": "application/json"});
    return this.httpClient.get(`${environment.baseUrl}/login`, { headers: headers, observe: 'response', responseType: 'text'});
  }

  logout() {
    return this.httpClient.post(`http://localhost:8080/logout`, {});
  }
}
