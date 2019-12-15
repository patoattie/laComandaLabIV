import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { DetalleComanda } from '../clases/detalle-comanda';
import { EEstadoPedido } from "../enums/eestado-pedido.enum";
import {AuthService} from './auth.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DetallesComandaService {
  private detallesComanda: Observable<DetalleComanda[]>;
  private detalleCollection: AngularFirestoreCollection<any>;
  public muestraAbm: boolean;

  constructor(private afs: AngularFirestore, private authService: AuthService) 
  {
    this.detalleCollection = this.afs.collection<any>('detallesComanda');
    this.detallesComanda = this.detalleCollection.snapshotChanges().pipe(
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

  public getDetalles(): Observable<DetalleComanda[]>
  {
    return this.detallesComanda;
  }

  public getDetalleComanda(id: string, detallesComanda: DetalleComanda[]): DetalleComanda
  {
    let retorno: DetalleComanda = null;

    detallesComanda.forEach((unDetalleComanda) =>
    {
      if(unDetalleComanda.idCollection == id)
      {
        retorno = new DetalleComanda(unDetalleComanda.producto, unDetalleComanda.cantidad, unDetalleComanda.importe, unDetalleComanda.estado, unDetalleComanda.empleado, unDetalleComanda.tiempoEstimado, unDetalleComanda.fechaInicio, unDetalleComanda.tiempoReal, unDetalleComanda.idComanda, unDetalleComanda.idCollection, unDetalleComanda.uid);
      }
    });

    return retorno;
  }

  public getDetalleComandaPorId(idCollection: string): Observable<DetalleComanda> 
  {
    return this.detalleCollection.doc<any>(idCollection).valueChanges().pipe(
      take(1),
      map(detalle => {
        detalle.idCollection = idCollection;
        return detalle
      })
    );
  }

  public addDetalleComanda(detalle: DetalleComanda): Promise<void | DocumentReference> 
  {
    return this.detalleCollection.add({
      producto: detalle.producto,
      cantidad: detalle.cantidad,
      importe: detalle.producto.precio * detalle.cantidad,
      tiempoEstimado: detalle.tiempoEstimado,
      idComanda: detalle.idComanda
    })
    .then((doc) =>
    {
      this.SetData(doc);
    });
  }
 
  public updateDetalleComanda(detalle: DetalleComanda): Promise<void> 
  {
    return this.detalleCollection.doc(detalle.idCollection).update({ producto: detalle.producto, cantidad: detalle.cantidad, importe: detalle.importe, estado: detalle.estado, tiempoEstimado: detalle.tiempoEstimado, tiempoReal: detalle.tiempoReal });
  }
 
  public deleteDetalleComanda(idCollection: string): Promise<void> 
  {
    return this.detalleCollection.doc(idCollection).delete();
  }

  public SetData(detalle: DocumentReference)
  {
    const detalleRef: AngularFirestoreDocument<any> = this.afs.doc(`detallesComanda/${detalle.id}`);
    const detalleData = {
      idCollection: detalle.id,
      uid: this.authService.getUid(),
      empleado: this.authService.getEmail(),
      fechaInicio: this.getFecha(),
      estado: EEstadoPedido.Pendiente
    };
    return detalleRef.set(detalleData, {
      merge: true
    });
  }

  public getFecha(): string
  {
    return new DatePipe('en-US').transform(Date.now(), 'yyyyMMddHHmmssSSS', '-0300');
  }
}
