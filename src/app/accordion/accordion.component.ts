import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tp-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements OnInit {
  @Input() title: string;

  @Input() active: boolean = false;

  @Output() toggleAccordion: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  onClick(event) {
    event.preventDefault();
    this.toggleAccordion.emit(this.active);
  }


  ngOnInit() {
  }

}
