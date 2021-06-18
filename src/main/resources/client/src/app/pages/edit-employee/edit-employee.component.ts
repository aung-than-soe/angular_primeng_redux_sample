import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Department} from "../../models/department.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app-meta.reducer";
import {filter, pluck, switchMap, tap} from "rxjs/operators";
import {findOne} from "../../store/employee/employee.selectors";
import * as EmployeeActions from 'src/app/store/employee/employee.actions';
import {Employee} from "../../models/employee.model";
import {DEPARTMENT} from "../../models/department.constant";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private store: Store<AppState>, private route: ActivatedRoute) { }
  submitted = false;
  selectedDepartment: Department;

  departments: Department[] = [...DEPARTMENT];

  currentEmployeeId: number = 0;
  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: [null, [Validators.required]],
      address: [null, Validators.required],
      phone: [null],
      department: [null, Validators.required]
    });

    this.route.params.pipe(
      pluck('id'),
      filter((id: number) => id != null),
      tap(id => {this.currentEmployeeId = id}),
      switchMap(id => this.store.select(findOne(id)).pipe(
          filter(employee => employee != null),
        )
      )
    ).subscribe(emp => {
      this.name.setValue(emp.name);
      this.address.setValue(emp.address);
      this.phone.setValue(emp.phone);
      this.department.setValue(emp.department);
      this.selectedDepartment = this.departments.find(d => d.label == emp.department) || null;
    })
  }

  get name(): AbstractControl {
    return this.employeeForm.get('name')
  }
  get address(): AbstractControl {
    return this.employeeForm.get('address')
  }
  get phone(): AbstractControl {
    return this.employeeForm.get('phone')
  }
  get department(): AbstractControl {
    return this.employeeForm.get('department')
  }

  saveOrUpdate() {
    this.submitted = true;
    if(this.employeeForm.valid) {
      this.submitted = !this.submitted;
      const employee: Employee = {name: this.name.value, phone: this.phone.value, address: this.address.value, department: this.department.value, id: this.currentEmployeeId}
      this.store.dispatch(EmployeeActions.updateEmployee({employee}));
      this.router.navigateByUrl("/employee");
    }
  }

  onDepartmentChange(department: Department) {
    this.selectedDepartment = department;
    this.department.setValue(department.label);
  }

  onCancel() {
    this.router.navigateByUrl('/employee')
  }
}
