// liqour.service.ts
import { Injectable } from '@angular/core';
import { 
  Firestore,
  collection,
  collectionData,
  doc,
  getDocs,
  query,
  setDoc,
  where
} from '@angular/fire/firestore';
import { Liqour } from '../models/liqour.model';
import { Observable, map } from 'rxjs';
import { BEVERAGES } from '../../pages/product-list/liqour';

@Injectable({ providedIn: 'root' })
export class LiqourService {
  private readonly collectionName = 'liqours';

  constructor(private firestore: Firestore) {}

    async seedInitialData(): Promise<void> {
    const existingData = await getDocs(collection(this.firestore, this.collectionName));
    
    // Csak akkor töltse fel, ha még nincs adat
    if (existingData.empty) {
      const batch = [];
      const liqoursCollection = collection(this.firestore, this.collectionName);

      for (const liqour of BEVERAGES) {
        const docRef = doc(liqoursCollection);
        batch.push(setDoc(docRef, liqour));
      }

      await Promise.all(batch);
    }
  }

  getLiqours(): Observable<Liqour[]> {
    const liqoursCollection = collection(this.firestore, this.collectionName);
    return collectionData(liqoursCollection, { idField: 'id' }) as Observable<Liqour[]>;
  }

  getCategories(): Observable<string[]> {
    return this.getLiqours().pipe(
      map(beverages => {
        const categories = beverages.map(b => b.category);
        return ['all', ...new Set(categories)];
      })
    );
  }

  getLiqoursByCategory(category: string): Observable<Liqour[]> {
    const q = query(
      collection(this.firestore, this.collectionName),
      where('category', '==', category)
    );
    return collectionData(q, { idField: 'id' }) as Observable<Liqour[]>;
  }
}