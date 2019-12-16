import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FirestoreSettingsToken, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';

//primeNG
import {ToolbarModule} from 'primeng/toolbar';
import {MenuModule} from 'primeng/menu';
import {TabMenuModule} from 'primeng/tabmenu';
import {TieredMenuModule} from 'primeng/tieredmenu';
import { InputTextModule } from "primeng/inputtext";
import {PasswordModule} from 'primeng/password';
import {ToastModule} from 'primeng/toast';
import {ListboxModule} from 'primeng/listbox';

import { AuthService } from './servicios/auth.service';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    ToolbarModule,
    MenuModule,
    TabMenuModule,
    TieredMenuModule,
    InputTextModule,
    PasswordModule,
    ToastModule,
    ListboxModule,
    AppRoutingModule
  ],
  providers: [
    FormBuilder,
    AuthService,
    DatePipe,
    MessageService,
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }