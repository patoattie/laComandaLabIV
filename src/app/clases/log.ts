import { EOperacion } from "../enums/eoperacion.enum";

export class Log 
{
    public idCollection: string;
    public uid: string;
    public sector: string;
    public usuario: string;
    public fecha: string;
    public operacion: EOperacion;

    constructor(
        sector?: string,
        usuario?: string,
        fecha?: string,
        operacion?: EOperacion,
        idCollection?: string,
        uid?: string
    )
    {
        this.sector = sector;
        this.usuario = usuario;
        this.fecha = fecha;
        this.operacion = operacion;
        this.idCollection = idCollection;
        this.uid = uid;
    }
}
