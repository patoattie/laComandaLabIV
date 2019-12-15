import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  public items: MenuItem[];

  constructor(public authService: AuthService) { }

  ngOnInit() 
  {
    this.items = [
      { label: 'Salir', icon: 'pi pi-sign-out', command: () => {this.salir(); } }
    ];
  }

  public async salir(): Promise<void>
  {
    await this.authService.SignOut();
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
}
