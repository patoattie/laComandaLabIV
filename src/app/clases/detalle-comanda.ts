import { EEstadoPedido } from "../enums/eestado-pedido.enum";
import { Producto } from "./producto";

export class DetalleComanda 
{
    public idCollection: string;
    public uid: string;
    public producto: Producto;
    public cantidad: number;
    public importe: number;
    public estado: EEstadoPedido;
    public empleado: string;
    public tiempoEstimado: number;
    public fechaInicio: string;
    public tiempoReal: number;
    public idComanda: string;

    constructor(
        producto?: Producto,
        cantidad?: number,
        importe?: number,
        estado?: EEstadoPedido,
        empleado?: string,
        tiempoEstimado?: number,
        fechaInicio?: string,
        tiempoReal?: number,
        idComanda?: string,
        idCollection?: string,
        uid?: string
    )
    {
        this.producto = producto;
        this.cantidad = cantidad;
        this.importe = importe;
        this.estado = estado;
        this.empleado = empleado;
        this.tiempoEstimado = tiempoEstimado;
        this.fechaInicio = fechaInicio;
        this.tiempoReal = tiempoReal;
        this.idComanda = idComanda;
        this.idCollection = idCollection;
        this.uid = uid;
    }
}
