import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponentComponent} from './page-not-found-component/page-not-found-component.component';
import {EmployeesComponent} from './employees/employees_show/employees.component';
import { EmployeecreateComponent } from './employees/employee_create/employeecreate.component';
const routes: Routes = [
  
  {path:'employees',component:EmployeesComponent},
  {path:'createemployee',component:EmployeecreateComponent},
  {path:'editemployee/:employeeId',component:EmployeecreateComponent},
  { path: '**', component: PageNotFoundComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
