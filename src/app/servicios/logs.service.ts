import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Log } from '../clases/log';
import {AuthService} from './auth.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  private logs: Observable<Log[]>;
  private logCollection: AngularFirestoreCollection<any>;
  public muestraAbm: boolean;

  constructor(private afs: AngularFirestore, private authService: AuthService) 
  {
    this.logCollection = this.afs.collection<any>('logs');
    this.logs = this.logCollection.snapshotChanges().pipe(
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

  public getLogs(): Observable<Log[]>
  {
    return this.logs;
  }

  public getLog(id: string, logs: Log[]): Log
  {
    let retorno: Log = null;

    logs.forEach((unLog) =>
    {
      if(unLog.idCollection == id)
      {
        retorno = new Log(unLog.sector, unLog.usuario, unLog.fecha, unLog.operacion, unLog.idCollection, unLog.uid);
      }
    });

    return retorno;
  }

  public getLogPorId(idCollection: string): Observable<Log> 
  {
    return this.logCollection.doc<any>(idCollection).valueChanges().pipe(
      take(1),
      map(log => {
        log.idCollection = idCollection;
        return log
      })
    );
  }

  public addLog(log: Log): Promise<void | DocumentReference> 
  {
    return this.logCollection.add({
      sector: log.sector,
      operacion: log.operacion
    })
    .then((doc) =>
    {
      this.SetData(doc, log);
    });
  }
 
  public updateLog(log: Log): Promise<void> 
  {
    return this.logCollection.doc(log.idCollection).update({ sector: log.sector, usuario: log.usuario, operacion: log.operacion });
  }
 
  public deleteLog(idCollection: string): Promise<void> 
  {
    return this.logCollection.doc(idCollection).delete();
  }

  public SetData(log: DocumentReference, unLog: Log)
  {
    const logRef: AngularFirestoreDocument<any> = this.afs.doc(`logs/${log.id}`);
    const logData = {
      idCollection: log.id,
      uid: this.authService.getUid(),
      usuario: this.authService.getEmail(),
      fecha: this.getFecha()
    };

    //Le cargo el id del documento y del usuario para poder guardar en la colección personal
    unLog.idCollection = logData.idCollection;
    unLog.uid = logData.uid;

    return logRef.set(logData, {
      merge: true
    });
  }

  public getFecha(): string
  {
    return new DatePipe('en-US').transform(Date.now(), 'yyyyMMddHHmmssSSS', '-0300');
  }
}
