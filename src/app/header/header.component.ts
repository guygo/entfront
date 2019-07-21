import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  private authSub:Subscription;
  constructor(private authService:AuthService) { }
  authenticate:boolean;
  ngOnInit() {
    //in case that listener update too slow 
    this.authenticate=this.authService.IsAuth();
    this.authSub=this.authService.getAuthStatusListener().subscribe(isAuth=>{
      this.authenticate=isAuth;
    });
  }
  logout()
  {
    
    this.authService.logout();

  }
  ngOnDestroy()
  {
    this.authSub.unsubscribe();
  }
}
