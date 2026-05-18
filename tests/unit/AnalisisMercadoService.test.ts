import { describe, expect, test } from "@jest/globals";
import { Estacion } from "../../src/models/estacion";
import { PrecioHistorico } from "../../src/models/PrecioHistorico";
import { AnalisisMercadoService } from "../../src/services/AnalisisMercadoService";

describe("AnalisisMercadoService", () => {
    test("agrupa y calcula la media de Gasoleo A por dia de la semana", () => {
        // Arrange
        const historico = [
            crearPrecioHistorico("2026-05-04", 1.40, 1.60),
            crearPrecioHistorico("2026-05-04", 1.60, 1.70),
            crearPrecioHistorico("2026-05-05", 1.50, 1.80),
        ];
        const service = new AnalisisMercadoService(historico);

        // Act
        const resultado = service.obtenerMediaGasoleoPorDia();

        // Assert
        expect(resultado).toEqual({
            lunes: 1.50,
            martes: 1.50,
        });
    });

    test("ignora valores null al calcular medias de Gasoleo A", () => {
        // Arrange
        const historico = [
            crearPrecioHistorico("2026-05-04", 1.40, 1.60),
            crearPrecioHistorico("2026-05-04", null, 1.70),
            crearPrecioHistorico("2026-05-04", 1.60, 1.80),
        ];
        const service = new AnalisisMercadoService(historico);

        // Act
        const resultado = service.obtenerMediaGasoleoPorDia();

        // Assert
        expect(resultado).toEqual({
            lunes: 1.50,
        });
    });

    test("calcula la media de Gasolina 95 E5 por dia de la semana", () => {
        // Arrange
        const historico = [
            crearPrecioHistorico("2026-05-06", 1.40, 1.60),
            crearPrecioHistorico("2026-05-06", 1.50, 1.80),
            crearPrecioHistorico("2026-05-07", 1.60, 1.70),
        ];
        const service = new AnalisisMercadoService(historico);

        // Act
        const resultado = service.obtenerMediaGasolinaPorDia();

        // Assert
        expect(resultado).toEqual({
            miercoles: 1.70,
            jueves: 1.70,
        });
    });

    test("detecta correctamente lunes, martes y miercoles", () => {
        // Arrange
        const historico = [
            crearPrecioHistorico("2026-05-04", 1.40, 1.60),
            crearPrecioHistorico("2026-05-05", 1.50, 1.70),
            crearPrecioHistorico("2026-05-06", 1.60, 1.80),
        ];
        const service = new AnalisisMercadoService(historico);

        // Act
        const resultado = service.obtenerMediaGasoleoPorDia();

        // Assert
        expect(Object.keys(resultado)).toEqual([
            "lunes",
            "martes",
            "miercoles",
        ]);
    });

    test("calcula medias del ultimo mes solo en las provincias indicadas", () => {
        // Arrange
        const historico = [
            crearPrecioHistorico("2026-04-02", 1.10, 1.20, "MADRID"),
            crearPrecioHistorico("2026-05-03", 1.50, 1.70, "MADRID"),
            crearPrecioHistorico("2026-05-03", 1.70, 1.90, "BADAJOZ"),
            crearPrecioHistorico("2026-05-03", 2.50, 2.70, "SEVILLA"),
        ];
        const service = new AnalisisMercadoService(historico);

        // Act
        const resultado = service.obtenerMediaGasoleoUltimoMesPorDia([
            "MADRID",
            "BADAJOZ",
        ]);

        // Assert
        expect(resultado).toEqual({
            domingo: 1.60,
        });
    });
});

function crearPrecioHistorico(
    fecha: string,
    precioGasoleoA: number | null,
    precioGasolina95E5: number | null,
    provincia = "MADRID"
): PrecioHistorico {
    return new PrecioHistorico(
        fecha,
        new Estacion(
            provincia,
            "Madrid",
            "Calle A",
            precioGasoleoA,
            precioGasolina95E5
        )
    );
}
