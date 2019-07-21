import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { EmployeesComponent } from './employees/employees_show/employees.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { DepartmentsComponent } from './departments/departments.component';
import { EmployeecreateComponent } from './employees/employee_create/employeecreate.component';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


import { EmployeprofileComponent } from './employees/employeprofile/employeprofile.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptor } from './login/auth-interceptor';
import { HomePageComponent } from './home-page/home-page.component';
@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    PageNotFoundComponentComponent,
    DepartmentsComponent,
    EmployeecreateComponent,
    EmployeprofileComponent,
    LoginComponent,
    HeaderComponent,
    HomePageComponent
    
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    NgBootstrapFormValidationModule.forRoot(),
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
  })
  ],
  
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
