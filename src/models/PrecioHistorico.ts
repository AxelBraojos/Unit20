import { Estacion } from "./estacion";

// Une una estacion con la fecha del fichero historico del que procede
export class PrecioHistorico {
    constructor(
        public fecha: string,
        public estacion: Estacion
    ) { }
}
