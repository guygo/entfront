import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Employee} from './employee'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  apiURL: string = 'http://localhost:3000';
 
  constructor(private httpClient: HttpClient) {}
  public  postEmpolyees(employee)
  {
    this.httpClient.post(`${this.apiURL}/employees`,employee).subscribe((message)=>{
     console.log(message);
    });
   
  } 
  public  getEmpolyees(callback)
  {
    this.httpClient.get(`${this.apiURL}/employees`).subscribe((res : Employee[])=>{
      let arr=[];    
      res.forEach(function(element) {
    
        arr.push(new Employee(element));
        
      });
     
     callback(arr);
      
    });
   
  } 
}


