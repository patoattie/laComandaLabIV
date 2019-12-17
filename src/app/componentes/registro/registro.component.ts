import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
//import { Router, ActivatedRoute, ParamMap } from '@angular/router';
//para poder hacer las validaciones
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { Location } from '@angular/common';
import { PersonalService } from '../../servicios/personal.service';
import { Personal } from '../../clases/personal';
import { ETipoPersonal } from '../../enums/etipo-personal.enum';
import { SectoresService } from "../../servicios/sectores.service";
import { Sector } from "../../clases/sector";
import { LogsService } from '../../servicios/logs.service';
import { Log } from '../../clases/log';

import {SelectItem} from 'primeng/api';
import {MessageService} from 'primeng/api';
import { EEstadoPersonal } from '../../enums/eestado-personal.enum';
import { EOperacion } from '../../enums/eoperacion.enum';

//import * as $ from "jquery";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  public formRegistro: FormGroup;
  private enEspera: boolean; //Muestra u oculta el spinner
  //public sectores: SelectItem[];
  public perfiles: SelectItem[];
  @Input() sectores: Sector[];
  @Input() usuario: Personal;
  //private usuarios: Personal[];
  @Input() usuarios: Personal[];
  public listaSectores: any[] = [];

  constructor(
    private miConstructor: FormBuilder, 
    public authService: AuthService, 
    private location: Location,
    private cd: ChangeDetectorRef,
    public personalService: PersonalService,
    public sectoresService: SectoresService,
    public logService: LogsService,
    public messageService: MessageService
    )
  {
    this.formRegistro = this.miConstructor.group(
    {
      usuario: ['', Validators.compose([Validators.email, Validators.required])],
      clave: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmaClave: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      sector: ['', Validators.compose([])],
      perfil: ['', Validators.compose([Validators.required])],
      imagen: ['', Validators.compose([])],
      habilitaSocio: ['', Validators.compose([])]
    });

    this.perfiles = [
      {label: ETipoPersonal.Bartender, value: ETipoPersonal.Bartender},
      {label: ETipoPersonal.Cervecero, value: ETipoPersonal.Cervecero},
      {label: ETipoPersonal.Cocinero, value: ETipoPersonal.Cocinero},
      {label: ETipoPersonal.Mozo, value: ETipoPersonal.Mozo},
      {label: ETipoPersonal.Socio, value: ETipoPersonal.Socio}
    ];
  }

  onFileChange(event) 
  {
    const reader = new FileReader();
 
    if(event.target.files && event.target.files.length) 
    {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
  
      reader.onload = () => 
      {
        this.formRegistro.patchValue(
        {
          file: reader.result
        });
      
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  ngOnInit() 
  {
    this.enEspera = false;

    if(this.usuario != null)
    {
      this.formRegistro.setValue({
        usuario: this.usuario.email,
        clave: '', 
        confirmaClave: '', 
        sector: this.usuario.sector,
        perfil: this.usuario.tipo,
        imagen: '',
        habilitaSocio: ''
      });
    }
    else
    {
      this.formRegistro.setValue({usuario: '', clave: '', confirmaClave: '', sector: '', perfil: '', imagen: '', habilitaSocio: ''});
    }

    if(this.sectores != undefined)
    {
      this.sectores.forEach((unSector) =>
      {
        this.listaSectores.push({label: unSector.sector, value: unSector.sector});
      });
    }

    //this.personalService.getUsuarios()
    //.subscribe(usuarios => this.usuarios = usuarios);
  }

  private mostrarMsjErrorDatos(): void
  {
    if(this.formRegistro.controls['usuario'].invalid)
    {
      if(this.formRegistro.controls['usuario'].hasError('required'))
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Tenés que ingresar un E-Mail para identificarte'});
      }
      else if(this.formRegistro.controls['usuario'].hasError('email'))
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'El E-Mail que ingresaste no es válido'});
      }
      else
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Error al validar el Usuario'});
      }
    }

    if(this.formRegistro.controls['clave'].invalid)
    {
      if(this.formRegistro.controls['clave'].hasError('required'))
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Tenés que ingresar una Clave'});
      }
      else if(this.formRegistro.controls['clave'].hasError('minlength'))
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'La Clave debe tener como mínimo 6 caracteres'});
      }
      else
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Error al validar la Clave'});
      }
    }

    /*if(this.formRegistro.controls['sector'].invalid)
    {
      this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Tenés que ingresar una Sector'});
    }*/
    
    if(this.formRegistro.controls['perfil'].invalid)
    {
      this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Tenés que ingresar un Perfil'});
    }
  }

  private mostrarMsjErrorClave(): void
  {
    this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'La confirmación de la clave no coincide con la clave ingresada'});
  }

  private mostrarMsjErrorAuth(): void
  {
    this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: this.authService.getError()});
  }

  private mostrarMsjErrorSocio(): void
  {
    this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: this.personalService.getMsjErrorSocio()});
  }

  private mostrarMsjOk(): void
  {
    this.messageService.add({key: 'msjDatos', severity: 'success', summary: 'Actualización Exitosa', detail: 'Se registró correctamente el usuario'});
  }

  public getEnEspera(): boolean
  {
    return this.enEspera;
  }

  public eligeSocio(): boolean
  {
    return this.formRegistro.value.perfil == ETipoPersonal.Socio;
  }

  public async registrar(): Promise<void>
  {
    let usuarioValido: boolean;
    this.enEspera = true; //Muestro el spinner

    if(this.formRegistro.valid)
    {
      if(this.formRegistro.value.clave === this.formRegistro.value.confirmaClave)
      {
        if(this.formRegistro.value.perfil == ETipoPersonal.Socio && this.formRegistro.value.habilitaSocio != this.personalService.getPswSocio())
        {
          this.mostrarMsjErrorSocio();
        }
        else
        {
          let file = (<HTMLInputElement>document.getElementById("img-file")).files[0];

          await this.authService.SignUp(this.formRegistro.value.usuario, this.formRegistro.value.clave, null, file);

          usuarioValido = this.authService.isLoggedIn();
          if(usuarioValido)
          {
            let logNuevo: Log = new Log('', this.formRegistro.value.usuario, this.logService.getFecha(), EOperacion.PersonalAlta);
            this.logService.addLog(logNuevo)
            .then(() =>
            {
              let arrLogs: Log[] = [];
              arrLogs.push(logNuevo);

              let usuarioNuevo: Personal = new Personal(this.formRegistro.value.perfil, '', arrLogs, EEstadoPersonal.Activo, this.authService.getUserData());
              this.personalService.updateUsuario(usuarioNuevo)
              .then(() =>
              {
                this.mostrarMsjOk();
              });
            });
          }
          else
          {
            this.mostrarMsjErrorAuth();
          }
        }
      }
      else //El usuario no confirmó bien la clave
      {
        this.mostrarMsjErrorClave();
      }
    }
    else
    {
      this.mostrarMsjErrorDatos();
    }

    this.enEspera = false; //Oculto el spinner
  }

  public async actualizar(): Promise<void>
  {
    if(this.usuario != null)
    {
      let sectorAnterior: Sector = this.sectoresService.getSector(this.usuario.sector, this.sectores);
      let usuarioAnterior: Personal = new Personal(this.usuario.tipo, this.usuario.sector, this.usuario.log, this.usuario.estado, null, this.usuario.uid, this.usuario.email, this.usuario.displayName, this.usuario.photoURL, this.usuario.emailVerified);
      let sectorNuevo: Sector;
      this.usuario.tipo = this.formRegistro.value.perfil;
      this.usuario.sector = this.formRegistro.value.sector;
      await this.personalService.updateUsuario(this.usuario);

      //Remuevo al usuario del sector donde estaba antes
      if(sectorAnterior != null && sectorAnterior.sector != "")
      {
        let index: number = -1;
        sectorAnterior.personal.forEach((unUsuario, indice) => 
        {
          if(unUsuario.uid == usuarioAnterior.uid)
          {
            index = indice;
          }
        });

        if (index > -1) 
        {
          sectorAnterior.personal.splice(index, 1);
        }
        await this.sectoresService.updateSector(sectorAnterior);
      }

      //Asigno al usuario al nuevo sector
      if(this.usuario.sector != "")
      {
        sectorNuevo = this.sectoresService.getSector(this.usuario.sector, this.sectores);

        if(sectorNuevo.personal == undefined)
        {
          sectorNuevo.personal = [];
        }

        sectorNuevo.personal.push(this.usuario);
        await this.sectoresService.updateSector(sectorNuevo);
      }

      this.mostrarMsjOk();
    }
  }

  public goBack(): void 
  {
    this.location.back();
  }

  /*public mostrarLog(): void
  {
    //console.log(this.formRegistro.value.sector);
    console.log(this.sectoresService.getSector(this.formRegistro.value.sector, this.sectores));
  }*/
}
