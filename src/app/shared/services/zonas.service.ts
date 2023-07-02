import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Zonas } from 'shared/models/zonas';
@Injectable({
  providedIn: 'root',
})
export class ZonasService {
  // categoriesMap: { id: string; name: string } | {} = {};

  constructor(private db: AngularFirestore) {}

  getAll() {
    return this.db
      .collection('zonas', (catRef) => catRef.orderBy('name', 'asc'))
      .valueChanges({ idField: 'id' });
  }
  create(zonas: Zonas) {
    return this.db.collection('zonas').add(zonas);
  }

  get(zonasId): Observable<Zonas> {
    console.log('id zonas',zonasId);
    return this.db
      .collection('zonas')
      .doc(zonasId)
      .valueChanges() as Observable<Zonas>;
  }
  getA(zonasId) {
    console.log('id zonas',zonasId);
    return this.db
      .collection('zonas')
      .doc(zonasId);
  }
  update(zonas, id) {
    return this.db.collection('zonas').doc(id).set(zonas, { merge: true });
  }

  delete(id) {
    return this.db.collection('zonas').doc(id).delete();
  }
 /* getRole() {
    return this.db
      .collection('profile', (catRef) => catRef.orderBy('role', 'asc'))
      .valueChanges({ idField: 'id' });
  }*/
}
