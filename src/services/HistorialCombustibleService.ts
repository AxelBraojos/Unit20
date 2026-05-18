import fs from "fs";
import path from "path";
import { PrecioHistorico } from "../models/PrecioHistorico";
import { JsonFileReader } from "./lectorJson";
import { Parser } from "./Parser";

export class HistorialCombustibleService {
    constructor(
        private lectorArchivo: JsonFileReader,
        private parser: Parser
    ) { }

    public obtenerHistorico(rutaDirectorio: string): PrecioHistorico[] {
        const archivos = this.obtenerArchivosHistoricos(rutaDirectorio);

        return archivos.flatMap((archivo) =>
            this.obtenerHistoricoDesdeArchivo(
                rutaDirectorio,
                archivo
            )
        );
    }

    // Solo procesa ficheros historicos con nombre de fecha valida.
    private obtenerArchivosHistoricos(rutaDirectorio: string): string[] {
        return fs.readdirSync(rutaDirectorio)
            .filter((archivo) => this.esArchivoHistoricoValido(archivo))
            .sort();
    }

    private esArchivoHistoricoValido(archivo: string): boolean {
        return /^\d{4}-\d{2}-\d{2}\.json$/.test(archivo);
    }

    private obtenerHistoricoDesdeArchivo(
        rutaDirectorio: string,
        archivo: string
    ): PrecioHistorico[] {
        const rutaArchivo = path.join(rutaDirectorio, archivo);
        const contenidoJson = this.lectorArchivo.leerArchivo(rutaArchivo);
        const estaciones = this.parser.parsear(contenidoJson);
        const fecha = path.basename(archivo, ".json");

        // Conserva la fecha del archivo en cada estacion parseada.
        return estaciones.map(
            (estacion) => new PrecioHistorico(fecha, estacion)
        );
    }
}
