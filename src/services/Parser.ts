import { InvalidJsonError } from "../errors/InvalidJsonError";
import { Estacion } from "../models/estacion";

export class Parser {
    public parsear(jsonData: string): Estacion[] {
        try {
            const datos = JSON.parse(jsonData);

            return datos.ListaEESSPrecio.map((item: any) => {
                return new Estacion(
                    item["Provincia"],
                    item["Municipio"],
                    this.obtenerDireccion(item),
                    this.convertirPrecio(item["Precio Gasoleo A"]),
                    this.convertirPrecio(item["Precio Gasolina 95 E5"])
                );
            });
        } catch (error) {
            throw new InvalidJsonError(
                "El fichero JSON tiene un formato invalido"
            );
        }
    }

    private convertirPrecio(precio: string): number | null {
        if (!precio || precio.trim() === "") {
            return null;
        }

        return parseFloat(precio.replace(",", "."));
    }

    private obtenerDireccion(item: any): string {
        return item["Dirección"] ?? item["DirecciÃ³n"];
    }
}
