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
  public sectorSeleccionado: Sector = null;
  public cols: any[];
  public verPersonal: boolean = false;
  public verLog: boolean = false;

  constructor(public sectoresService: SectoresService, public personalService: PersonalService) { }

  ngOnInit() 
  {
    this.cols = [
      { field: 'sector', header: 'Sector' }
    ];
  }

  public eligeSector(event, unSector: Sector): void
  {
    if(event.ctrlKey)
    {
      this.sectorSeleccionado = null;
    }
    else
    {
      this.sectorSeleccionado = unSector;
    }
  }

  public habilitaAbm(agrega: boolean): void
  {
    if(agrega)
    {
      this.sectorSeleccionado = null;
    }

    this.sectoresService.muestraAbm = true;
  }

  public muestraPersonal(muestra: boolean): void
  {
    this.verPersonal = muestra;
  }

  public muestraLog(muestra: boolean): void
  {
    this.verLog = muestra;
  }
}