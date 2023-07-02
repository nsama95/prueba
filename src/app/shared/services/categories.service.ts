import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Categories } from 'shared/models/categories';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  // categoriesMap: { id: string; name: string } | {} = {};

  constructor(private db: AngularFirestore) {}

  getAll() {
    return this.db
      .collection('categories', (catRef) => catRef.orderBy('name', 'asc'))
      .valueChanges({ idField: 'id' });
  }
  create(product: Categories) {
    return this.db.collection('categories').add(product);
  }

  get(employeeId): Observable<Categories> {
    return this.db
      .collection('categories')
      .doc(employeeId)
      .valueChanges() as Observable<Categories>;
  }
  update(employee, id) {
    return this.db.collection('categories').doc(id).set(employee, { merge: true });
  }

  delete(id) {
    return this.db.collection('categories').doc(id).delete();
  }
  getRole() {
    return this.db
      .collection('profile', (catRef) => catRef.orderBy('role', 'asc'))
      .valueChanges({ idField: 'id' });
  }
}
