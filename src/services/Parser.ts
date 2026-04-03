// src/services/FuelDataParser.ts
import * as fs from 'fs';
import type { EstacionDeCombustible } from '../models/estacion.js';

export class AnalizadorDeDatosDeCombustible {

    parseFromFile(filePath: string): EstacionDeCombustible[] {
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const json = JSON.parse(rawData);
        return this.mapearEstaciones(json.ListaEESSPrecio);
    }

    private mapearEstaciones(rawStations: any[]): EstacionDeCombustible[] {
        return rawStations.map(raw => this.mapearEstacion(raw));
    }

    private mapearEstacion(raw: any): EstacionDeCombustible {
        return {
            id: raw['IDEESS'],
            nombre: raw['Rótulo'],
            provincia: raw['Provincia'],
            idProvincia: raw['IDProvincia'],
            municipio: raw['Municipio'],
            direccion: raw['Dirección'],
            horario: raw['Horario'],
            precioGasoilA: this.parsePrice(raw['Precio Gasoil A']),
            precioGasolina95E5: this.parsePrice(raw['Precio Gasolina 95 E5']),
            latitud: parseFloat(raw['Latitud'].replace(',', '.')),
            longitud: parseFloat(raw['Longitud (WGS84)'].replace(',', '.')),
        };
    }

    private parsePrice(value: string): number | null {
        if (!value || value.trim() === '') return null;
        return parseFloat(value.replace(',', '.'));
    }
}
