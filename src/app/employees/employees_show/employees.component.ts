import { Component, OnInit, OnDestroy } from '@angular/core';
import{EmployeeApiService} from '../employeeapi.service';
import { Subscription } from 'rxjs';
import{Employee} from'../employee';

import { ActivatedRoute, ParamMap } from '@angular/router';
//import{Employee} from './employee.model';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit ,OnDestroy {
  employees:Employee[]=[];
  page:number=1;
  show=true;
  private empSub:Subscription;
  employeeId:string;
  employee:Employee;
  isLoading=false;
  constructor(public dataService: EmployeeApiService,public route:ActivatedRoute) { 
   
  }

  ngOnInit() {

    this.isLoading=true;
    this.dataService.getEmpolyees();
    this.empSub=this.dataService.getEmployeeUpdateListener().subscribe((employess:Employee[])=>{
      if(employess==undefined||employess.length<=0)
      {
        this.show=false;
        this.isLoading=false;
        return;
      }
      this.employees=employess;
      this.isLoading=false;
    });
   
  }
  ngOnDestroy()
  {
    this.empSub.unsubscribe();
  }
  
}
