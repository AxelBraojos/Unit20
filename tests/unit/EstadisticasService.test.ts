import { describe, expect, test } from "@jest/globals";
import { Estacion } from "../../src/models/estacion";
import { EstadisticasService } from "../../src/services/EstadisticasService";

describe("EstadisticasService rankings", () => {
    const estadisticasService = new EstadisticasService();

    test("calcula la media de Gasoleo A ignorando valores null", () => {
        // arrange
        const estaciones = [
            new Estacion("Madrid", "Madrid", "Calle A", 1.40, 1.50),
            new Estacion("Madrid", "Getafe", "Calle B", null, 1.60),
            new Estacion("Badajoz", "Merida", "Calle C", 1.60, 1.70),
        ];

        // Act
        const resultado =
            estadisticasService.calcularMediaGasoleoA(
                estaciones
            );

        // Assert
        expect(resultado).toBe(1.50);
    });

    test("devuelve las estaciones con Gasoleo A mas barato ordenadas ascendentemente", () => {
        // Arrange
        const estaciones = crearEstacionesParaRanking();

        // Act
        const resultado =
            estadisticasService.obtenerTop5GasoleoMasBaratas(
                estaciones
            );

        // Assert
        expect(
            resultado.map((estacion) => estacion.precioGasoleoA)
        ).toEqual([1.20, 1.30, 1.40, 1.50, 1.60]);
    });

    test("devuelve las estaciones con Gasoleo A mas caro ordenadas descendentemente", () => {
        // Arrange
        const estaciones = crearEstacionesParaRanking();

        // Act
        const resultado =
            estadisticasService.obtenerTop5GasoleoMasCaras(
                estaciones
            );

        // Assert
        expect(
            resultado.map((estacion) => estacion.precioGasoleoA)
        ).toEqual([1.70, 1.60, 1.50, 1.40, 1.30]);
    });

    test("ignora precios null al calcular el top de Gasolina 95 E5", () => {
        // Arrange
        const estaciones = [
            new Estacion("Madrid", "Madrid", "Calle A", 1.40, null),
            new Estacion("Madrid", "Getafe", "Calle B", 1.50, 1.30),
            new Estacion("Badajoz", "Merida", "Calle C", 1.60, 1.20),
        ];

        // Act
        const resultado =
            estadisticasService.obtenerTop5GasolinaMasBaratas(
                estaciones
            );

        // Assert
        expect(resultado).toHaveLength(2);
        expect(
            resultado.map((estacion) => estacion.precioGasolina95E5)
        ).toEqual([1.20, 1.30]);
    });

    test("limita el ranking a un maximo de 5 resultados", () => {
        // Arrange
        const estaciones = crearEstacionesParaRanking();

        // Act
        const resultado =
            estadisticasService.obtenerTop5GasolinaMasCaras(
                estaciones
            );

        // Assert
        expect(resultado).toHaveLength(5);
    });

    test("elimina estaciones duplicadas usando provincia, municipio, direccion y precio", () => {
        // Arrange
        const estaciones = [
            new Estacion("Madrid", "Madrid", "Calle A", 1.20, 1.50),
            new Estacion("Madrid", "Madrid", "Calle A", 1.20, 1.60),
            new Estacion("Madrid", "Madrid", "Calle B", 1.30, 1.70),
            new Estacion("Madrid", "Madrid", "Calle C", 1.40, 1.80),
        ];

        // Act
        const resultado =
            estadisticasService.obtenerTop5GasoleoMasBaratas(
                estaciones
            );

        // Assert
        expect(resultado).toHaveLength(3);
        expect(
            resultado.map((estacion) => estacion.direccion)
        ).toEqual(["Calle A", "Calle B", "Calle C"]);
    });
});

function crearEstacionesParaRanking(): Estacion[] {
    return [
        new Estacion("Madrid", "Madrid", "Calle A", null, 1.60),
        new Estacion("Madrid", "Alcobendas", "Calle B", 1.20, null),
        new Estacion("Badajoz", "Merida", "Calle C", 1.30, 1.40),
        new Estacion("Coruna", "Arteixo", "Calle D", 1.40, 1.70),
        new Estacion("Madrid", "Getafe", "Calle E", 1.50, 1.30),
        new Estacion("Badajoz", "Zafra", "Calle F", 1.60, 1.90),
        new Estacion("Madrid", "Leganes", "Calle G", 1.70, 1.20),
    ];
}
