import { Component, OnInit, Input } from '@angular/core';
import { Personal } from "../../clases/personal";
import { PersonalService } from '../../servicios/personal.service';
import { Sector } from '../../clases/sector';
import { Log } from '../../clases/log';

@Component({
  selector: 'app-listado-personal',
  templateUrl: './listado-personal.component.html',
  styleUrls: ['./listado-personal.component.css']
})
export class ListadoPersonalComponent implements OnInit 
{
  @Input() personal: Personal[];
  @Input() sectores: Sector[];
  @Input() logs: Log[];
  @Input() esLov: boolean;
  public usuarioSeleccionado: Personal = null;
  public cols: any[];
  public verLog: boolean = false;

  constructor(public personalService: PersonalService) { }

  ngOnInit() 
  {
    if(this.esLov)
    {
      this.cols = [
        { field: 'photoURL', header: 'Avatar' },
        { field: 'email', header: 'Email' },
        { field: 'tipo', header: 'Perfil' }
      ];
    }
    else
    {
      this.cols = [
        { field: 'photoURL', header: 'Avatar' },
        { field: 'email', header: 'Email' },
        { field: 'tipo', header: 'Perfil' },
        { field: 'sector', header: 'Sector' }
      ];
    }
  }

  public eligeUsuario(event, unUsuario: Personal): void
  {
    if(event.ctrlKey)
    {
      this.usuarioSeleccionado = null;
    }
    else
    {
      this.usuarioSeleccionado = unUsuario;
    }
  }

  public habilitaAbm(agrega: boolean): void
  {
    if(agrega)
    {
      this.usuarioSeleccionado = null;
    }

    this.personalService.muestraAbm = true;
  }

  public muestraLog(muestra: boolean): void
  {
    this.verLog = muestra;
  }
}
