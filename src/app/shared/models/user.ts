export interface User {
  id?: string; // Firebase Auth UID-vel lesz feltöltve
  email: string;
  displayName?: string; // Firebase Auth-ból
  address?: string;
  phoneNumber?: string;
  orders?: string[]; // Order ID-k referenciája
}