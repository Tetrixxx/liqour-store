export interface User {
    id: string;
    email: string;
    password: string;
    birthDate?: Date;  // Születési dátum életkor ellenőrzéshez
  }