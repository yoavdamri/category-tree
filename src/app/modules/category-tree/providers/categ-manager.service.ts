import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DocumentReference } from '@angular/fire/firestore/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategManagerService {
  constructor(private fireStore: AngularFirestore) {}

  getCategs = (): Observable<any> => {
    return this.fireStore.collection('categs').snapshotChanges();
  }
  getCategsByParentId = (parentId: string): Observable<any[]> => {
    return this.fireStore
               .collection('categs',
                 ref => ref.where('parentId', '==', parentId))
               .snapshotChanges();
  }
  addCateg = (categ: ICategory): Promise<DocumentReference> => {
    return this.fireStore.collection('categs').add(categ);
  }
  updateCateg = (categ: ICategory): Promise<void> => {
    return this.fireStore.doc('categs/' + categ.id).update(categ);
  }
  deleteCateg = (categId: string): Promise<any[]> => {
    const allDeletes: Promise<any>[] = [];
    allDeletes.push(this.fireStore.doc('categs/' + categId).delete());
    this.getCategsByParentId(categId).subscribe(subCategs => {
      subCategs.forEach(sCtag => {
        allDeletes.push(this.deleteCateg(sCtag.payload.doc.id));
      });
    });
    return Promise.all(allDeletes);
  }
}

export interface ICategory {
  id: string;
  name: string;
  showOrder: number;
  parentId: string;
  childrenNo: number;
}
