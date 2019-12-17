import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { MenuItem } from 'primeng/api';
import { PersonalService } from '../../servicios/personal.service';
import { Log } from '../../clases/log';
import { LogsService } from '../../servicios/logs.service';
import { EOperacion } from '../../enums/eoperacion.enum';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  public items: MenuItem[];
  public itemsSocio: MenuItem[];
  @Output() opcionMenuSocio: EventEmitter<any> = new EventEmitter<any>();

  constructor(public authService: AuthService, private personalService: PersonalService, private logService: LogsService) { }

  ngOnInit() 
  {
    this.items = [
      { label: 'Salir', icon: 'pi pi-sign-out', command: () => {this.salir(); } }
    ];

    this.itemsSocio = [
      { label: 'Personal', command: () => {this.opcionMenuSocio.emit('listadoPersonal'); } },
      { label: 'Sectores', command: () => {this.opcionMenuSocio.emit('listadoSectores'); } }
    ];
  }

  public async salir(): Promise<void>
  {
    this.personalService.getUsuario(this.authService.getUid());

    let logNuevo: Log = new Log('', this.authService.getEmail(), this.logService.getFecha(), EOperacion.SistemaLogout);
    this.logService.addLog(logNuevo)
    .then(() =>
    {
      this.personalService.getUsuarioPorId(this.authService.getUid())
      .toPromise()
      .then((unUsuario) =>
      {
        let arrLogs: Log[] = unUsuario.log;
        arrLogs.push(logNuevo);
        unUsuario.log = arrLogs;
        this.personalService.updateUsuario(unUsuario)
        .then(() =>
        {
          this.authService.SignOut();
        });
      });
    });
  }

  public getUrlFoto(): string
  {
    let urlFoto: string = this.authService.getUserData().photoURL;

    if(urlFoto == undefined)
    {
      urlFoto = '../../../assets/avatares/avatardefault.png';
    }

    return urlFoto;
  }

  public esSocio(): boolean
  {
    return this.personalService.esSocio();
  }
}
