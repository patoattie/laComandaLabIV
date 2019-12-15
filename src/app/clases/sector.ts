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
}
