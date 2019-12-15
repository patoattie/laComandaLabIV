import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {AuthService} from './auth.service';
import { Mesa } from '../clases/mesa';
import { EEstadoMesa } from "../enums/eestado-mesa.enum";

@Injectable({
  providedIn: 'root'
})
export class MesasService {
  private mesas: Observable<Mesa[]>;
  private mesaCollection: AngularFirestoreCollection<any>;
  public muestraAbm: boolean;

  constructor(private afs: AngularFirestore, private authService: AuthService) 
  {
    this.mesaCollection = this.afs.collection<any>('mesas');
    this.mesas = this.mesaCollection.snapshotChanges().pipe(
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

  public getMesas(): Observable<Mesa[]>
  {
    return this.mesas;
  }

  public getMesa(mesa: string, mesas: Mesa[]): Mesa
  {
    let retorno: Mesa = null;

    mesas.forEach((unaMesa) =>
    {
      if(unaMesa.mesa == mesa)
      {
        retorno = new Mesa(unaMesa.mesa, unaMesa.comandas, unaMesa.estado, unaMesa.idCollection, unaMesa.uid);
      }
    });

    return retorno;
  }

  public getMesaPorId(idCollection: string): Observable<Mesa> 
  {
    return this.mesaCollection.doc<any>(idCollection).valueChanges().pipe(
      take(1),
      map(mesa => {
        mesa.idCollection = idCollection;
        return mesa
      })
    );
  }

  public addMesa(mesa: Mesa): Promise<void | DocumentReference> 
  {
    return this.mesaCollection.add({
      mesa: mesa.mesa
    })
    .then((doc) =>
    {
      this.SetData(doc);
    });
  }
 
  public updateMesa(mesa: Mesa): Promise<void> 
  {
    return this.mesaCollection.doc(mesa.idCollection).update({ mesa: mesa.mesa, comandas: mesa.comandas.map((obj)=> {return Object.assign({}, obj)}), estado: mesa.estado });
  }
 
  public deleteMesa(idCollection: string): Promise<void> 
  {
    return this.mesaCollection.doc(idCollection).delete();
  }

  public SetData(mesa: DocumentReference)
  {
    const mesaRef: AngularFirestoreDocument<any> = this.afs.doc(`mesas/${mesa.id}`);
    const mesaData = {
      idCollection: mesa.id,
      uid: this.authService.getUid(),
      estado: EEstadoMesa.Cerrada
    };
    return mesaRef.set(mesaData, {
      merge: true
    });
  }

  public getError(mesa: Mesa, mesas: Mesa[]): string
  {
    let error: string = '';
    if(this.getMesa(mesa.mesa, mesas) != null)
    {
      error = 'La mesa ya se encuentra registrada';
    }

    return error;
  }
}
