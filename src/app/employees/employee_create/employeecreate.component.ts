import { Component, OnInit } from '@angular/core';
import{ApiService} from '../employeeapi.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { DatePipe } from '@angular/common';
import {Employee} from '../employee'
@Component({
  selector: 'app-employeecreate',
  templateUrl: './employeecreate.component.html',
  styleUrls: ['./employeecreate.component.css']
})
export class EmployeecreateComponent implements OnInit {
  public employee;
  formGroup: FormGroup;
 
 
  constructor(public dataService: ApiService) { 
   
  }

  submitted = false;

  onSubmit() { 
    const hiredateSendingToServer = new DatePipe('en-US').transform(this.formGroup.value.hire_date, 'dd/MM/yyyy');
    const birthdateSendingToServer = new DatePipe('en-US').transform(this.formGroup.value.birth_date, 'dd/MM/yyyy');
    
    let employe=new Employee(this.formGroup.value)

    console.log(employe);
    this.dataService.postEmpolyees(this.formGroup.value);
  }
  onReset() {
    this.formGroup.reset();
  }
  ngOnInit() {
    this.formGroup = new FormGroup({
      first_name: new FormControl('', [
        Validators.required,
       
      ]),
      last_name: new FormControl('', [
        Validators.required,
       
      ]), 
      hire_date: new FormControl('', [
        Validators.required,
       
      ]),
      birth_date: new FormControl('', [
        Validators.required,
        
      ]),
      gender:new FormControl('', [
        Validators.required,
        
      ]),
    });
    
    
   
  }

}
