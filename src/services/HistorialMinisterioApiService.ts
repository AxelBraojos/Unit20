import { PrecioHistorico } from "../models/PrecioHistorico";
import { MinisterioApiReader } from "./MinisterioApiReader";
import { Parser } from "./Parser";

const PETICIONES_HISTORICAS_SIMULTANEAS = 3;

export class HistorialMinisterioApiService {
    constructor(
        private lectorApi: MinisterioApiReader,
        private parser: Parser
    ) { }

    public async obtenerHistoricoUltimosDias(
        apiHistoricoUrl: string,
        dias: number
    ): Promise<PrecioHistorico[]> {
        const fechas = this.obtenerFechasUltimosDias(dias);
        const historicoPorFecha: PrecioHistorico[][] = [];

        for (
            let indice = 0;
            indice < fechas.length;
            indice += PETICIONES_HISTORICAS_SIMULTANEAS
        ) {
            const loteFechas = fechas.slice(
                indice,
                indice + PETICIONES_HISTORICAS_SIMULTANEAS
            );

            historicoPorFecha.push(
                ...await Promise.all(
                    loteFechas.map((fecha) =>
                        this.obtenerHistoricoFecha(apiHistoricoUrl, fecha)
                    )
                )
            );
        }

        return historicoPorFecha.flat();
    }

    private async obtenerHistoricoFecha(
        apiHistoricoUrl: string,
        fecha: Date
    ): Promise<PrecioHistorico[]> {
        const contenidoJson = await this.lectorApi.leerDatos(
            `${apiHistoricoUrl}${this.formatearFechaApi(fecha)}`
        );
        const estaciones = this.parser.parsear(contenidoJson);
        const fechaHistorico = this.formatearFechaIso(fecha);

        return estaciones.map(
            (estacion) => new PrecioHistorico(fechaHistorico, estacion)
        );
    }

    private obtenerFechasUltimosDias(dias: number): Date[] {
        const fechaActual = new Date();

        return Array.from({ length: dias }, (_, indice) => {
            const fecha = new Date(Date.UTC(
                fechaActual.getFullYear(),
                fechaActual.getMonth(),
                fechaActual.getDate()
            ));

            fecha.setUTCDate(fecha.getUTCDate() - indice - 1);
            return fecha;
        });
    }

    private formatearFechaApi(fecha: Date): string {
        const dia = this.completarDosDigitos(fecha.getUTCDate());
        const mes = this.completarDosDigitos(fecha.getUTCMonth() + 1);
        const anio = fecha.getUTCFullYear();

        return `${dia}-${mes}-${anio}`;
    }

    private formatearFechaIso(fecha: Date): string {
        const dia = this.completarDosDigitos(fecha.getUTCDate());
        const mes = this.completarDosDigitos(fecha.getUTCMonth() + 1);
        const anio = fecha.getUTCFullYear();

        return `${anio}-${mes}-${dia}`;
    }

    private completarDosDigitos(valor: number): string {
        return valor.toString().padStart(2, "0");
    }
}
