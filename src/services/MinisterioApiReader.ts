import https from "https";
import { ApiReadError } from "../errors/ApiReadError";

export class MinisterioApiReader {
    public leerDatos(url: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const request = https.get(url, (response) => {
                const statusCode = response.statusCode ?? 0;
                const chunks: Buffer[] = [];

                if (statusCode < 200 || statusCode >= 300) {
                    response.resume();
                    reject(new ApiReadError(
                        `El API del ministerio respondio con estado ${statusCode}`
                    ));
                    return;
                }

                response.on("data", (chunk: Buffer) => {
                    chunks.push(chunk);
                });

                response.on("end", () => {
                    resolve(Buffer.concat(chunks).toString("utf-8"));
                });
            });

            request.setTimeout(45000, () => {
                request.destroy(new ApiReadError(
                    "Tiempo de espera agotado al consultar el API del ministerio"
                ));
            });

            request.on("error", (error) => {
                reject(new ApiReadError(
                    `No se pudo leer el API del ministerio: ${error.message}`
                ));
            });
        });
    }
}
