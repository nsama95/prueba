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
  usuario:AppUser;
  constructor(
    private db: AngularFirestore, private fbAuth: AngularFireAuth
   
  ) {}

  async create(employee: Employee,idUser) {
   
   try {
     await this.getUserAdmin(idUser).subscribe((res) => {
      this.usuario=res
     });
      const {user}=  await this.fbAuth.createUserWithEmailAndPassword(
        employee.email,
        employee.password
        );
       
          
       this.updateUserData(user,employee);
         
        employee.uid=user.uid;
       await this.db.collection('employees').add(employee);
       this.fbAuth.signOut();
       this.fbAuth.signInWithEmailAndPassword(this.usuario.email,this.usuario.password);
          
        return true;
      } catch (error) {
        console.log('ERROR'+error);
        //window.alert(this.firebaseError.codeError(error.code));
      }

    
  }

  getAll(): Observable<Employee[]> {
    return this.db
      .collection('employees')
      .valueChanges({ idField: 'uid' }) as Observable<Employee[]>;
  }

  get(employeeId): Observable<Employee> {
    return this.db
      .collection('employees')
      .doc(employeeId)
      .valueChanges() as Observable<Employee>;
  }

  getUserAdmin(d): Observable<AppUser> {
    return this.db
      .collection('users')
      .doc(d)
      .valueChanges() as Observable<AppUser>;
  }
  update(employee, id,idUser) {
    return this.db.collection('employees').doc(id).set(employee, { merge: true });
  }

  delete(id) {
    this.db.collection('users').doc(id).delete();
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
      isEmployee:user.isEmployee,

      },
      { merge: true }
    )
    .then(() => {
      console.log('correcto');
    })
    .catch(() => {
      console.error('error');
    });
  }
  resetPassword(email: string) {
    return this.fbAuth.sendPasswordResetEmail(email)
      .then(() => {
        console.log('Correo de restablecimiento de contraseña enviado');
        // Aquí puedes realizar cualquier acción adicional después de enviar el correo de restablecimiento
      })
      .catch(error => {
        console.log('Error al enviar el correo de restablecimiento de contraseña:', error);
      });
  }
}