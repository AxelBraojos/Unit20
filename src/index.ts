import { appConfig } from "./config/appConfig";

import { JsonFileReader } from "./services/lectorJson";
import { Parser } from "./services/Parser";
import { FiltroEstacionesService } from "./services/FiltroEstacionesService";
import { EstadisticasService } from "./services/EstadisticasService";
import { InformeService } from "./services/InformeService";
import { HistorialCombustibleService } from "./services/HistorialCombustibleService";
import { AnalisisMercadoService } from "./services/AnalisisMercadoService";
import { GraficaBarrasService } from "./services/GraficaBarrasService";

try {
    const lectorArchivo = new JsonFileReader();

    const parser = new Parser();

    const filtroService = new FiltroEstacionesService();

    const estadisticasService = new EstadisticasService();

    const informeService = new InformeService();

    const historialService = new HistorialCombustibleService(
        lectorArchivo,
        parser
    );

    const graficaBarrasService = new GraficaBarrasService();

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

    const historico = historialService.obtenerHistorico(
        appConfig.rutaHistorico
    );

    const analisisMercadoService =
        new AnalisisMercadoService(historico);

    const mediaGasoleoUltimoMes =
        analisisMercadoService.obtenerMediaGasoleoUltimoMesPorDia(
            appConfig.provinciasInteres
        );

    const mediaGasolinaUltimoMes =
        analisisMercadoService.obtenerMediaGasolinaUltimoMesPorDia(
            appConfig.provinciasInteres
        );

    // Mostrar analisis temporal por consola
    console.log("");
    console.log("ANALISIS DE MERCADO ");
    console.log("");
    console.log("Gasoleo A:");
    Object.entries(
        mediaGasoleoUltimoMes
    ).forEach(([dia, media]) => {
        console.log(`${dia} -> ${media.toFixed(2)}`);
    });

    console.log("");
    console.log("Gasolina 95 E5:");
    Object.entries(
        mediaGasolinaUltimoMes
    ).forEach(([dia, media]) => {
        console.log(`${dia} -> ${media.toFixed(2)}`);
    });

    // generar imagenes para cada combustible analizado
    graficaBarrasService.generarGrafica(
        "Precio medio Gasoleo A por dia",
        mediaGasoleoUltimoMes,
        `${appConfig.rutaGraficas}/gasoleo-a.svg`
    );

    graficaBarrasService.generarGrafica(
        "Precio medio Gasolina 95 E5 por dia",
        mediaGasolinaUltimoMes,
        `${appConfig.rutaGraficas}/gasolina-95-e5.svg`
    );

    console.log("");
    console.log("Graficas generadas en output/graficas");
} catch (error) {
    if (error instanceof Error) {
        console.error("ERROR:", error.message);
    }
}
