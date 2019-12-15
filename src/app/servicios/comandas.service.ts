import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { AngularFireStorage } from "@angular/fire/storage";
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Comanda } from '../clases/comanda';
import {AuthService} from './auth.service';

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ComandasService {
  private comandas: Observable<Comanda[]>;
  private comandaCollection: AngularFirestoreCollection<any>;
  public muestraAbm: boolean;

  constructor(private afs: AngularFirestore, private authService: AuthService, public storage: AngularFireStorage) 
  {
    this.comandaCollection = this.afs.collection<any>('comandas');
    this.comandas = this.comandaCollection.snapshotChanges().pipe(
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

  public getComandas(): Observable<Comanda[]>
  {
    return this.comandas;
  }

  public getComanda(id: string, comandas: Comanda[]): Comanda
  {
    let retorno: Comanda = null;

    comandas.forEach((unaComanda) =>
    {
      if(unaComanda.idCollection == id)
      {
        retorno = new Comanda(unaComanda.cliente, unaComanda.photoURL, unaComanda.detalle, unaComanda.idMesa, unaComanda.encuesta, unaComanda.fecha, unaComanda.mozo, unaComanda.idCollection, unaComanda.uid);
      }
    });

    return retorno;
  }

  public getComandaPorId(idCollection: string): Observable<Comanda> 
  {
    return this.comandaCollection.doc<any>(idCollection).valueChanges().pipe(
      take(1),
      map(comanda => {
        comanda.idCollection = idCollection;
        return comanda
      })
    );
  }

  public addComanda(comanda: Comanda, archivoFoto?: any): Promise<void | DocumentReference> 
  {
    return this.comandaCollection.add({
      cliente: comanda.cliente,
      idMesa: comanda.idMesa,
      mozo: comanda.mozo
    })
    .then((doc) =>
    {
      if(archivoFoto != undefined)
      {
        let metadata = 
        {
          contentType: 'image/png',
          customMetadata: 
          {
            'usuario': this.authService.getEmail(),
            'uid': this.authService.getUid(),
            'id': doc.id
          }
        };

        let uploadTask = this.storage.upload('comandas/' + this.getFecha() + archivoFoto.name, archivoFoto, metadata);

        uploadTask.task.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          (snapshot) =>
          {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
          },
          (E) => {},
          () =>
          {
            uploadTask.task.snapshot.ref.getDownloadURL()
            .then((downloadURL) =>
            {
              console.log('File available at', downloadURL);
              this.SetURL(doc, downloadURL);
            });
          });
      }

      this.SetData(doc);
    });
  }
 
  public updateComanda(comanda: Comanda): Promise<void> 
  {
    return this.comandaCollection.doc(comanda.idCollection).update({ cliente: comanda.cliente, detalle: comanda.detalle.map((obj)=> {return Object.assign({}, obj)}), idMesa: comanda.idMesa, encuesta: comanda.encuesta, mozo: comanda.mozo });
  }
 
  public deleteComanda(idCollection: string): Promise<void> 
  {
    return this.comandaCollection.doc(idCollection).delete();
  }

  public SetData(comanda: DocumentReference)
  {
    const comandaRef: AngularFirestoreDocument<any> = this.afs.doc(`comandas/${comanda.id}`);
    const comandaData = {
      idCollection: comanda.id,
      uid: this.authService.getUid(),
      fecha: this.getFecha()
    };
    return comandaRef.set(comandaData, {
      merge: true
    });
  }

  public SetURL(comanda: DocumentReference, fotoURL: string)
  {
    const comandaRef: AngularFirestoreDocument<any> = this.afs.doc(`comandas/${comanda.id}`);
    const comandaData = {
      photoURL: fotoURL
    };
    return comandaRef.set(comandaData, {
      merge: true
    });
  }

  public getFecha(): string
  {
    return new DatePipe('en-US').transform(Date.now(), 'yyyyMMddHHmmssSSS', '-0300');
  }
}
