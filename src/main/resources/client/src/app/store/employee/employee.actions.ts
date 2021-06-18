import {createAction, props} from "@ngrx/store";
import {Employee} from "../../models/employee.model";

export const loadAlEmployee = createAction('[Employee State] load');
export const loadEmployeeSuccess = createAction('[Employee State] load success', props<{employee: Employee[]}>());
export const updateEmployee = createAction('[Employee State] update', props<{employee: Employee}>());
export const updateEmployeeSuccess = createAction('[Employee State] update success', props<{employee: Employee}>());
export const deleteEmployee = createAction('[Employee State] delete', props<{id: number}>());
export const deleteEmployeeSuccess = createAction('[Employee State] delete success', props<{id: number}>());
