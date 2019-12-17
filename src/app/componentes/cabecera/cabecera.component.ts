import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { MenuItem } from 'primeng/api';
import { PersonalService } from '../../servicios/personal.service';
import { Log } from '../../clases/log';
import { LogsService } from '../../servicios/logs.service';
import { EOperacion } from '../../enums/eoperacion.enum';
import { SectoresService } from '../../servicios/sectores.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  public items: MenuItem[];
  public itemsSocio: MenuItem[];
  public itemsUsuario: MenuItem[];
  @Output() opcionMenu: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public authService: AuthService, 
    public personalService: PersonalService, 
    private sectoresService: SectoresService,
    private logService: LogsService
  ) { }

  ngOnInit() 
  {
    this.items = [
      { label: 'Salir', icon: 'pi pi-sign-out', command: () => {this.salir(); } }
    ];

    this.itemsSocio = [
      { label: 'Personal', command: () => {this.opcionMenu.emit('listadoPersonal'); } },
      { label: 'Sectores', command: () => {this.opcionMenu.emit('listadoSectores'); } }
    ];
  }

  public async salir(): Promise<void>
  {
    //this.personalService.getUsuario(this.authService.getUid());

    this.personalService.getUsuarioPorId(this.authService.getUid())
    .toPromise()
    .then((unUsuario) =>
    {
      let logNuevo: Log = new Log(unUsuario.sector, unUsuario.email, this.logService.getFecha(), EOperacion.SistemaLogout);
      this.logService.addLog(logNuevo)
      .then(() =>
      {
        let arrLogsUsuario: Log[] = unUsuario.log;
        arrLogsUsuario.push(logNuevo);
        unUsuario.log = arrLogsUsuario;

        if(unUsuario.idSector != "")
        {
          this.sectoresService.getSectorPorId(unUsuario.idSector)
          .toPromise()
          .then((unSector) =>
          {
            let arrLogsSector: Log[] = unSector.log;
            arrLogsSector.push(logNuevo);
            unSector.log = arrLogsSector;
            this.sectoresService.updateSector(unSector);
          });
        }

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
