import { describe, expect, test } from "@jest/globals";
import { Estacion } from "../../src/models/estacion";
import { FiltroEstacionesService } from "../../src/services/FiltroEstacionesService";

describe("FiltroEstacionesService", () => {
    const filtroService = new FiltroEstacionesService();

    test("filtra estaciones por las provincias indicadas", () => {
        // Arrange
        const estaciones = [
            new Estacion("MADRID", "Madrid", "Calle A", 1.40, 1.50),
            new Estacion("BADAJOZ", "Merida", "Calle B", 1.45, 1.55),
            new Estacion("SEVILLA", "Sevilla", "Calle C", 1.50, 1.60),
        ];

        // Act
        const resultado = filtroService.filtrarPorProvincias(
            estaciones,
            ["MADRID", "BADAJOZ"]
        );

        // Assert
        expect(resultado).toHaveLength(2);
        expect(
            resultado.map((estacion) => estacion.provincia)
        ).toEqual(["MADRID", "BADAJOZ"]);
    });

    test("ignora provincias que no estan en la lista", () => {
        // Arrange
        const estaciones = [
            new Estacion("MADRID", "Madrid", "Calle A", 1.40, 1.50),
            new Estacion("SEVILLA", "Sevilla", "Calle B", 1.50, 1.60),
        ];

        // act
        const resultado = filtroService.filtrarPorProvincias(
            estaciones,
            ["MADRID"]
        );

        // Assert
        expect(resultado).toHaveLength(1);
        expect(resultado[0]?.provincia).toBe("MADRID");
    });
});
