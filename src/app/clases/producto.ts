import { Comanda } from "./comanda";

export class Producto 
{
    public idCollection: string;
    public uid: string;
    public producto: string;
    public photoURL?: string;
    public precio: number;
    public sector: string;
    public comandas: Comanda[];

    constructor(
        producto?: string,
        photoURL?: string,
        precio?: number,
        sector?: string,
        comandas?: Comanda[],
        idCollection?: string,
        uid?: string
    )
    {
        this.producto = producto;
        this.photoURL = photoURL;
        this.precio = precio;
        this.sector = sector;
        this.comandas = comandas;
        this.idCollection = idCollection;
        this.uid = uid;
    }
}
