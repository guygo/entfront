import { Component, OnInit, ViewChild,Renderer2, ElementRef, AfterViewInit } from '@angular/core';

import Swal from 'sweetalert2';

import { CalendarApiService } from './event.service';
import { ModalService } from '../modal-component/modal.service';
import * as moment from 'moment';
@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.css']
})
export class EventCalendarComponent implements OnInit {
  days=[];
  htmlMonth='January';
  months=['January', 'February', 'March', 'April', 'May'
  , 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  messages={};
  events:EventCal[]=[]
  month:number;
  year:number;
  inputOptions:any;
  title:string;
  time:any;
  description:string;
  montIndex;
  date:Date;
  
  constructor(private renderer: Renderer2, private elem: ElementRef,public calendarService:CalendarApiService,public modalService: ModalService) { }
  ngOnInit() {
  this.date=new Date();
  this.montIndex=this.date.getMonth();
  this.htmlMonth=this.months[this.montIndex];
  this.GenreateCal();
   }
  openModal(id: string) {
  
   this.modalService.open(id);
   
  }

  closeModal(id: string,cb) {
      this.modalService.close(id,cb);
  }

   
  async addEvent()
  {
  
    let elements = this.elem.nativeElement.querySelectorAll('.selected');
    if(elements.length==0)
      return;
     this.openModal('custom-modal-1');
      
  }
  select(event)
  {
    let target = event.target || event.srcElement || event.currentTarget;
    
    if(!target.className.includes("selected"))
    { 
       target.className+=' selected';
    }
    else
    {
      target.className='day';
    }
  }
  mod(n,m)
  {
    return ((n%m)+m)%m;
  }
  GenreateCal()
  {
    
    this.days=[];
    let currentdaynum=this.getDaysInMonth(this.date.getMonth()+1,this.date.getFullYear(),0);
    this.month=this.date.getMonth()+1;
    this.year=this.date.getFullYear();
    let firstday=(new Date(this.date.getFullYear(),this.date.getMonth(),1).getDay());
    let firstweekoffest=this.mod(firstday,7);
    let dayinweek={week:[],count:0};
    let offdays=31-(firstweekoffest-1);
    let curentMontCount=1;
    let reserve=1;
    for(let i=0;i<42;i++)
    {
      this.createWeek(dayinweek);
      if( (dayinweek.count+2)<(firstweekoffest+1))
      { 
         
         dayinweek.week.push({day:offdays++,off:'dayoff'});
      }
      else if(curentMontCount<=currentdaynum)
      {
        dayinweek.week.push({day:curentMontCount,off:'day'});
        curentMontCount++;

      }
      else
      {
        dayinweek.week.push({day:reserve,off:'dayoff'});
        reserve++;
      }
      dayinweek.count++;
    }
  }
  private createWeek(dayinweek)
  {
    if(dayinweek.count%7==0&&dayinweek.count!=0){
      this.days.push(dayinweek.week);
      dayinweek.week=[];
    }
  }
  getDaysInMonth = function(month,year,day) {
    return new Date(year, month, day).getDate();
   };
  
  save()
  {
   
    this.calendarService.postEvent(this.events);
   
  }
  saveModal(desc,title,time,id)
  {
    
    this.closeModal(id,()=>{
      if(title==''||title==undefined||desc==''||desc==undefined||time==undefined)
      {
        return;
      }
      let t=time.split(":");

      let ev={description:desc,title:title,time:{h:parseInt(t[0]),m:parseInt(t[1])}};
      let elements = this.elem.nativeElement.querySelectorAll('.selected');
      
      elements.forEach(element => {
          const div: HTMLParagraphElement = this.renderer.createElement('div');
          //div.innerHTML = ev;
          div.className='circle';
         let box=element.children[0];       
          div.onclick=()=>alert(ev);
          div.style.top=55+'px';
        
        
          this.renderer.appendChild(box, div);
          let d=new Date(this.year,this.month,parseInt(element.id),ev.time.h,ev.time.m);
          let date=moment(d).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
          let event:EventCal={title:ev.title,description:ev.description,date:date};
          this.events.push(event);
          //this.messages[element.id].push({X:x});
        });
      });
  }
  next()
  {
    this.montIndex++;
    this.montIndex=this.montIndex%this.months.length;
    this.htmlMonth=this.months[ this.montIndex];
    this.date.setMonth(this.montIndex);
    this.GenreateCal();
  }
  prev()
  {
    this.montIndex--;
    if(this.montIndex<0)
    {
      this.montIndex=(this.months.length+this.montIndex)%this.months.length;
    }
    this.htmlMonth=this.months[ this.montIndex];
    this.date.setMonth(this.montIndex);
    this.GenreateCal();
  }
  selectedMonth(value)
  {
    this.montIndex=value;
    this.htmlMonth=this.months[ this.montIndex];
    this.date.setMonth(value);
    this.GenreateCal();
  }
  
}


