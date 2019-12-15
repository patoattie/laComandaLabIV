import { DetalleComanda } from "./detalle-comanda";
import { Encuesta } from "./encuesta";

export class Comanda 
{
    public idCollection: string;
    public uid: string;
    public cliente: string;
    public photoURL: string;
    public detalle: DetalleComanda[];
    public idMesa: string;
    public encuesta: Encuesta;
    public fecha: string;
    public mozo: string;

    constructor(
        cliente?: string,
        photoURL?: string,
        detalle?: DetalleComanda[],
        idMesa?: string,
        encuesta?: Encuesta,
        fecha?: string,
        mozo?: string,
        idCollection?: string,
        uid?: string
    )
    {
        this.cliente = cliente;
        this.photoURL = photoURL;
        this.detalle = detalle;
        this.idMesa = idMesa;
        this.encuesta = encuesta;
        this.fecha = fecha;
        this.mozo = mozo;
        this.idCollection = idCollection;
        this.uid = uid;
    }
}
