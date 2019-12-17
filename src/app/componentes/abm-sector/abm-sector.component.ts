import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
//para poder hacer las validaciones
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { SectoresService } from '../../servicios/sectores.service';
import { Sector } from '../../clases/sector';

import {MessageService} from 'primeng/api';
import { Personal } from '../../clases/personal';

@Component({
  selector: 'app-abm-sector',
  templateUrl: './abm-sector.component.html',
  styleUrls: ['./abm-sector.component.css']
})
export class AbmSectorComponent implements OnInit 
{
  public formRegistro: FormGroup;
  private enEspera: boolean; //Muestra u oculta el spinner
  @Input() sector: Sector;
  @Input() sectores: Sector[];

  constructor(
    private miConstructor: FormBuilder, 
    public authService: AuthService, 
    private cd: ChangeDetectorRef,
    public sectoresService: SectoresService,
    //private personalService: PersonalService,
    public messageService: MessageService
  ) 
  {
    this.formRegistro = this.miConstructor.group(
      {
        sector: ['', Validators.compose([Validators.required])],
        imagen: ['', Validators.compose([])]
      });
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

    if(this.sector != null)
    {
      this.formRegistro.setValue({
        sector: this.sector.sector, 
        imagen: ''
      });
    }
    else
    {
      this.formRegistro.setValue({sector: '', imagen: ''});
    }
  }

  private mostrarMsjErrorDatos(): void
  {
    if(this.formRegistro.controls['sector'].invalid)
    {
      if(this.formRegistro.controls['sector'].hasError('required'))
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Tenés que ingresar una Sector'});
      }
      else
      {
        this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: 'Error al validar la Sector'});
      }
    }
  }

  private mostrarMsjErrorBD(mensaje: string): void
  {
    this.messageService.add({key: 'msjDatos', severity: 'error', summary: 'Error', detail: mensaje});
  }

  private mostrarMsjOk(): void
  {
    this.messageService.add({key: 'msjDatos', severity: 'success', summary: 'Actualización Exitosa', detail: 'Se registró correctamente la sector'});
  }

  public getEnEspera(): boolean
  {
    return this.enEspera;
  }

  public async registrar(): Promise<void>
  {
    this.enEspera = true; //Muestro el spinner

    if(this.formRegistro.valid)
    {
      if(this.sector != null)
      {
        await this.sectoresService.updateSector(new Sector(this.formRegistro.value.sector, this.sector.personal, this.sector.log, this.sector.productos, this.sector.idCollection, this.sector.uid));
      }
      else
      {
        if(this.sectoresService.getSector(this.formRegistro.value.sector, this.sectores) != null)
        {
          this.mostrarMsjErrorBD("El Sector que está ingresando ya existe");
        }
        else
        {
          await this.sectoresService.addSector(new Sector(this.formRegistro.value.sector));

          this.mostrarMsjOk();
          this.formRegistro.reset();
        }
      }
    }
    else
    {
      this.mostrarMsjErrorDatos();
    }

    this.enEspera = false; //Oculto el spinner
    //this.sectoresService.muestraAbm = false;
  }
}
