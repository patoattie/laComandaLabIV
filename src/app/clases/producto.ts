import { Comanda } from "./comanda";

export class Producto 
{
    public idCollection: string;
    public uid: string;
    public nombre: string;
    public photoURL?: string;
    public precio: number;
    public idSector: string;
    public comandas: Comanda[];

    constructor(
        nombre?: string,
        photoURL?: string,
        precio?: number,
        idSector?: string,
        comandas?: Comanda[],
        idCollection?: string,
        uid?: string
    )
    {
        this.nombre = nombre;
        this.photoURL = photoURL;
        this.precio = precio;
        this.idSector = idSector;
        this.comandas = comandas;
        this.idCollection = idCollection;
        this.uid = uid;
    }
}
