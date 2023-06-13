import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/firestore';
import { Employee } from 'shared/models/employee';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ProductTableService } from 'admin/services/product-table.service';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(
    private db: AngularFirestore,
   
  ) {}

  create(product: Employee) {
    return this.db.collection('employee').add(product);
  }

  getAll(): Observable<Employee[]> {
    return this.db
      .collection('employee')
      .valueChanges({ idField: 'uid' }) as Observable<Employee[]>;
  }

  get(productId): Observable<Employee> {
    return this.db
      .collection('employee')
      .doc(productId)
      .valueChanges() as Observable<Employee>;
  }

  update(product, id) {
    return this.db.collection('employee').doc(id).set(product, { merge: true });
  }

  delete(id) {
    return this.db.collection('employee').doc(id).delete();
  }
}
