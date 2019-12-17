import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit 
{
  public listaSectores: boolean = false;

  constructor() { }

  ngOnInit() {
}

  public novedadOpcionMenuSocio($event: string): void
  {
    switch ($event)
    {
      case 'listadoSectores':
        this.listaSectores = true;
        break;
    }
  }
}
