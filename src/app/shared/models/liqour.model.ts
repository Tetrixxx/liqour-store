import { Timestamp } from '@angular/fire/firestore';

export interface Liqour {
  id?: string; // Firestore automatikus ID-ja (opcionális létrehozáskor)
  name: string;
  price: number;
  category: 'Whiskey' | 'Vodka' | 'Rum' | 'Gin' | 'Tequila'| 'Pálinka'| 'Other';
  alcoholPercentage: number;
  volume: number;
  countryOfOrigin: string;
  createdAt?: Timestamp; // Firestore timestamp
}