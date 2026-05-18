import { Estacion } from "../models/estacion";

type ObtenerPrecio = (estacion: Estacion) => number | null;
type OrdenPrecio = "asc" | "desc";

export class EstadisticasService {
  public calcularMediaGasoleoA(
    estaciones: Estacion[]
  ): number {
    const estacionesValidas = estaciones.filter(
      (e) => e.precioGasoleoA !== null
    );

    const suma = estacionesValidas.reduce(
      (total, estacion) =>
        total + (estacion.precioGasoleoA || 0),
      0
    );

    return suma / estacionesValidas.length;
  }

  public calcularMediaGasolina95(
    estaciones: Estacion[]
  ): number {
    const estacionesValidas = estaciones.filter(
      (e) => e.precioGasolina95E5 !== null
    );

    const suma = estacionesValidas.reduce(
      (total, estacion) =>
        total + (estacion.precioGasolina95E5 || 0),
      0
    );

    return suma / estacionesValidas.length;
  }

  public obtenerTop5GasoleoMasBaratas(
    estaciones: Estacion[]
  ): Estacion[] {
    return this.obtenerTop5PorPrecio(
      estaciones,
      (estacion) => estacion.precioGasoleoA,
      "asc"
    );
  }

  public obtenerTop5GasoleoMasCaras(
    estaciones: Estacion[]
  ): Estacion[] {
    return this.obtenerTop5PorPrecio(
      estaciones,
      (estacion) => estacion.precioGasoleoA,
      "desc"
    );
  }

  public obtenerTop5GasolinaMasBaratas(
    estaciones: Estacion[]
  ): Estacion[] {
    return this.obtenerTop5PorPrecio(
      estaciones,
      (estacion) => estacion.precioGasolina95E5,
      "asc"
    );
  }

  public obtenerTop5GasolinaMasCaras(
    estaciones: Estacion[]
  ): Estacion[] {
    return this.obtenerTop5PorPrecio(
      estaciones,
      (estacion) => estacion.precioGasolina95E5,
      "desc"
    );
  }

  private obtenerTop5PorPrecio(
    estaciones: Estacion[],
    obtenerPrecio: ObtenerPrecio,
    orden: OrdenPrecio
  ): Estacion[] {
    const estacionesSinDuplicados =
      this.eliminarDuplicadosPorPrecio(
        estaciones,
        obtenerPrecio
      );

    return estacionesSinDuplicados
      .sort((a, b) => {
        const precioA = obtenerPrecio(a) as number;
        const precioB = obtenerPrecio(b) as number;

        return orden === "asc"
          ? precioA - precioB
          : precioB - precioA;
      })
      .slice(0, 5);
  }

  private eliminarDuplicadosPorPrecio(
    estaciones: Estacion[],
    obtenerPrecio: ObtenerPrecio
  ): Estacion[] {
    const clavesEncontradas = new Set<string>();

    return estaciones.filter((estacion) => {
      const precio = obtenerPrecio(estacion);

      if (precio === null) {
        return false;
      }

      const clave = this.crearClaveEstacion(
        estacion,
        precio
      );

      if (clavesEncontradas.has(clave)) {
        return false;
      }

      clavesEncontradas.add(clave);
      return true;
    });
  }

  private crearClaveEstacion(
    estacion: Estacion,
    precio: number
  ): string {
    return [
      estacion.provincia,
      estacion.municipio,
      estacion.direccion,
      precio.toFixed(3),
    ].join("|");
  }
}
