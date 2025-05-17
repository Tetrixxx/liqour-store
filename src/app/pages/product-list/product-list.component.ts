// product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Liqour } from '../../shared/models/liqour.model';
import { LiqourService } from '../../shared/services/liqour.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Inject } from '@angular/core';

// Angular Material imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  // Definite assignment assertion operátorok hozzáadva
  beverages$!: Observable<Liqour[]>;
  categories$!: Observable<string[]>;
  filteredBeverages$!: Observable<Liqour[]>;
  
  // Filter controls
  searchTerm = '';
  selectedCategory = 'all';
  
  // Subjects for filtering
  private searchTerm$ = new BehaviorSubject<string>('');
  private category$ = new BehaviorSubject<string>('all');
  constructor(@Inject(LiqourService) private liqourService: LiqourService) {}

  ngOnInit(): void {
    this.initData();
    this.setupFiltering();
  }

  private initData(): void {
    this.beverages$ = this.liqourService.getLiqours();
    this.categories$ = this.liqourService.getCategories();
  }

  private setupFiltering(): void {
    this.filteredBeverages$ = combineLatest([
      this.beverages$,
      this.searchTerm$.pipe(startWith('')),
      this.category$.pipe(startWith('all'))
    ]).pipe(
      map(([beverages, searchTerm, category]) => 
        beverages.filter(b => 
          this.filterByCategory(b, category) &&
          this.filterBySearchTerm(b, searchTerm)
        )
      )
    );
  }

  private filterByCategory(beverage: Liqour, category: string): boolean {
    return category === 'all' || beverage.category === category;
  }

  private filterBySearchTerm(beverage: Liqour, searchTerm: string): boolean {
    return beverage.name.toLowerCase().includes(searchTerm.toLowerCase());
  }

  updateSearch(): void {
    this.searchTerm$.next(this.searchTerm);
  }

  updateCategory(): void {
    this.category$.next(this.selectedCategory);
  }
}