import {Action, createReducer, on} from "@ngrx/store";
import * as EmployeeActions from "./employee.actions";
import {Employee} from "../../models/employee.model";

export const employeeFeatureKey = 'employee';

export interface EmployeeState {
 employee: Employee[];
}

const initialEmployeeState: EmployeeState = {
  employee: []
};

const DEPARTMENT_REDUCER = createReducer(initialEmployeeState,
  on(EmployeeActions.loadEmployeeSuccess, (state, {employee}) => ({...state, employee: [...employee]})),
  on(EmployeeActions.updateEmployeeSuccess, (state, {employee}) => {
    const index = state.employee.findIndex(e => e.id == employee.id);
    if(index != -1) {
      const temp = state.employee.filter(e => e.id != employee.id);
      temp.push(employee);
      return {...state, employee: temp.sort((a,b) => a.id - b.id)}
    } else {
      return {...state, employee: [...state.employee, employee]}
    }
  }),
  on(EmployeeActions.deleteEmployeeSuccess, (state, { id }) => ({...state, employee: state.employee.filter(e => e.id != id)}))
);

export const employeeReducer = (state: EmployeeState | undefined, action: Action) => DEPARTMENT_REDUCER(state, action);
