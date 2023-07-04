export interface Employee {
  id?: string;
  name: string;
  email:string;
  password:string;
  isEmployee?:boolean;
  isAdmin?: boolean;
}
