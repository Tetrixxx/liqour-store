import { Liqour } from '../../models/liqour.model';

export interface CartItem {  
  beverage: Liqour;  
  quantity: number;  
}

export const CART_ITEMS: CartItem[] = [
  {
    beverage: {
      id: '1',
      name: 'Jack Daniel\'s Old No.7',
      price: 25.99,
      category: 'Whiskey',
      alcoholPercentage: 40,
      volume: 700,
      countryOfOrigin: 'USA',
      ageRestricted: true
    },
    quantity: 1
  },
  {
    beverage: {
      id: '2',
      name: 'Absolut Vodka',
      price: 19.99,
      category: 'Vodka',
      alcoholPercentage: 40,
      volume: 1000,
      countryOfOrigin: 'Sweden',
      ageRestricted: true
    },
    quantity: 2
  }
];