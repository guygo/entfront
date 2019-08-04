import { Component, OnInit } from '@angular/core';
import { EmployeeApiService } from '../employeeapi.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Employee } from '../employee';


@Component({
  selector: 'app-employeprofile',
  templateUrl: './employeprofile.component.html',
  styleUrls: ['./employeprofile.component.css']
})
export class EmployeprofileComponent implements OnInit {
  employee:Employee;
  employeeId: string;
  image:string;
  salary:number;
  title:string;
  constructor(public dataService: EmployeeApiService,public route:ActivatedRoute) { }

  ngOnInit() {
   
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      
      if(paramMap.get('employeeId')!=undefined)
      {
       
        this.employeeId=paramMap.get('employeeId');
        console.dir(paramMap.get('employeeId'));
       // this.dataService.getSalary(this.employeeId).subscribe((res : any[])=>{
          
          
        //  this.salary=res[0].salary; 
        //});
        this.salary=100;
        this.dataService.getEmpolyeeById(this.employeeId).subscribe(res=>{
          alert(JSON.stringify(res));
          if(res.message=='not found')
          {
              return;
          }
         
          this.employee=new Employee(res);
          console.log(JSON.stringify(this.employee));
          this.image=this.employee.imageUrl;
        
    
          });
       
        
      }
     
    });
    
  }

}
