import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Encuesta } from '../clases/encuesta';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EncuestasService {
  private encuestas: Observable<Encuesta[]>;
  private encuestaCollection: AngularFirestoreCollection<any>;
  public muestraAbm: boolean;

  constructor(private afs: AngularFirestore, private authService: AuthService) 
  {
    this.encuestaCollection = this.afs.collection<any>('encuestas');
    this.encuestas = this.encuestaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const idCollection = a.payload.doc.id;
          return { idCollection, ...data };
        });
      })
    );
    this.muestraAbm = false;
  }

  public getEncuestas(): Observable<Encuesta[]>
  {
    return this.encuestas;
  }

  public getEncuesta(id: string, encuestas: Encuesta[]): Encuesta
  {
    let retorno: Encuesta = null;

    encuestas.forEach((unaEncuesta) =>
    {
      if(unaEncuesta.idCollection == id)
      {
        retorno = new Encuesta(unaEncuesta.puntosMesa, unaEncuesta.puntosRestaurant, unaEncuesta.puntosMozo, unaEncuesta.puntosCocinero, unaEncuesta.idComanda, unaEncuesta.observaciones, unaEncuesta.idCollection);
      }
    });

    return retorno;
  }

  public getEncuestaPorId(idCollection: string): Observable<Encuesta> 
  {
    return this.encuestaCollection.doc<any>(idCollection).valueChanges().pipe(
      take(1),
      map(encuesta => {
        encuesta.idCollection = idCollection;
        return encuesta
      })
    );
  }

  public addEncuesta(encuesta: Encuesta): Promise<void | DocumentReference> 
  {
    return this.encuestaCollection.add({
      puntosMesa: encuesta.puntosMesa,
      puntosRestaurant: encuesta.puntosRestaurant,
      puntosMozo: encuesta.puntosMozo,
      puntosCocinero: encuesta.puntosCocinero,
      idComanda: encuesta.idComanda,
      observaciones: encuesta.observaciones
    })
    .then((doc) =>
    {
      this.SetData(doc);
    });
  }
 
  public updateEncuesta(encuesta: Encuesta): Promise<void> 
  {
    return this.encuestaCollection.doc(encuesta.idCollection).update({ puntosMesa: encuesta.puntosMesa, puntosRestaurant: encuesta.puntosRestaurant, puntosMozo: encuesta.puntosMozo, puntosCocinero: encuesta.puntosCocinero, observaciones: encuesta.observaciones });
  }
 
  public deleteEncuesta(idCollection: string): Promise<void> 
  {
    return this.encuestaCollection.doc(idCollection).delete();
  }

  public SetData(encuesta: DocumentReference)
  {
    const encuestaRef: AngularFirestoreDocument<any> = this.afs.doc(`encuestas/${encuesta.id}`);
    const encuestaData = {
      idCollection: encuesta.id
    };
    return encuestaRef.set(encuestaData, {
      merge: true
    });
  }
}
