import { Estacion } from "../models/estacion";

export class InformeService {
    public mostrarInforme(
        mediaGasoleo: number,
        mediaGasolina: number,
        topGasoleoMasBaratas: Estacion[],
        topGasoleoMasCaras: Estacion[],
        topGasolinaMasBaratas: Estacion[],
        topGasolinaMasCaras: Estacion[]
    ): void {
        console.log("informe combustibles:");

        console.log(
            `Media Gasoleo A: ${mediaGasoleo.toFixed(3)} €`
        );

        console.log(
            `Media Gasolina 95 E5: ${mediaGasolina.toFixed(3)} €`
        );

        this.mostrarRanking(
            "Top 5 Gasoleo A mas barato",
            topGasoleoMasBaratas,
            (estacion) => estacion.precioGasoleoA
        );

        this.mostrarRanking(
            "Top 5 Gasoleo A mas caro",
            topGasoleoMasCaras,
            (estacion) => estacion.precioGasoleoA
        );

        this.mostrarRanking(
            "Top 5 Gasolina 95 E5 mas barata",
            topGasolinaMasBaratas,
            (estacion) => estacion.precioGasolina95E5
        );

        this.mostrarRanking(
            "Top 5 Gasolina 95 E5 mas cara",
            topGasolinaMasCaras,
            (estacion) => estacion.precioGasolina95E5
        );
    }

    private mostrarRanking(
        titulo: string,
        estaciones: Estacion[],
        obtenerPrecio: (estacion: Estacion) => number | null
    ): void {
        console.log("");
        console.log(titulo);

        estaciones.forEach((estacion, indice) => {
            const precio = obtenerPrecio(estacion);

            console.log(
                `${indice + 1}. ${estacion.provincia} | ` +
                `${estacion.municipio} | ` +
                `${estacion.direccion} | ` +
                `${precio?.toFixed(3)} €`
            );
        });
    }
}
