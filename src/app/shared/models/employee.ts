export interface Employee {
  uid?: string;
  name: string;
  email:string;
  password:string;
  isEmployee?:boolean;
  isAdmin?: boolean;
}
