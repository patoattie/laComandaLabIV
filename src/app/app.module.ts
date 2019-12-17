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

//primeNG
import {ToolbarModule} from 'primeng/toolbar';
import {MenuModule} from 'primeng/menu';
//import {TabMenuModule} from 'primeng/tabmenu';
import {TieredMenuModule} from 'primeng/tieredmenu';
import { InputTextModule } from "primeng/inputtext";
import {PasswordModule} from 'primeng/password';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {ListboxModule} from 'primeng/listbox';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { AuthService } from './servicios/auth.service';
import { ListadoSectoresComponent } from './componentes/listado-sectores/listado-sectores.component';
import { AbmSectorComponent } from './componentes/abm-sector/abm-sector.component';
import { ListadoPersonalComponent } from './componentes/listado-personal/listado-personal.component';

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    LoginComponent,
    RegistroComponent,
    PrincipalComponent,
    ListadoSectoresComponent,
    AbmSectorComponent,
    ListadoPersonalComponent
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
    //TabMenuModule,
    TieredMenuModule,
    InputTextModule,
    PasswordModule,
    ToastModule,
    ListboxModule,
    ButtonModule,
    TableModule,
    DialogModule,
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
