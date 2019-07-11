import { Component, OnInit } from '@angular/core';
import{ApiService} from '../employeeapi.service';
import { Observable, from } from 'rxjs';
import{Employee} from'../employee'
//import{Employee} from './employee.model';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees:Employee[]=[];
  page:number=1;
  

  constructor(public dataService: ApiService) { 
   
  }

  ngOnInit() {
    
    this.dataService.getEmpolyees((data)=>
    {
      this.employees=data;
      console.log(data);
    });
    
   
  }

}
