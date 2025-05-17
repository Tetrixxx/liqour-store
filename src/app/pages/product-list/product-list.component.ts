import { Component } from '@angular/core';
import { Liqour } from '../../shared/models/liqour.model';
import { BEVERAGES } from '../product-list/liqour';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material imports from dedicated entry points
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

// In your component class
export class ProductListComponent {
  beverages = BEVERAGES;
  searchTerm = '';
  selectedCategory = 'all';

  // Get unique categories from beverages
  categories: string[] = this.getUniqueCategories();

  private getUniqueCategories(): string[] {
    const allCategories = this.beverages.map(b => b.category);
    return ['all', ...new Set(allCategories)]; // 'all' + unique categories
  }

  get filteredBeverages(): Liqour[] {
    return this.beverages.filter(beverage => {
      const matchesSearch = beverage.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory === 'all' || 
                            beverage.category.toLowerCase() === this.selectedCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }
}
