import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Employee} from './employee'
import { Subject } from 'rxjs';
import swal from 'sweetalert2'; 
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private employeeUpdate= new Subject<Employee[]>();
  apiURL: string = 'http://localhost:3000';
  employees:Employee[];
  constructor(private httpClient: HttpClient,private router:Router) {}
  public  postEmpolyees(employee)
  {
    this.httpClient.post(`${this.apiURL}/employees`,employee).subscribe((message)=>{
     console.log(message);
     this.router.navigate(["/"]);
    });
   
  }
  updateEmployee(id,employee)
  {
    
    this.httpClient.put(`${this.apiURL}/employees/`+id,employee).subscribe((message)=>{
      console.log(message);
      
      this.router.navigate(["/"]);
     });
  }
  getEmployeeUpdateListener()
  {
    return this.employeeUpdate.asObservable(); 
  } 
  
 
  public getEmpolyeeById(id)
  {
    return this.httpClient.get<any>(`${this.apiURL}/employees/`+id);
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


