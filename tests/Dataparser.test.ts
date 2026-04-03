import * as fs from 'fs';
import { AnalizadorDeDatosDeCombustible } from '../src/services/Parser.js';

describe('AnalizadorDeDatosDeCombustible', () => {
    it('debe convertir precios con separador decimal coma', () => {
        const parser = new AnalizadorDeDatosDeCombustible();
        const price = (parser as any).parsePrice('1,759');
        expect(price).toBe(1.759);
    });

    it('debe devolver null para precio vacío', () => {
        const parser = new AnalizadorDeDatosDeCombustible();
        const price = (parser as any).parsePrice('');
        expect(price).toBeNull();
    });

    it('debe parsear datos de combustible correctamente', () => {
        const parser = new AnalizadorDeDatosDeCombustible();
        const mockData = {
            ListaEESSPrecio: [
                {
                    IDEESS: '1',
                    Rótulo: 'Station 1',
                    Provincia: 'Province 1',
                    IDProvincia: '01',
                    Municipio: 'Municipality 1',
                    Dirección: 'Address 1',
                    Horario: '24H',
                    'Precio Gasoil A': '1,234',
                    'Precio Gasolina 95 E5': '1,567',
                    Latitud: '40,123',
                    'Longitud (WGS84)': '-3,456',
                },
            ],
        };

        const tempFile = `${process.cwd()}/tests/__temp_fuel_data.json`;
        fs.writeFileSync(tempFile, JSON.stringify(mockData), 'utf8');

        const estaciones = parser.parseFromFile(tempFile);
        fs.unlinkSync(tempFile);

        expect(estaciones.length).toBeGreaterThan(0);
        expect(estaciones[0]?.nombre).toBe('Station 1');
    });
});
