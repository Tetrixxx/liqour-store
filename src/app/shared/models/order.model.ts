import { Liqour } from './liqour.model';
import { Timestamp } from '@firebase/firestore';

export interface Order {
  id?: string;
  userId: string; // User ID referenciája
  items: Array<{
    liqourId: string; // Liqour dokumentum referenciája
    quantity: number;
    priceAtPurchase: number;
  }>;
  total: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Timestamp;
}