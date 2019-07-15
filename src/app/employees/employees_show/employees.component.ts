import { Component, OnInit, OnDestroy } from '@angular/core';
import{ApiService} from '../employeeapi.service';
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
  private empSub:Subscription;
  employeeId:string;
  employee:Employee;
  isLoading=false;
  constructor(public dataService: ApiService,public route:ActivatedRoute) { 
   
  }

  ngOnInit() {

    this.isLoading=true;
    this.dataService.getEmpolyees();
    this.empSub= this.dataService.getEmployeeUpdateListener().subscribe((employess)=>{
      this.employees=employess;
      this.isLoading=false;
    });
   
  }
  ngOnDestroy()
  {
    this.empSub.unsubscribe();
  }
}
