import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { EmployeeApiService } from '../employees/employeeapi.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

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
      title: new FormControl(null, {
        validators: [Validators.required]
      }),
    
      fromDate: new FormControl(null, { validators: [Validators.required] }),
      toDate: new FormControl(null, { validators: [Validators.required] }),
     
    });
  }
  onSubmit()
  { 
   
    if (this.formGroup.valid) {
         
          this.dataService.postTitle(this.formGroup.value,this.employeeId);
          this.formGroup.reset();
        }
  } 

}
