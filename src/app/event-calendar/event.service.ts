import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class CalendarApiService {
  apiURL: string = 'http://localhost:3000/api/calendar';
  constructor(private httpClient: HttpClient,private router:Router) {}
  public postEvent(data)
  {
    this.httpClient.post(`${this.apiURL}/`,data).subscribe((message)=>{
      console.log(message);
    });
  }
 
}


