import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-menu',
  imports: [
    RouterLinkWithHref, // <a routerLink="...">
    RouterLink, // [routerLink] binding
    RouterLinkActive, // routerLinkActive
    CommonModule
],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit, AfterViewInit{


  @Output() selectedPage: EventEmitter<string> = new EventEmitter();

  
  constructor(public auth: Auth) {}

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