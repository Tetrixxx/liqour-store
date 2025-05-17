import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material modules
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';

// Angular forms and router modules
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';

import { MenuComponent } from './shared/menu/menu.component';
import { LiqourService } from './shared/services/liqour.service'; // Importáld a szervízed

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MenuComponent,
    RouterOutlet,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterModule,
    FormsModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
  ],
  providers: [LiqourService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'liqour-store';

  constructor(@Inject(LiqourService) private liqourService: LiqourService) {}

  async ngOnInit() {
    try {
      console.log('Alapadatok feltöltése...');
      await this.liqourService.seedInitialData();
      console.log('Alapadatok sikeresen feltöltve!');
    } catch (error) {
      console.error('Hiba történt az adatfeltöltés során:', error);
    }
  }
}