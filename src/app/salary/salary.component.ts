import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeApiService } from '../employees/employeeapi.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit {

  constructor(public dataService:EmployeeApiService,public route:ActivatedRoute,private router:Router) { }
  formGroup: FormGroup;
  employeeId:string;
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('employeeId'))
      {
        this.employeeId=paramMap.get('employeeId');
      }
      else
      {
        this.router.navigate(['/']);
      }
    });
    this.formGroup = new FormGroup({
      salary: new FormControl(null, {
        validators: [Validators.required]
      }),
    
      fromDate: new FormControl(null, { validators: [Validators.required] }),
      toDate: new FormControl(null, { validators: [Validators.required] }),
     
    });
  }
  onSubmit()
  { 
   
    if (this.formGroup.valid) {
         
          this.dataService.postSalary(this.formGroup.value,this.employeeId);
          this.formGroup.reset();
        }
  } 
  
  

}
