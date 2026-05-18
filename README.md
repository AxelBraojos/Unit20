# Unit 20 AB

## Descripción del proyecto

Este proyecto ha sido desarrollado como parte del Assignment Brief de la Unit 20

La aplicación procesa información real publicada por el ministerio para la transición ecológica sobre los precios de combustibles en estaciones de servicio de España.El objetivo principal es analizar los precios de determinados combustibles en provincias concretas de interés para la empresa y generar un informe con información útil para el análisis de mercado.

Actualmente el proyecto permite:

- Leer y procesar ficheros JSON con datos reales de estaciones de servicio.
- Filtrar la información por provincias de interés.
- Analizar los precios de Gasóleo A y Gasolina 95 E5.
- Calcular precios medios.
- Obtener rankings de estaciones más caras y más baratas.
- Ejecutar tests unitarios automáticos.




# Tecnologías utilizadas

- TypeScript
- NodeJS
- Jest
- ts-jest
- Git 





## Descripción de carpetas

### src/config

Contiene la configuración general de la aplicación, como las provincias y combustibles de interés.

### src/errors

Incluye errores personalizados para el control de excepciones y validaciones.

### src/models

Contiene las clases modelo utilizadas para representar las estaciones de servicio y los datos procesados.

### src/services

Incluye toda la lógica principal de la aplicación:

- lectura de archivos JSON,
- parseo de datos
- filtrado
- cálculos estadísticos
- generación del informe

### tests

Contiene los tests unitarios del proyecto.


# Instalación del proyecto

## 1. Clonar el repositorio

git clone + url del repositorio


## 2. Entrar en la carpeta del proyecto


cd Unit-20-

## 3. Instalar dependencias


npm install




# Compilar el proyecto


npm run build


Este comando compila el código TypeScript y genera la carpeta `dist` con los archivos JavaScript.



# Ejecutar la aplicación


npm run start


La aplicación leerá el fichero JSON configurado y mostrará por consola:

- medias de precios,
- top 5 estaciones más baratas,
- top 5 estaciones más caras.


# Ejecutar los tests


npm test


Los tests verifican:

- cálculo de medias,
- rankings,
- filtrado de provincias,
- parseo de JSON,
- control de errores.



# Diseño de la aplicación

Cada clase tiene una responsabilidad concreta para facilitar:

- el mantenimiento
- la reutilización
- el testing
- y futuras ampliaciones

Algunas de las prácticas aplicadas durante el desarrollo han sido


- nombres descriptivo
- tests unitarios,
- reducción de código duplicado



# Datos utilizados

Los datos utilizados en la aplicación proceden del portal oficial del Ministerio para la transición ecológica:

https://geoportalgasolineras.es/

El proyecto utiliza información real sobre precios de combustibles en estaciones de servicio españolas.



