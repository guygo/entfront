import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http"
import { Router } from '@angular/router';
import { User } from './user';
import { Subject } from 'rxjs';
@Injectable({providedIn: "root"})
export class AuthService
{
    constructor(private httpClient: HttpClient,private router:Router) {}
    private apiURL: string = 'http://localhost:3000/api/Auth';
    private token:string;
    private tokenTimer:any;
    private isAuth:boolean=false;
    private  authListener=new Subject<boolean>();
    login(user:User)
    {
      this.httpClient.post<{token:string,expiresIn:number}>(this.apiURL+'/login',user).subscribe(res =>
        {
      
          this.token=res.token;
          if(this.token){
            const expiresDuration=res.expiresIn;
            this.setTimer(expiresDuration);
            this.isAuth=true;
            this.authListener.next(true);
            const now= new Date();
          
            const d=new Date(now.getTime()+expiresDuration*10000);
          
            this.saveAuthData(this.token,new Date(now.getTime()+expiresDuration*1000));
            this.router.navigate(['/']);
          }
         
      });
    }
    IsAuth()
    {
     
      return this.isAuth;
    }
    logout()
    {
      clearTimeout(this.tokenTimer);
      this.token=null;
      this.isAuth=false;
      this.authListener.next(false);
      this.router.navigate(['/login']);
      this.clearAuthDate();
    }
    private setTimer(duration:number)
    {
      this.tokenTimer=setTimeout(()=>{
        this.logout();
      },duration*1000);
    }
    getToken()
    {
      return this.token;
    }
    getAuthStatusListener()
    {
      return this.authListener.asObservable();
    }
    private saveAuthData(token:string,expiresDate:Date)
    {
       localStorage.setItem('token',token);
       localStorage.setItem('expiration',expiresDate.toISOString());
    }
    private clearAuthDate()
    {
       localStorage.removeItem("token");
       localStorage.removeItem("expiration");
    }
    private getAuthData()
    {
      const token= localStorage.getItem('token');
      const expiresDate=localStorage.getItem('expiration');
      if(!token||!expiresDate)
      {
        return;
      }
      return{
        token:token,
        expirationDate:new Date(expiresDate)
      };
    }
    autoAuthUser(){
     const authInfo =this.getAuthData();
     if(!authInfo)
     {
       return;
     }
     const now=new Date();
     const PassedTime=authInfo.expirationDate.getTime()-now.getTime();
     if(PassedTime>0){
       this.token=authInfo.token;
       this.isAuth=true;
       this.authListener.next(true);
       this.setTimer(PassedTime/1000);
      }
     

    }
}