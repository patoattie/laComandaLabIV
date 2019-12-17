import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SectoresService } from '../../servicios/sectores.service';
import { Sector } from '../../clases/sector';
import { PersonalService } from '../../servicios/personal.service';
import { Personal } from '../../clases/personal';
import { LogsService } from '../../servicios/logs.service';
import { Log } from '../../clases/log';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit, OnDestroy 
{
  public listaSectores: boolean = false;
  public listaPersonal: boolean = false;
  public sectores: Sector[];
  public personal: Personal[];
  public logs: Log[];
  private subscriptions: Subscription[] = [];

  constructor(
    private sectoresService: SectoresService,
    private personalService: PersonalService,
    private logsService: LogsService
  ) { }

  ngOnInit() 
  {
    this.subscriptions.push(
      this.sectoresService.getSectores()
      .subscribe((sectores) => 
      {
        this.sectores = sectores;
        //Elimina los duplicados que se generan al suscribir después de desloguearse, no lo pude resolver de una forma más elegante
        this.sectores = this.sectores.filter((test, index, array) =>
          index === array.findIndex((findTest) =>
           findTest.idCollection === test.idCollection
          )
        );
      })
    );

    this.subscriptions.push(
      this.personalService.getPersonal()
      .subscribe((personal) => 
      {
        this.personal = personal;
        //Elimina los duplicados que se generan al suscribir después de desloguearse, no lo pude resolver de una forma más elegante
        this.personal = this.personal.filter((test, index, array) =>
          index === array.findIndex((findTest) =>
           findTest.uid === test.uid
          )
        );
      })
    );

    this.subscriptions.push(
      this.logsService.getLogs()
      .subscribe((logs) => 
      {
        this.logs = logs;
        //Elimina los duplicados que se generan al suscribir después de desloguearse, no lo pude resolver de una forma más elegante
        this.logs = this.logs.filter((test, index, array) =>
          index === array.findIndex((findTest) =>
           findTest.idCollection === test.idCollection
          )
        );
      })
    );
  }

  ngOnDestroy() 
  {
    this.subscriptions.forEach((unaSubscription) => 
    {
      unaSubscription.unsubscribe();
    });
  }

  public novedadOpcionMenuSocio($event: string): void
  {
    switch ($event)
    {
      case 'listadoSectores':
        this.listaSectores = true;
        this.listaPersonal = false;
        break;
      case 'listadoPersonal':
        this.listaSectores = false;
        this.listaPersonal = true;
        break;
    }
  }
}
