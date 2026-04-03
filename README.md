# Unit20
## Descripción
Programa en typeScript que lee un fichero JSON con precios de 
combustible del ministerio de transición ecológica y genera 
estructuras de datos para su análisis. El fichero ha sido importado de este link oficial: https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/

## Requisitos
Node.js 18 o mas
npm

## Instalación
npm install

## Uso
npx ts-node src/index.ts

## Testear
npm test


Test 1— debe convertir precios con separador decimal coma
Verifica que la función parsePrice convierte "1,759" (formato del Ministerio) a 1.759 (número JavaScript). Sin esto, todos los precios serían NaN.

Test 2 debe devolver null para precio vacío
Verifica que cuando una gasolinera no tiene precio informado (string vacío) y asi la función devuelve null en lugar de crashear.


Test 3 — debe parsear datos de combustible correctamente
Verifica que el proceso completo funciona: dado un objeto JSON bruto del ministerio, se transforma correctamente a la interfaz fuelstation con todos los campos bien mapeados.