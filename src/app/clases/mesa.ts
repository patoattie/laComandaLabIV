import { EEstadoMesa } from "../enums/eestado-mesa.enum";
import { Comanda } from "./comanda";

export class Mesa 
{
    public idCollection: string;
    public uid: string;
    public comandas: Comanda[];
    public estado: EEstadoMesa;

    constructor(
        comandas?: Comanda[],
        estado?: EEstadoMesa,
        idCollection?: string,
        uid?: string
    )
    {
        this.comandas = comandas;
        this.estado = estado;
        this.idCollection = idCollection;
        this.uid = uid;
    }
}
