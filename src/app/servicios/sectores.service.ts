import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Sector } from '../clases/sector';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SectoresService {
  private sectores: Observable<Sector[]>;
  private sectorCollection: AngularFirestoreCollection<any>;
  public muestraAbm: boolean;

  constructor(private afs: AngularFirestore, private authService: AuthService) 
  {
    this.sectorCollection = this.afs.collection<any>('sectores');
    this.sectores = this.sectorCollection.snapshotChanges().pipe(
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

  public getSectores(): Observable<Sector[]>
  {
    return this.sectores;
  }

  public getSector(sector: string, sectores: Sector[]): Sector
  {
    let retorno: Sector = null;

    sectores.forEach((unSector) =>
    {
      if(unSector.sector == sector)
      {
        retorno = new Sector(unSector.sector, unSector.personal, unSector.log, unSector.productos, unSector.idCollection, unSector.uid);
      }
    });

    return retorno;
  }

  public getSectorPorId(idCollection: string): Observable<Sector> 
  {
    return this.sectorCollection.doc<any>(idCollection).valueChanges().pipe(
      take(1),
      map(sector => {
        sector.idCollection = idCollection;
        return sector
      })
    );
  }

  public addSector(sector: Sector): Promise<void | DocumentReference> 
  {
    return this.sectorCollection.add({
      sector: sector.sector
    })
    .then((doc) =>
    {
      this.SetData(doc);
    });
  }
 
  public updateSector(sector: Sector): Promise<void> 
  {
    return this.sectorCollection.doc(sector.idCollection).update(
      { sector: sector.sector, 
        personal: sector.personal == undefined || sector.personal == null ? null : sector.personal.map((obj)=> {return Object.assign({}, obj)}), 
        log: sector.log == undefined || sector.log == null ? null : sector.log.map((obj)=> {return Object.assign({}, obj)}), 
        productos: sector.productos == undefined || sector.productos == null ? null : sector.productos.map((obj)=> {return Object.assign({}, obj)}) 
      });
  }
 
  public deleteSector(idCollection: string): Promise<void> 
  {
    return this.sectorCollection.doc(idCollection).delete();
  }

  public SetData(sector: DocumentReference)
  {
    const sectorRef: AngularFirestoreDocument<any> = this.afs.doc(`sectores/${sector.id}`);
    const sectorData = {
      idCollection: sector.id,
      uid: this.authService.getUid()
    };
    return sectorRef.set(sectorData, {
      merge: true
    });
  }

  public getError(sector: Sector, sectores: Sector[]): string
  {
    let error: string = '';
    if(this.getSector(sector.sector, sectores) != null)
    {
      error = 'El sector ya se encuentra registrado';
    }

    return error;
  }
}
