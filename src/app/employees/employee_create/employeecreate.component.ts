import { Component, OnInit } from '@angular/core';
import{ApiService} from '../employeeapi.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { DatePipe } from '@angular/common';
import {Employee} from '../employee';
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-employeecreate',
  templateUrl: './employeecreate.component.html',
  styleUrls: ['./employeecreate.component.css']
})
export class EmployeecreateComponent implements OnInit {
  public employee;
  formGroup: FormGroup;
  employeeId:string;
  mode='create';
 
  constructor(public dataService: ApiService,public route:ActivatedRoute) { 
   
  }

  submitted = false;

  
  onReset() {
    this.formGroup.reset();
  }
  onSubmit(form: NgForm)
  {
    this.dataService.postEmpolyees(form.value);
  }
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('employeeId'))
      {
        this.employeeId=paramMap.get('employeeId');
        this.employee=this.dataService.getEmployeById(this.employeeId);
        this.mode='edit';
      }
      else
      {
        this.mode='create';
      }
    });
    
    
   
  }

}
