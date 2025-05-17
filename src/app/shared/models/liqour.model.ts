export interface Liqour {
    id: string;
    name: string;
    price: number;
    category: 'Whiskey' | 'Vodka' | 'Rum' | 'Gin' | 'Tequila'| 'Other'; // Alkoholtípusok
    alcoholPercentage: number;  // Százalékban
    volume: number;  // Milliliterben
    countryOfOrigin: string;
    ageRestricted: boolean;  // +18 év ellenőrzés
  }