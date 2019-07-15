import { Component, OnInit } from '@angular/core';
import{ApiService} from '../employeeapi.service';
import { FormGroup} from "@angular/forms";
import swal from 'sweetalert2';
import { NgForm,Validators,
  FormControl,FormBuilder } from "@angular/forms";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Employee } from '../employee';
@Component({
  selector: 'app-employeecreate',
  templateUrl: './employeecreate.component.html',
  styleUrls: ['./employeecreate.component.css']
})
export class EmployeecreateComponent implements OnInit {
  public employee;
  formGroup: FormGroup;
  employeeId:string;
  mode='create';
  message; 
  constructor(public dataService: ApiService,public route:ActivatedRoute,private formBuilder: FormBuilder) { 
   
  }

  submitted = false;

  
  
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
    } else {
      this.validateAllFormFields(this.formGroup);
    }
   
    
   
  }
  ngOnInit() {
    
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
          
        });
        this.mode='edit';
      }
      else
      {
        this.mode='create';
      }
    });
    this.formGroup = this.formBuilder.group({
      
      last_name: [null, [Validators.required]],
      first_name:[null,[Validators.required]],
      hire_date: [null, [Validators.required]],
      birth_date:[null,[Validators.required]],
      gender: [null, [Validators.required]]
     
    });
    
   
  }
  isFieldValid(field: string) {
    return !this.formGroup.get(field).valid && this.formGroup.get(field).touched;
  }
  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
