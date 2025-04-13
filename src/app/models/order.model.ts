import { Liqour } from './liqour.model'; // Adjust the path as needed

export interface Order {
    id: string;
    userId: string;
    items: Liqour[];
    total: number;
    requiresAgeVerification: boolean; // Rendeléskor ellenőrizni kell-e a kort
  }