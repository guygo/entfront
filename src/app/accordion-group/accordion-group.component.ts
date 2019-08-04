import { Component, OnInit, ContentChildren, QueryList } from '@angular/core';
import { AccordionComponent } from '../accordion/accordion.component';

@Component({
  selector: 'tp-accordion-group',
  templateUrl: './accordion-group.component.html',
  styleUrls: ['./accordion-group.component.css']
})
export class AccordionGroupComponent  {

  @ContentChildren(AccordionComponent) accordions: QueryList<AccordionComponent>;
  private subscriptions = [];

  private _accordions:QueryList<AccordionComponent>;

  constructor() {}

  ngAfterContentInit() {

    this._accordions = this.accordions;
    this.removeSubscriptions();
    this.addSubscriptions();

    this.accordions.changes.subscribe(rex => {
      this._accordions = rex;
      this.removeSubscriptions();
      this.addSubscriptions();
    });
  }

  addSubscriptions() {
    this._accordions.forEach(a => {
      let subscription = a.toggleAccordion.subscribe(e => {
        this.toogleAccordion(a);
      });
      this.subscriptions.push(subscription);
    });
  }

  removeSubscriptions() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  toogleAccordion(accordion) {
    if (!accordion.active) {
      this.accordions.forEach(a => a.active = false);
    }
    // set active accordion
    accordion.active = !accordion.active;
  }

  ngOnDestroy() {
    this.removeSubscriptions();
  }
}
