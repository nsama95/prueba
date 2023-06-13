export interface AppUser {
  uid: string;
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  isEmploye?:boolean;
}
