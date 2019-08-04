import { Component, OnInit } from '@angular/core';
import{EmployeeApiService} from '../employeeapi.service';
import { FormGroup} from "@angular/forms";
import swal from 'sweetalert2';
import { Validators,
  FormControl } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Employee } from '../employee';
import {mimeType} from "./mime-type.validator"

@Component({
  selector: 'app-employeecreate',
  templateUrl: './employeecreate.component.html',
  styleUrls: ['./employeecreate.component.css']
})
export class EmployeecreateComponent implements OnInit {
  public employee;
  imagePreview;
  formGroup: FormGroup;
  employeeId:string;
  mode='create';
  
  message; 
  constructor(public dataService: EmployeeApiService,public route:ActivatedRoute) { 
   
  }

  submitted = false;
  
  onImagePicked(event:Event)
  {
    
    const file=(event.target as HTMLInputElement).files[0];
    
    if(file==undefined)
    {
      return;
    }
    this.formGroup.patchValue({image:file});
   
    const reader= new FileReader();
    reader.onload=()=>
    {
      this.imagePreview=reader.result;
    };
    reader.readAsDataURL(file);
    
  }
 
  onSubmit()
  { 
   
    if (this.formGroup.valid) {
        
          if(this.mode=='edit')
        {
         
          
          this.dataService.updateEmployee(this.employeeId,this.formGroup.value);
        
        }
        else{
        
          this.dataService.postEmpolyees(this.formGroup.value);
          this.formGroup.reset();
        }
    } 
  
  }
  ngOnInit() {
    this.formGroup = new FormGroup({
      last_name: new FormControl(null, {
        validators: [Validators.required]
      }),
      first_name: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      hire_date: new FormControl(null, { validators: [Validators.required] }),
      birth_date: new FormControl(null, { validators: [Validators.required] }),
      gender: new FormControl(null, { validators: [Validators.required] })
    });
    
   

    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('employeeId'))
      {
        
        this.employeeId=paramMap.get('employeeId');
        this.dataService.getEmpolyeeById(this.employeeId).subscribe(res=>{
        
          if(res.message=='not found')
          {
            swal.fire('not found',"id doesn't exist",'warning');
            return;
          }

          this.employee=new Employee(res);
          
          this.formGroup.setValue({
            
            first_name:this.employee.first_name,
            last_name:this.employee.last_name,
            hire_date:this.employee.hire_date,
            birth_date:this.employee.birth_date,
            gender:this.employee.gender,
            image:this.employee.imageUrl
          });
          this.imagePreview=this.employee.imageUrl;
        });
        this.mode='edit';
      }
      else
      {
        this.mode='create';
      }
    });
   
  }
 
 
 
}
