import { EEstadoMesa } from "../enums/eestado-mesa.enum";
import { Comanda } from "./comanda";

export class Mesa 
{
    public idCollection: string;
    public uid: string;
    public mesa: string;
    public comandas: Comanda[];
    public estado: EEstadoMesa;

    constructor(
        mesa?: string,
        comandas?: Comanda[],
        estado?: EEstadoMesa,
        idCollection?: string,
        uid?: string
    )
    {
        this.mesa = mesa;
        this.comandas = comandas;
        this.estado = estado;
        this.idCollection = idCollection;
        this.uid = uid;
    }
}
