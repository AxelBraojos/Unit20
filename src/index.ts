// src/index.ts
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { AnalizadorDeDatosDeCombustible } from './services/Parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, '../data/fuel_prices.json');
const parser = new AnalizadorDeDatosDeCombustible();
const estaciones = parser.parseFromFile(filePath);

console.log(`Total de estaciones cargadas: ${estaciones.length}`);
console.log('Primera estación encontrada:', estaciones[0]);
