import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponentComponent} from './page-not-found-component/page-not-found-component.component';
import {EmployeesComponent} from './employees/employees_show/employees.component';
import { EmployeecreateComponent } from './employees/employee_create/employeecreate.component';

import { EmployeprofileComponent } from './employees/employeprofile/employeprofile.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from './login/auth.Guard';
import { SalaryComponent } from './salary/salary.component';
import { TitleComponent } from './title/title.component';
import { EventCalendarComponent } from './event-calendar/event-calendar.component';
const routes: Routes = [
  {path:'showProfile/:employeeId',component:EmployeprofileComponent},
  {path:'',component:HomePageComponent},
  {path:'login',component:LoginComponent},
  {path:'calendar',component:EventCalendarComponent,canActivate:[AuthGuard]},
  {path:'employees',component:EmployeesComponent,canActivate:[AuthGuard]},
  {path:'createemployee',component:EmployeecreateComponent,canActivate:[AuthGuard]},
  {path:'editemployee/:employeeId',component:EmployeecreateComponent,canActivate:[AuthGuard]},
  {path:'employees/:employeeId/salary',component:SalaryComponent,canActivate:[AuthGuard]},
  {path:'employees/:employeeId/title',component:TitleComponent,canActivate:[AuthGuard]},
  { path: '**', component: PageNotFoundComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
