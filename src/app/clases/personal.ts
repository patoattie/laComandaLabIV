import { User } from "./user";
import { ETipoPersonal } from "../enums/etipo-personal.enum";
import { EEstadoPersonal } from "../enums/eestado-personal.enum";
import { Log } from "./log";

export class Personal extends User
{
  public tipo: ETipoPersonal;
  public sector: string;
  public idSector: string;
  public log: Log[];
  public estado: EEstadoPersonal;

  constructor(
    tipo?: ETipoPersonal, 
    sector?: string,
    idSector?: string,
    log?: Log[],
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
    this.idSector = idSector;
    this.log = log;
    this.estado = estado;
  }
}