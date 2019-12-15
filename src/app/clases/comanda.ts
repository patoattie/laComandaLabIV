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
}
