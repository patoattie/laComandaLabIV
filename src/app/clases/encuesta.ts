export class Encuesta 
{
    public idCollection: string;
    public puntosMesa: number;
    public puntosRestaurant: number;
    public puntosMozo: number;
    public puntosCocinero: number;
    public idComanda: string;
    public observaciones: string;

    constructor(
        puntosMesa?: number,
        puntosRestaurant?: number,
        puntosMozo?: number,
        puntosCocinero?: number,
        idComanda?: string,
        observaciones?: string,
        idCollection?: string
    )
    {
        this.puntosMesa = puntosMesa;
        this.puntosRestaurant = puntosRestaurant;
        this.puntosMozo = puntosMozo;
        this.puntosCocinero = puntosCocinero;
        this.idComanda = idComanda;
        this.observaciones = observaciones;
        this.idCollection = idCollection;
    }
}
