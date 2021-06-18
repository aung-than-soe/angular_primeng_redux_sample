import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap} from "rxjs/operators";
import {EmployeeService} from "@services";
import * as EmployeeActions from 'src/app/store/employee/employee.actions';
import {throwError} from "rxjs";

@Injectable()
export class EmployeeEffect {

  constructor(private actions: Actions, private employeeService: EmployeeService) {
  }

  onLoadEmployee$ = createEffect(() => this.actions.pipe(
    ofType(EmployeeActions.loadAlEmployee.type),
    mergeMap(_ => {
      console.log('#### loading employee')
      return this.employeeService.allEmployee.pipe(
        map(emp => EmployeeActions.loadEmployeeSuccess({employee: emp})),
        catchError(err => throwError(err))
      )
    })
  ), { useEffectsErrorHandler: false });

  onAddOrUpdateEmployee$ = createEffect(() => this.actions.pipe(
    ofType(EmployeeActions.updateEmployee),
    mergeMap(({employee}) => this.employeeService.createOrUpdateEmployee(employee).pipe(
      map(res => EmployeeActions.updateEmployeeSuccess({employee: res})),
      catchError(err => throwError(err))
    ))
  ), { useEffectsErrorHandler: false });


  onDeleteEmployee$ = createEffect(() => this.actions.pipe(
    ofType(EmployeeActions.deleteEmployee),
    mergeMap(({id}) => this.employeeService.deleteEmployee(id).pipe(
      map(_ => EmployeeActions.deleteEmployeeSuccess({id})),
      catchError(err => throwError(err))
    ))
  ), { useEffectsErrorHandler: false })
}
