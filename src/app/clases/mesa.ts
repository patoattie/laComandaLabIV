import { EEstadoMesa } from "../enums/eestado-mesa.enum";

export class Mesa 
{
    public idCollection: string;
    public uid: string;
    public comandas: string;
    public estado: EEstadoMesa;
}
