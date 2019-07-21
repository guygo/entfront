import { Component, OnInit } from '@angular/core';
import { ApiService } from '../employeeapi.service';
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
  constructor(public dataService: ApiService,public route:ActivatedRoute) { }

  ngOnInit() {
   
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      
      if(paramMap.get('employeeId')!=undefined)
      {
       
        this.employeeId=paramMap.get('employeeId');
        console.dir(paramMap.get('employeeId'));
        this.dataService.getEmpolyeeById(this.employeeId).subscribe(res=>{
      
          if(res.message=='not found')
          {
              return;
          }
         
          this.employee=new Employee(res);
          this.image=this.employee.imageUrl;
          
        });
        
      }
     
    });
    
  }

}
