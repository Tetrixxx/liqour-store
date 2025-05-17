
import { Liqour } from '../../shared/models/liqour.model';

export const BEVERAGES: Liqour[] = [
  {
    id: '1',
    name: 'Jack Daniel\'s Old No.7',
    price: 25.99,
    category: 'Whiskey',
    alcoholPercentage: 40,
    volume: 700,
    countryOfOrigin: 'USA',
    ageRestricted: true
  },
  {
    id: '2',
    name: 'Absolut Vodka',
    price: 19.99,
    category: 'Vodka',
    alcoholPercentage: 40,
    volume: 1000,
    countryOfOrigin: 'Sweden',
    ageRestricted: true
  },
  {
    id: '3',
    name: 'Bacardí Carta Blanca',
    price: 15.50,
    category: 'Rum',
    alcoholPercentage: 37.5,
    volume: 700,
    countryOfOrigin: 'Puerto Rico',
    ageRestricted: true
  },
  // További elemek...
];