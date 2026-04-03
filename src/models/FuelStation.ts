// src/models/EstacionDeCombustible.ts

export interface EstacionDeCombustible {
    id: string;
    nombre: string;
    provincia: string;
    idProvincia: string;
    municipio: string;
    direccion: string;
    horario: string;
    precioGasoilA: number | null;
    precioGasolina95E5: number | null;
    latitud: number;
    longitud: number;
}

