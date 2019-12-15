import { Comanda } from "./comanda";

export class Producto 
{
    public idCollection: string;
    public uid: string;
    public nombre: string;
    public photoURL?: string;
    public precio: number;
    public sector: string;
    public comandas: Comanda[];

    constructor(
        nombre?: string,
        photoURL?: string,
        precio?: number,
        sector?: string,
        comandas?: Comanda[],
        idCollection?: string,
        uid?: string
    )
    {
        this.nombre = nombre;
        this.photoURL = photoURL;
        this.precio = precio;
        this.sector = sector;
        this.comandas = comandas;
        this.idCollection = idCollection;
        this.uid = uid;
    }
}
