import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '@services';
import {Employee} from "../../models/employee.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app-meta.reducer";
import {findALl} from "../../store/employee/employee.selectors";
import {filter, map} from "rxjs/operators";
import * as EmployeeActions from 'src/app/store/employee/employee.actions';
import {DEPARTMENT} from "../../models/department.constant";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  providers: [MessageService]
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  first = 0;
  rows = 10;
  loading = false;
  showPaginator = true;
  constructor(private employeeService: EmployeeService, private store: Store<AppState>, private messageService: MessageService) { }

  ngOnInit(): void {
    this.loading = true;
    this.store.select(findALl).pipe(
      filter(a => a && a.length > 0),
      map(employee => employee.map(e => ({...e, department: DEPARTMENT.find(d => d.label.includes(e.department)).description})))
    ).subscribe(e => {
      this.employees = [...e];
      this.loading = false;
    }, _ => {
      this.loading = false;
      this.showPaginator = false;
    }, () => {
      this.loading = false;
    });
  }

  onDelete(id: number) {
    this.store.dispatch(EmployeeActions.deleteEmployee({id}));
    this.messageService.add({severity:'info', summary: 'Info', detail: 'Delete successful'});

  }

}
