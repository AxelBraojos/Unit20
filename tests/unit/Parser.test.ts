import { describe, expect, test } from "@jest/globals";
import { InvalidJsonError } from "../../src/errors/InvalidJsonError";
import { Parser } from "../../src/services/Parser";

describe("Parser", () => {
    const parser = new Parser();

    test("parsea un JSON valido a estaciones", () => {
        
        const jsonValido = JSON.stringify({
            ListaEESSPrecio: [
                {
                    Provincia: "MADRID",
                    Municipio: "Madrid",
                    "Dirección": "Calle A",
                    "Precio Gasoleo A": "1,459",
                    "Precio Gasolina 95 E5": "1,579",
                },
            ],
        });

       
        const resultado = parser.parsear(jsonValido);

        expect(resultado).toHaveLength(1);
        expect(resultado[0]?.provincia).toBe("MADRID");
        expect(resultado[0]?.municipio).toBe("Madrid");
        expect(resultado[0]?.direccion).toBe("Calle A");
        expect(resultado[0]?.precioGasoleoA).toBe(1.459);
        expect(resultado[0]?.precioGasolina95E5).toBe(1.579);
    });

    test("lanza InvalidJsonError con JSON invalido", () => {
        // Arrange
        const jsonInvalido = "{ contenido invalido";

        // Act
        const accion = () => parser.parsear(jsonInvalido);

        // assert
        expect(accion).toThrow(InvalidJsonError);
    });
});
