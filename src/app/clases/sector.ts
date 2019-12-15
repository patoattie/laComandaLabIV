import { Personal } from "./personal";
import { Log } from "./log";
import { Producto } from "./producto";

export class Sector 
{
    public idCollection: string;
    public uid: string;
    public sector: string;
    public personal: Personal[];
    public log: Log[];
    public productos: Producto[];

    constructor(
        sector?: string,
        personal?: Personal[],
        log?: Log[],
        productos?: Producto[],
        idCollection?: string,
        uid?: string
    )
    {
        this.sector = sector;
        this.personal = personal;
        this.log = log;
        this.productos = productos;
        this.idCollection = idCollection;
        this.uid = uid;
    }
}
