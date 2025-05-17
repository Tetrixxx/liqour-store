// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
    imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatSidenavModule
    ]
})
export class ProfileComponent implements OnInit {
  user: any;
  defaultAddress = null;

  constructor(
    private auth: Auth,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.auth.onAuthStateChanged(user => {
      this.user = user;
    });
  }

  logout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  openDeleteDialog() {

  }

  changePassword() {
    // Jelszóváltoztatás implementációja
  }

  openEditDialog() {
    // Profil szerkesztés implementációja
  }
}