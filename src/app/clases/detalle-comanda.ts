import { EEstadoPedido } from "../enums/eestado-pedido.enum";

export class DetalleComanda 
{
    public idCollection: string;
    public uid: string;
    public producto: string;
    public cantidad: number;
    public importe: number;
    public estado: EEstadoPedido;
    public empleado: string;
    public tiempoEstimado: number;
    public fechaInicio: string;
    public tiempoReal: number;
    public idComanda: string;
}
