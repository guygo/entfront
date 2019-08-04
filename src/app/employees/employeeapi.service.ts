import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Employee} from './employee'
import { Subject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import swal from 'sweetalert2'; 
import { Router } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})

export class EmployeeApiService {
  private employeeUpdate= new Subject<Employee[]>();
  apiURL: string = 'http://localhost:3000/api';
  employees:Employee[];
  constructor(private httpClient: HttpClient,private router:Router) {}
  public postSalary(data,id)
  {
    alert(JSON.stringify(data));
    this.httpClient.post<{message:string}>(`${this.apiURL}/Employees/`+id+'/salary',data).subscribe((message)=>{
      
      console.log(message);
      this.router.navigate(["employees/"+id+"/title"]);
     });
  }
  public postTitle(data,id)
  {
    alert(JSON.stringify(data));
    this.httpClient.post<{message:string}>(`${this.apiURL}/Employees/`+id+'/title',data).subscribe((message)=>{
      
      console.log(message);
      this.router.navigate(["/"]);
     });
  }
  public  postEmpolyees(data)
  {
    const formData=new FormData();
    
    formData.append("first_name",data.first_name);
    formData.append("last_name",data.last_name);
    formData.append("hire_date",data.hire_date);
    formData.append("birth_date",data.birth_date);
    formData.append("gender",data.gender);
    formData.append("image",data.image,data.first_name);
    this.httpClient.post<{message:string,id:string}>(`${this.apiURL}/employees`,formData).subscribe((message)=>{
     console.log(message);
     this.router.navigate(["employees/"+message.id+"/salary"]);
    });
   
  }
  gettitle(id)
  {
    return this.httpClient.get(`${this.apiURL}/employees/title/`+id);
  }
  getSalary(id)
  {
    return this.httpClient.get(`${this.apiURL}/employees/salary/`+id);
  }
  updateEmployee(id,employee)
  {
    let formData;
    if(typeof(employee.image)=='string')
    {
      formData={
        "first_name":employee.first_name,
        "last_name":employee.last_name,
        "hire_date":employee.hire_date,
        "birth_date":employee.birth_date,
        "gender":employee.gender,
        "imageUrl":employee.image

      };  
    }
    else
    {
    formData=new FormData();
    formData.append("first_name",employee.first_name);
    formData.append("last_name",employee.last_name);
    formData.append("hire_date",employee.hire_date);
    formData.append("birth_date",employee.birth_date);
    formData.append("gender",employee.gender);
    formData.append("image",employee.image,employee.first_name);
    }
    this.httpClient.put(`${this.apiURL}/employees/`+id,formData).subscribe((message)=>{
      console.log(message);
      
      this.router.navigate(["/"]);
     });
  }
  getEmployeeUpdateListener()
  {
    return this.employeeUpdate.asObservable(); 
  } 
  
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return [];
  }
  public getEmpolyeeById(id)
  {
    return this.httpClient.get<any>(`${this.apiURL}/employees/`+id).pipe( retry(1),
    catchError(this.handleError));
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
    },error => this.employeeUpdate.next([]));
   
  } 
}


