import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { PersonalService } from '../../servicios/personal.service';

import {MessageService} from 'primeng/api';
import { Log } from '../../clases/log';
import { LogsService } from '../../servicios/logs.service';
import { EOperacion } from '../../enums/eoperacion.enum';
import { SectoresService } from '../../servicios/sectores.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;
  private enEspera: boolean; //Muestra u oculta el spinner

  constructor(
    private miConstructor: FormBuilder, 
    public authService: AuthService, 
    private personalService: PersonalService,
    private logService: LogsService,
    private sectoresService: SectoresService,
    public messageService: MessageService
    ) 
    {
      this.formLogin = this.miConstructor.group(
      {
        usuario: ['', Validators.compose([Validators.email, Validators.required])],
        clave: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      });
    }

  ngOnInit() 
  {
    this.enEspera = false;
  }

  public getEnEspera(): boolean
  {
    return this.enEspera;
  }

  private mostrarMsjErrorDatos(): void
  {
    if(this.formLogin.controls['usuario'].invalid)
    {
      if(this.formLogin.controls['usuario'].hasError('required'))
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Tenés que ingresar un E-Mail para identificarte'});
      }
      else if(this.formLogin.controls['usuario'].hasError('email'))
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'El E-Mail que ingresaste no es válido'});
      }
      else
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Error al validar el Usuario'});
      }
    }

    if(this.formLogin.controls['clave'].invalid)
    {
      if(this.formLogin.controls['clave'].hasError('required'))
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Tenés que ingresar una Clave'});
      }
      else if(this.formLogin.controls['clave'].hasError('minlength'))
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'La Clave debe tener como mínimo 6 caracteres'});
      }
      else
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Error al validar la Clave'});
      }
    }
  }

  private mostrarMsjErrorAuth(): void
  {
    this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: this.authService.getError()});
  }

  public async login(): Promise<void>
  {
    let usuarioValido: boolean;
    this.enEspera = true; //Muestro el spinner

    if(this.formLogin.valid)
    {
      await this.authService.SignIn(this.formLogin.value.usuario, this.formLogin.value.clave);
      usuarioValido = this.authService.isLoggedIn();
      if(usuarioValido)
      {
        this.personalService.getUsuario(this.authService.getUid());

        let logNuevo: Log = new Log('', this.formLogin.value.usuario, this.logService.getFecha(), EOperacion.SistemaLogin);
        this.logService.addLog(logNuevo)
        .then(() =>
        {
          this.personalService.getUsuarioPorId(this.authService.getUid())
          .toPromise()
          .then((unUsuario) =>
          {
            let arrLogsUsuario: Log[] = unUsuario.log;
            arrLogsUsuario.push(logNuevo);
            unUsuario.log = arrLogsUsuario;
            this.personalService.updateUsuario(unUsuario);

            if(unUsuario.sector != "")
            {
              this.sectoresService.getSectorPorId(unUsuario.sector)
              .toPromise()
              .then((unSector) =>
              {
                let arrLogsSector: Log[] = unSector.log;
                arrLogsSector.push(logNuevo);
                unSector.log = arrLogsSector;
                this.sectoresService.updateSector(unSector);
              });
            }
          });
        });
      }
      else
      {
        this.mostrarMsjErrorAuth();
      }
    }
    else
    {
      this.mostrarMsjErrorDatos();
    }

    this.enEspera = false; //Oculto el spinner
  }

  public completarUsuario(): void
  {
    this.formLogin.setValue({usuario: 'pepe@pepe.com', clave: '123456'});
  }

  public completarAdmin(): void
  {
    this.formLogin.setValue({usuario: 'admin@admin.com', clave: '111111'});
  }
}