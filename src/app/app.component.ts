// src/app/app.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// A routerLink-hez és routerLinkActive-hez
import {RouterOutlet } from '@angular/router';

import { MenuComponent } from './shared/menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MenuComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'liqour-store';
}

