import { Estacion } from "../models/estacion";

export class FiltroEstacionesService {
    public filtrarPorProvincias(
        estaciones: Estacion[],
        provincias: string[]
    ): Estacion[] {
        const provinciasNormalizadas = provincias.map((provincia) =>
            this.normalizarProvincia(provincia)
        );

        return estaciones.filter((estacion) =>
            this.coincideProvincia(
                this.normalizarProvincia(estacion.provincia),
                provinciasNormalizadas
            )
        );
    }

    private coincideProvincia(
        provincia: string,
        provincias: string[]
    ): boolean {
        return provincias.some((provinciaInteres) =>
            provincia === provinciaInteres ||
            provincia.includes(provinciaInteres) ||
            provinciaInteres.includes(provincia)
        );
    }

    private normalizarProvincia(provincia: string): string {
        return provincia
            .replace("Ã‘", "Ñ")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toUpperCase()
            .trim();
    }
}
