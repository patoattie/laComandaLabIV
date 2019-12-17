import { Component, OnInit, Input} from '@angular/core';
import { Sector } from "../../clases/sector";
import { SectoresService } from "../../servicios/sectores.service";
import { PersonalService } from '../../servicios/personal.service';

@Component({
  selector: 'app-listado-sectores',
  templateUrl: './listado-sectores.component.html',
  styleUrls: ['./listado-sectores.component.css']
})
export class ListadoSectoresComponent implements OnInit 
{
  @Input() sectores: Sector[];
  public sucursalSeleccionada: Sector = null;
  public cols: any[];
  public verPersonal: boolean = false;
  public verMov: boolean = false;

  constructor(public sectoresService: SectoresService, public personalService: PersonalService) { }

  ngOnInit() 
  {
    this.cols = [
      { field: 'photoURL', header: 'Foto' },
      { field: 'sucursal', header: 'Sector' }
    ];
  }

  public eligeSector(event, unaSector: Sector): void
  {
    if(event.ctrlKey)
    {
      this.sucursalSeleccionada = null;
    }
    else
    {
      this.sucursalSeleccionada = unaSector;
    }
  }

  public habilitaAbm(agrega: boolean): void
  {
    if(agrega)
    {
      this.sucursalSeleccionada = null;
    }

    this.sectoresService.muestraAbm = true;
  }

  public muestraPersonal(muestra: boolean): void
  {
    this.verPersonal = muestra;
  }

  public muestraMov(muestra: boolean): void
  {
    this.verMov = muestra;
  }
}