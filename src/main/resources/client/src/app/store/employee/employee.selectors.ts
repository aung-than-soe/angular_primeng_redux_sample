import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromEmployee from './employee.reducer';
import {EmployeeState} from "./employee.reducer";
import {Employee} from "../../models/employee.model";
import {AppState} from "../app-meta.reducer";

const selectEmployeeState = createFeatureSelector<AppState, EmployeeState>(fromEmployee.employeeFeatureKey);

export const findALl = createSelector(selectEmployeeState, state => state.employee);
export const findOne = (id: number) => createSelector(findALl, (employee: Employee[]) => employee.find(e => e.id == id)) || null;
