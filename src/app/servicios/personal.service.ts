import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {Personal} from '../clases/personal';
import {AuthService} from './auth.service';
import { ETipoPersonal } from '../enums/etipo-personal.enum';

@Injectable({
  providedIn: 'root'
})
export class PersonalService 
{
  private personal: Observable<Personal[]>;
  private personalCollection: AngularFirestoreCollection<any>;
  public muestraAbm: boolean;

  constructor(private afs: AngularFirestore, private authService: AuthService)
  {
    this.personalCollection = this.afs.collection<any>('personal');
    this.personal = this.personalCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const uid = a.payload.doc.id;
          return { uid, ...data };
        });
      })
    );
    this.muestraAbm = false;
  }

  public getPersonal(): Observable<Personal[]>
  {
    return this.personal;
  }

  public getUsuario(uid: string): Personal
  {
    let retorno: Personal = JSON.parse(localStorage.getItem('usuario'));

    if(retorno == null || retorno.tipo == undefined || retorno.sector == undefined)
    {
      this.personal.forEach(arrPersonal =>
        {
          arrPersonal.forEach(unUsuario =>
            {
              if(unUsuario.uid == uid)
              {
                retorno = unUsuario;
                localStorage.setItem('usuario', JSON.stringify(retorno));
              }
            });
        });

      retorno = JSON.parse(localStorage.getItem('usuario'));
    }

    return retorno;
  }

  public getUsuarioMov(uid: string, personal: Personal[]): Personal
  {
    let retorno: Personal = null;

    personal.forEach((unUsuario) =>
    {
      if(unUsuario.uid == uid)
      {
        retorno = unUsuario;
      }
    });

    return retorno;
  }

  public getUsuarioPorId(uid: string): Observable<Personal> 
  {
    return this.personalCollection.doc<any>(uid).valueChanges().pipe(
      take(1),
      map(usuario => {
        usuario.uid = uid;
        return usuario
      })
    );
  }
  
  public updateUsuario(usuario: Personal): Promise<void> 
  {
    return this.personalCollection.doc(usuario.uid).update({ tipo: usuario.tipo, sector: usuario.sector, log: usuario.log.map((obj)=> {return Object.assign({}, obj)}), estado: usuario.estado });
  }
 
  public deleteUsuario(uid: string): Promise<void> 
  {
    return this.personalCollection.doc(uid).delete();
  }

  public SetData(usuario: DocumentReference): Promise<void>
  {
    const usuarioRef: AngularFirestoreDocument<any> = this.afs.doc(`personal/${usuario.id}`);
    const usuarioData = {
      uid: usuario.id,
      user: this.authService.getUserData()
    }
    return usuarioRef.set(usuarioData, {
      merge: true
    });
  }

  /*public SignOut(): void 
  {
    localStorage.removeItem('usuario');
  }*/

  /*public getPswAdmin():string
  {
    return 'admin1234';
  }

  public getMsjErrorAdmin(): string
  {
    return 'Clave de Administrador incorrecta';
  }*/

  public esAdmin(): boolean
  {
    return this.getUsuario(this.authService.getUid()).tipo == ETipoPersonal.Socio;
  }

  public getEmail(): string
  {
    return this.authService.getEmail();
  }

  public getTipo(): string
  {
    return this.getUsuario(this.authService.getUid()).tipo;
  }
}
