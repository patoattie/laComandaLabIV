import { Personal } from "./personal";
import { Log } from "./log";
import { Producto } from "./producto";

export class Sector 
{
    public idCollection: string;
    public uid: string;
    public nombre: string;
    public personal: Personal[];
    public log: Log[];
    public productos: Producto[];

    constructor(
        nombre?: string,
        personal?: Personal[],
        log?: Log[],
        productos?: Producto[],
        idCollection?: string,
        uid?: string
    )
    {
        this.nombre = nombre;
        this.personal = personal;
        this.log = log;
        this.productos = productos;
        this.idCollection = idCollection;
        this.uid = uid;
    }
}
