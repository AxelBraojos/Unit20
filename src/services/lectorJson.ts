import fs from "fs";
import { FileReadError } from "../errors/FileReadError";

export class JsonFileReader {
    public leerArchivo(rutaArchivo: string): string {
        try {
            return fs.readFileSync(rutaArchivo, "utf-8");
        } catch (error) {
            throw new FileReadError(
                `No se pudo leer el archivo: ${rutaArchivo}`
            );
        }
    }
}
