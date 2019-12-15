import { DetalleComanda } from "./detalle-comanda";
import { Encuesta } from "./encuesta";

export class Comanda 
{
    public idCollection: string;
    public uid: string;
    public cliente: string;
    public photoURL: string;
    public detalle: DetalleComanda;
    public idMesa: string;
    public encuesta: Encuesta;
    public mozo: string;

    constructor(
        cliente?: string,
        photoURL?: string,
        detalle?: DetalleComanda,
        idMesa?: string,
        encuesta?: Encuesta,
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
        this.mozo = mozo;
        this.idCollection = idCollection;
        this.uid = uid;
    }
}
