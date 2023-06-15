import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Tutorial } from '../models/tutorial.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  private dbPath = '/tutorials';

  tutorialsRef: AngularFirestoreCollection<Tutorial>;
  // httpClient: any;

  constructor(private db: AngularFirestore, private httpClient: HttpClient) {
    this.tutorialsRef = db.collection(this.dbPath);
    // this.httpClient = httpClient;
  }

  getAll(): AngularFirestoreCollection<Tutorial> {
    return this.tutorialsRef;
  }

  create(tutorial: Tutorial): any {
    return this.tutorialsRef.add({ ...tutorial });
  }

  update(id: string, data: any): Promise<void> {
    return this.tutorialsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.tutorialsRef.doc(id).delete();
  }

  buscarCep(CEP: string): Observable<any> {
  return this.httpClient.get(`https://viacep.com.br/ws/${CEP}/json/`)
  }
}