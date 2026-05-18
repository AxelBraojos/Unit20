import { appConfig } from "./config/appConfig";

import { JsonFileReader } from "./services/lectorJson";
import { Parser } from "./services/Parser";
import { FiltroEstacionesService } from "./services/FiltroEstacionesService";
import { EstadisticasService } from "./services/EstadisticasService";
import { InformeService } from "./services/InformeService";

try {
    const lectorArchivo = new JsonFileReader();

    const parser = new Parser();

    const filtroService = new FiltroEstacionesService();

    const estadisticasService = new EstadisticasService();

    const informeService = new InformeService();

    // Leer fichero JSON
    const contenidoJson = lectorArchivo.leerArchivo(
        appConfig.rutaArchivo
    );

    // Parsear datos
    const estaciones = parser.parsear(contenidoJson);

    // Filtrar provincias
    const estacionesFiltradas =
        filtroService.filtrarPorProvincias(
            estaciones,
            appConfig.provinciasInteres
        );

    // Calcular medias
    const mediaGasoleo =
        estadisticasService.calcularMediaGasoleoA(
            estacionesFiltradas
        );

    const mediaGasolina =
        estadisticasService.calcularMediaGasolina95(
            estacionesFiltradas
        );

    const topGasoleoMasBaratas =
        estadisticasService.obtenerTop5GasoleoMasBaratas(
            estacionesFiltradas
        );

    const topGasoleoMasCaras =
        estadisticasService.obtenerTop5GasoleoMasCaras(
            estacionesFiltradas
        );

    const topGasolinaMasBaratas =
        estadisticasService.obtenerTop5GasolinaMasBaratas(
            estacionesFiltradas
        );

    const topGasolinaMasCaras =
        estadisticasService.obtenerTop5GasolinaMasCaras(
            estacionesFiltradas
        );

    // Mostrar informe
    informeService.mostrarInforme(
        mediaGasoleo,
        mediaGasolina,
        topGasoleoMasBaratas,
        topGasoleoMasCaras,
        topGasolinaMasBaratas,
        topGasolinaMasCaras
    );
} catch (error) {
    if (error instanceof Error) {
        console.error("ERROR:", error.message);
    }
}
