import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/firestore';
import { Employee } from 'shared/models/employee';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ProductTableService } from 'admin/services/product-table.service';
import { firestore } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AppUser } from 'shared/models/app-user';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(
    private db: AngularFirestore, private fbAuth: AngularFireAuth
   
  ) {}

  async create(employee: Employee) {

    try {
      const {user}=  await this.fbAuth.createUserWithEmailAndPassword(
        employee.email,
        employee.password
        );
        await this.updateUserData(user,employee);
        return this.db.collection('employees').add(employee);
      } catch (error) {
        console.log('ERROR'+error);
        //window.alert(this.firebaseError.codeError(error.code));
      }

    
  }

  getAll(): Observable<Employee[]> {
    return this.db
      .collection('employees')
      .valueChanges({ idField: 'id' }) as Observable<Employee[]>;
  }

  get(employeeId): Observable<Employee> {
    return this.db
      .collection('employees')
      .doc(employeeId)
      .valueChanges() as Observable<Employee>;
  }

  update(employee, id) {
    return this.db.collection('employees').doc(id).set(employee, { merge: true });
  }

  delete(id) {
    return this.db.collection('employees').doc(id).delete();
  }
  
  private updateUserData(userCredencial,user: Employee) {

    return this.db
    .collection('users')
    .doc(userCredencial.uid)
    .set(
      {
        uid: userCredencial.uid,
      email: user.email,
      name: user.name,
      password: user.password,
     // photoURL: user.photoURL,
      isAdmin: user.isAdmin,
      isEmployee:user.isEmploye,

      },
      { merge: true }
    )
    .then(() => {
      console.log('user has been successfully saved to the database.');
    })
    .catch(() => {
      console.error('an error has occurred');
    });
  }
}
