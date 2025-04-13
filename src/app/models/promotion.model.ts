export interface Promotion {
    id: string;
    code: string;
    discount: number;  // %-ban
    validUntil: Date;
  }