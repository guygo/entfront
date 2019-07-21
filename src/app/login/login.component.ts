import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() login: boolean;
  @Output() loginChange = new EventEmitter();
  form: FormGroup;
 
  constructor(public Service: AuthService) { }

  onSubmit()
  {
   
    this.Service.login(this.form.value);
    this.loginChange.emit(true);
  }
  ngOnInit() {
    this.form = new FormGroup({
      
      email: new FormControl(null, { validators: [Validators.required,Validators.email] }),
      
      password: new FormControl(null, { validators: [Validators.required,Validators.minLength(4)] })
     
    });
  }

}
