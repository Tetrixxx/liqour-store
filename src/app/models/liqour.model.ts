export interface Liqour {
    id: string;
    name: string;
    price: number;
    category: 'Whiskey' | 'Vodka' | 'Rum' | 'Gin' | 'Tequila'; // Alkoholtípusok
    alcoholPercentage: number;  // Százalékban
    volume: number;  // Milliliterben
    countryOfOrigin: string;
    stock: number;
    ageRestricted: boolean;  // +18 év ellenőrzés
  }