import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { AngularFireStorage } from "@angular/fire/storage";
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Producto } from '../clases/producto';
import {AuthService} from './auth.service';

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private productos: Observable<Producto[]>;
  private productoCollection: AngularFirestoreCollection<any>;
  public muestraAbm: boolean;

  constructor(private afs: AngularFirestore, private authService: AuthService, public storage: AngularFireStorage) 
  {
    this.productoCollection = this.afs.collection<any>('productos');
    this.productos = this.productoCollection.snapshotChanges().pipe(
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

  public getProductos(): Observable<Producto[]>
  {
    return this.productos;
  }

  public getProducto(producto: string, productos: Producto[]): Producto
  {
    let retorno: Producto = null;

    productos.forEach((unProducto) =>
    {
      if(unProducto.producto == producto)
      {
        retorno = new Producto(unProducto.producto, unProducto.photoURL, unProducto.precio, unProducto.sector, unProducto.comandas, unProducto.idCollection, unProducto.uid);
      }
    });

    return retorno;
  }

  public getProductoPorId(idCollection: string): Observable<Producto> 
  {
    return this.productoCollection.doc<any>(idCollection).valueChanges().pipe(
      take(1),
      map(producto => {
        producto.idCollection = idCollection;
        return producto
      })
    );
  }

  public addProducto(producto: Producto, archivoFoto?: any): Promise<void | DocumentReference> 
  {
    return this.productoCollection.add({
      producto: producto.producto,
      precio: producto.precio,
      sector: producto.sector
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
            'producto': producto.producto,
            'id': doc.id
          }
        };

        let uploadTask = this.storage.upload('productos/' + this.getFecha() + archivoFoto.name, archivoFoto, metadata);

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
 
  public updateProducto(producto: Producto): Promise<void> 
  {
    return this.productoCollection.doc(producto.idCollection).update({ producto: producto.producto, precio: producto.precio, sector: producto.sector, comandas: producto.comandas.map((obj)=> {return Object.assign({}, obj)}) });
  }
 
  public deleteProducto(idCollection: string): Promise<void> 
  {
    return this.productoCollection.doc(idCollection).delete();
  }

  public SetData(producto: DocumentReference)
  {
    const productoRef: AngularFirestoreDocument<any> = this.afs.doc(`productos/${producto.id}`);
    const productoData = {
      idCollection: producto.id,
      uid: this.authService.getUid()
    };
    return productoRef.set(productoData, {
      merge: true
    });
  }

  public SetURL(producto: DocumentReference, fotoURL: string)
  {
    const productoRef: AngularFirestoreDocument<any> = this.afs.doc(`productos/${producto.id}`);
    const productoData = {
      photoURL: fotoURL
    };
    return productoRef.set(productoData, {
      merge: true
    });
  }

  public getFecha(): string
  {
    return new DatePipe('en-US').transform(Date.now(), 'yyyyMMddHHmmssSSS', '-0300');
  }

  public getError(producto: Producto, productos: Producto[]): string
  {
    let error: string = '';
    if(this.getProducto(producto.producto, productos) != null)
    {
      error = 'El producto ya se encuentra registrado';
    }

    return error;
  }
}
