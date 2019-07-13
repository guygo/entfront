import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Employee} from './employee'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private employeeUpdate= new Subject<Employee[]>();
  apiURL: string = 'http://localhost:3000';
  employees:Employee[];
  constructor(private httpClient: HttpClient) {}
  public  postEmpolyees(employee)
  {
    this.httpClient.post(`${this.apiURL}/employees`,employee).subscribe((message)=>{
     console.log(message);
    });
   
  }
  getEmployeeUpdateListener()
  {
    return this.employeeUpdate.asObservable(); 
  } 
  public  getEmployeById(id)
  {
    if(this.employees)
    {
     return {...this.employees.find(e=>e.id==id)};
  }
}
  public  getEmpolyees()
  {
    this.httpClient.get(`${this.apiURL}/employees`).subscribe((res : Employee[])=>{
      let arr=[];    
      res.forEach((element)=> {
    
        arr.push(new Employee(element));
        
      });
     
      this.employees=arr;
      this.employeeUpdate.next(this.employees);  
    });
   
  } 
}


