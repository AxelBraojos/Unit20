import { Estacion } from "../models/estacion";

export class FiltroEstacionesService {
    public filtrarPorProvincias(
        estaciones: Estacion[],
        provincias: string[]
    ): Estacion[] {
        return estaciones.filter((estacion) =>
            provincias.includes(estacion.provincia.toUpperCase())
        );
    }
}
