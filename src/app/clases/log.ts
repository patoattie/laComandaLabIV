import { EOperacion } from "../enums/eoperacion.enum";

export class Log 
{
    public idCollection: string;
    public uid: string;
    public idSector: string;
    public fecha: string;
    public operacion: EOperacion;

    constructor(
        idSector?: string,
        fecha?: string,
        operacion?: EOperacion,
        idCollection?: string,
        uid?: string
    )
    {
        this.idSector = idSector;
        this.fecha = fecha;
        this.operacion = operacion;
        this.idCollection = idCollection;
        this.uid = uid;
    }
}
