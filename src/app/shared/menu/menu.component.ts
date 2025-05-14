import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterLinkWithHref, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [
    RouterLinkWithHref, // <a routerLink="...">
    RouterLink, // [routerLink] binding
    RouterLinkActive // routerLinkActive
],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit, AfterViewInit{


  @Output() selectedPage: EventEmitter<string> = new EventEmitter();

  
  constructor(){
    console.log("construtor called");
  }

  ngOnInit(): void {
    console.log("ngOnInit called");
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit called");
  }

  menuSwitch(pageValue: string) {
    this.selectedPage.emit(pageValue);
  }
  

}