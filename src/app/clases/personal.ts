import { User } from "./user";
import { ETipoPersonal } from "../enums/etipo-personal.enum";
import { EEstadoPersonal } from "../enums/eestado-personal.enum";

export class Personal extends User
{
  public tipo: ETipoPersonal;
  public sector: string;
  public log: string;
  public estado: EEstadoPersonal;

  constructor(
    tipo?: ETipoPersonal, 
    sector?: string,
    log?: string,
    estado?: EEstadoPersonal,
    user?: User,
    uid?: string,
    email?: string,
    displayName?: string,
    photoURL?: string,
    emailVerified?: boolean)
  {
    if(user == null)
    {
      super(uid, email, displayName, photoURL, emailVerified);
    }
    else
    {
      super(user.uid, user.email, user.displayName, user.photoURL, user.emailVerified);
    }
    
    this.tipo = tipo;
    this.sector = sector;
    this.log = log;
    this.estado = estado;
  }
}