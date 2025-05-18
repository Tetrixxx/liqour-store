import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Liqour } from '../../shared/models/liqour.model';
import { LiqourService } from '../../shared/services/liqour.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  imports: [
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [LiqourService]
})

export class HomeComponent implements OnInit {
  featuredScotch$!: Observable<Liqour[]>;

  constructor(private liqourService: LiqourService) {}

  ngOnInit(): void {
    this.featuredScotch$ = this.liqourService.getTopPremiumScotch();
  }
}