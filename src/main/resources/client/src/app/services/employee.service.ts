import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "@environments";
import {Employee} from "../models/employee.model";

@Injectable()
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  get allEmployee(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${environment.baseUrl}/api/employee/all`);
  }

  createOrUpdateEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(`${environment.baseUrl}/api/employee`, employee);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/employee/${id}`);
  }
}
