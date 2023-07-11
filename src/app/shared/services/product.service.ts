import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/firestore';
import { Product } from 'shared/models/product';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ProductTableService } from 'admin/services/product-table.service';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productSubject: BehaviorSubject<Product> = new BehaviorSubject<Product>(null);
  constructor(
    private db: AngularFirestore,
    private productTableService: ProductTableService
  ) {}

  create(product: Product) {
    return this.db.collection('products').add(product);
  }

  getAll() {
    /* value changes takes an optional parameter that will return the UID from firestore */

    return this.db
      .collection('products')
      .valueChanges({ idField: 'id' }) as Observable<Product[]>;
  }

  get(productId): Observable<Product> {

    return this.db
      .collection('products')
      .doc(productId)
      .valueChanges() as Observable<Product>;
  }

  update(product, id) {
    return this.db.collection('products').doc(id).set(product, { merge: true });
  }

  delete(id) {
    return this.db.collection('products').doc(id).delete();
  }
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.db.collection<Product>('products', (ref) =>
      ref.where('category', '==', category)
    ).valueChanges();
  }
  setPrecioZona(product: Product) {
    this.productSubject.next(product);
  }

}
