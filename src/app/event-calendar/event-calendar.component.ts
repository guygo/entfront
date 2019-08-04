import { Component, OnInit, ViewChild,Renderer2, ComponentFactoryResolver, ElementRef, AfterViewInit } from '@angular/core';

import Swal from 'sweetalert2';

import { CalendarApiService } from './event.service';

@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.css']
})
export class EventCalendarComponent implements OnInit,AfterViewInit {
  days=[];
  messages={};
  month:number;
  year:number;
  @ViewChild('body',null) body: ElementRef;
  constructor(private renderer: Renderer2, private elem: ElementRef) { }

  ngOnInit() {
  let now=new Date();
  this.GenreateCal(now)

  }
  ngAfterViewInit() {
    // assume dynamic HTML was added before
    
    this.elem.nativeElement.querySelectorAll('.day').forEach(element => {
      element.addEventListener('click', 
      this.select);
    });
  }
  async addEvent()
  {

    let elements = this.elem.nativeElement.querySelectorAll('.selected');
    if(elements.length==0)
      return;
    const {value: ev}  = await Swal.fire({
      title: 'Event',
      html:
        
        '<input id="swal-input1" class="swal2-input">' +
        '<textarea id="swal-input2" style="width:100%;height:100px" class="swal2-textarea"   rows="5" cols="33"></textarea>',
      focusConfirm: false,
      preConfirm: () => {
        let title:any=document.getElementById('swal-input1');
        let description:any=document.getElementById('swal-input2');
        return {
          title:title.value,
          description:description.value
        }
      }
    })
    
    if (ev) {
      let rect=elements[0].getBoundingClientRect();
      let y=rect.top+115;
      elements.forEach(element => {
        this.messages[element.id].forEach(e=>{
                  
        });
      });
      
    
      elements.forEach(element => {
        const div: HTMLParagraphElement = this.renderer.createElement('div');
        //div.innerHTML = ev;
        div.className='circle';
        let x=element.getBoundingClientRect().right-15;
     
        this.messages[element.id].forEach(element => {
          if(x>=element.X)
          {
            x=element.X-15;
          }
        });
        div.onclick=()=>alert(ev);
        div.style.left=x+'px';
      
        div.style.top=y+'px';
        this.renderer.appendChild(this.body.nativeElement, div);
        let date=new Date(this.year,this.month,parseInt(element.id)).toDateString();
       
        this.messages[element.id].push({day:'',event:{title:ev.title,description:ev.description,date:date},X:x});
      });
    }
   
   
    
    
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

  GenreateCal(date)
  {
    let daynum=this.getDaysInMonth(date.getMonth()+1,date.getFullYear(),0);
    this.month=date.getMonth()+1;
    this.year=date.getFullYear();
    let numOfFirstNoneDays=new Date(date.getFullYear(),date.getMonth(),1).getDay();
    let numOfLastNoneDays=((7-this.getDaysInMonth(date.getMonth()+1,date.getFullYear(),1))%7);
    let week=[];
    let count=0;
    let offdays=31-(numOfFirstNoneDays-2);
    for(let i=1;i<numOfFirstNoneDays;i++)
    {
      week.push({day:offdays++,off:'dayoff'});
      count++;
    }
   
    
    for(let i=1;i<=daynum;i++)
    {
      this.messages[i]=[];
      if(count%7==0){
        this.days.push(week);
        week=[];
      }
      count++;
      week.push({day:i,off:'day'});
    }
    
    for(let i=1;i<=numOfLastNoneDays;i++)
    {
      if(count%7==0){
        this.days.push(week);
        week=[];
      }
      count++;
      week.push({day:i,off:'dayoff'});
    }
    if(count%7==0){
      this.days.push(week);
      week=[];
    }
   }
  
  getDaysInMonth = function(month,year,day) {
    return new Date(year, month, day).getDate();
   };
  

 
  
    
}


