import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, orderBy, collectionData } from '@angular/fire/firestore';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private firestore: Firestore) {}

  // Új rendelés létrehozása
  async createOrder(order: Omit<Order, 'id'|'createdAt'>) {
    const ordersRef = collection(this.firestore, 'orders');
    return addDoc(ordersRef, {
      ...order,
      createdAt: new Date()
    });
  }

  // Felhasználó rendeléseinek lekérése
  getUserOrders(userId: string) {
    const ordersRef = collection(this.firestore, 'orders');
    const userOrdersQuery = query(
      ordersRef, 
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    return collectionData(userOrdersQuery, { idField: 'id' });
  }
}