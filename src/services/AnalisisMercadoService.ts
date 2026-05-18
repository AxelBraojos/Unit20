import { PrecioHistorico } from "../models/PrecioHistorico";

export type DiaSemana =
    "domingo" |
    "lunes" |
    "martes" |
    "miercoles" |
    "jueves" |
    "viernes" |
    "sabado";

export type MediasPorDia = Partial<Record<DiaSemana, number>>;
type ObtenerPrecio = (precioHistorico: PrecioHistorico) => number | null;

const DIAS_SEMANA: DiaSemana[] = [
    "domingo",
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
];

export class AnalisisMercadoService {
    constructor(
        private historico: PrecioHistorico[]
    ) { }

    public obtenerMediaGasoleoPorDia(): MediasPorDia {
        return this.obtenerMediaPorDia(
            this.historico,
            (precioHistorico) =>
                precioHistorico.estacion.precioGasoleoA
        );
    }

    public obtenerMediaGasolinaPorDia(): MediasPorDia {
        return this.obtenerMediaPorDia(
            this.historico,
            (precioHistorico) =>
                precioHistorico.estacion.precioGasolina95E5
        );
    }

    public obtenerMediaGasoleoUltimoMesPorDia(
        provincias: string[]
    ): MediasPorDia {
        // Calcula solo con datos recientes y provincias estudiadas
        return this.obtenerMediaPorDia(
            this.obtenerHistoricoUltimoMesPorProvincias(provincias),
            (precioHistorico) =>
                precioHistorico.estacion.precioGasoleoA
        );
    }

    public obtenerMediaGasolinaUltimoMesPorDia(
        provincias: string[]
    ): MediasPorDia {
        // Mantiene la misma regla  para comparar combustibles
        return this.obtenerMediaPorDia(
            this.obtenerHistoricoUltimoMesPorProvincias(provincias),
            (precioHistorico) =>
                precioHistorico.estacion.precioGasolina95E5
        );
    }

    private obtenerMediaPorDia(
        historico: PrecioHistorico[],
        obtenerPrecio: ObtenerPrecio
    ): MediasPorDia {
        const preciosPorDia = this.agruparPreciosPorDia(
            historico,
            obtenerPrecio
        );

        return Object.entries(preciosPorDia).reduce(
            (medias, [dia, precios]) => {
                medias[dia as DiaSemana] = this.calcularMedia(precios);
                return medias;
            },
            {} as MediasPorDia
        );
    }

    private agruparPreciosPorDia(
        historico: PrecioHistorico[],
        obtenerPrecio: ObtenerPrecio
    ): Record<string, number[]> {
        // Agrupa precios validos por dia de la semana.
        return historico.reduce(
            (preciosPorDia, precioHistorico) => {
                const precio = obtenerPrecio(precioHistorico);

                if (precio === null) {
                    return preciosPorDia;
                }

                const diaSemana = this.obtenerDiaSemana(
                    precioHistorico.fecha
                );

                preciosPorDia[diaSemana] =
                    preciosPorDia[diaSemana] ?? [];

                preciosPorDia[diaSemana].push(precio);
                return preciosPorDia;
            },
            {} as Record<string, number[]>
        );
    }

    private obtenerDiaSemana(fecha: string): DiaSemana {
        const [anio, mes, dia] = fecha.split("-").map(Number);
        const fechaUtc = new Date(Date.UTC(anio, mes - 1, dia));

        return DIAS_SEMANA[fechaUtc.getUTCDay()];
    }

    private obtenerHistoricoUltimoMesPorProvincias(
        provincias: string[]
    ): PrecioHistorico[] {
        if (this.historico.length === 0) {
            return [];
        }

        const fechaReferencia = this.obtenerFechaReferencia();
        const fechaInicio = new Date(fechaReferencia);
        const provinciasNormalizadas = provincias.map((provincia) =>
            provincia.toUpperCase()
        );

        // La referencia es la fecha mas reciente del historico disponible
        fechaInicio.setUTCMonth(fechaInicio.getUTCMonth() - 1);

        return this.historico.filter((precioHistorico) => {
            const fecha = this.crearFechaUtc(precioHistorico.fecha);
            const provincia =
                precioHistorico.estacion.provincia.toUpperCase();

            return fecha >= fechaInicio &&
                fecha <= fechaReferencia &&
                provinciasNormalizadas.includes(provincia);
        });
    }

    private obtenerFechaReferencia(): Date {
        const fechas = this.historico.map((precioHistorico) =>
            this.crearFechaUtc(precioHistorico.fecha).getTime()
        );

        return new Date(Math.max(...fechas));
    }

    private crearFechaUtc(fecha: string): Date {
        const [anio, mes, dia] = fecha.split("-").map(Number);

        return new Date(Date.UTC(anio, mes - 1, dia));
    }

    private calcularMedia(precios: number[]): number {
        const suma = precios.reduce(
            (total, precio) => total + precio,
            0
        );

        return Number((suma / precios.length).toFixed(3));
    }
}
