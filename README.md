# Unit 20 AB

## Nota sobre el API del Ministerio

La ejecucion principal consulta directamente el API REST publico del Ministerio:

https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/

El analisis historico de las graficas tambien consulta el endpoint historico oficial del ultimo mes. Los ficheros de `data/` se mantienen como datos de apoyo para tests y ejemplos locales.

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
- Procesar información histórica de distintos días.
- Analizar la evolución de precios según el día de la semana.
- Generar gráficas de barras automáticamente en formato PNG.
- Generar análisis de mercado utilizando datos históricos.




# Tecnologías utilizadas

- TypeScript
- NodeJS
- Jest
- ts-jest
- Git 
- Chart.js
- chartjs-node-canvas





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
- análisis histórico de precios,
- agrupación por días de la semana,
- generación automática de gráficas de mercado.

### tests

Contiene los tests unitarios del proyecto.
### output

Contiene las gráficas generadas automáticamente por la aplicación en formato png


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
- gráficas de barras para Gasóleo A,
- gráficas de barras para Gasolina 95 E5,
- análisis de medias por día de la semana.


# Análisis histórico y gráficas

La aplicación permite procesar múltiples archivos JSON históricos para analizar cómo varían los precios de los combustibles a lo largo de la semana.

A partir de estos datos históricos se calculan medias de precios para cada día de la semana y se generan automáticamente gráficas de barras en formato PNG.

Las gráficas generadas se almacenan dentro de la carpeta output

Para poder realizar el análisis histórico del hito 3 se han utilizado varios archivos JSON organizados dentro de la carpeta data/historico

Cada archivo representa datos correspondientes a distintos días, permitiendo agrupar la información por día de la semana y calcular medias de precios históricas.

Actualmente algunos de estos archivos contienen datos iguales o muy similares, por lo que en determinados casos las medias calculadas para distintos días pueden coincidir. Esto no afecta al funcionamiento de la aplicación, ya que el objetivo principal es demostrar el procesamiento histórico de datos, el análisis  y la generación automática de gráficas.

# Ejecutar los tests


npm test

Los tests unitarios se utilizan para comprobar de forma automática que las partes más importantes de la aplicación funcionan correctamente de manera aislada.


los tests cubren aspectos como:

- cálculo de medias de precios,
- generación de rankings,
- filtrado de provincias,
- parseo de archivos JSON,
- control de errores,
- análisis histórico de precios,
- agrupación de datos por día de la semana.es.

Los tests se ejecutan utilizando Jest y siguen una estructura sencilla basada en Arrange, Act y Assert para mantener el código de testing más claro y fácil de entender.


# Integración continua

El proyecto utiliza GitHub Actions tal y como se ha pedido en las correcciones

Esta pipeline se ejecuta automáticamente en cada push y en cada pull request. Su objetivo es instalar las dependencias del proyecto, ejecutar los tests unitarios y compilar el código TypeScript.

De esta forma se valida de manera automática que los cambios realizados no rompen la funcionalidad principal del proyecto y que el código sigue compilando correctamente antes de integrarse en el repositorio.


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
- análisis desacoplado de la generación de gráficas



# Datos utilizados

Los datos utilizados en la aplicación proceden del portal oficial del Ministerio para la transición ecológica:

https://geoportalgasolineras.es/

El proyecto utiliza información real sobre precios de combustibles en estaciones de servicio españolas.


# Bibliografia
Paz, D. (2026) Unit 20: Applied Programming & Design Principles. Clases impartidas por el profesor Daniel Paz, MSMK University, curso 2025-2026.

Pearson Education (2026) Assignment Brief Unit 20: Applied Programming & Design Principles. MSMK University, curso 2025-2026.

Martin, R. C. (2009) Clean Code: A Handbook of Agile Software Craftsmanship. Upper Saddle River: Prentice Hall.

Gamma, E., Helm, R., Johnson, R. y Vlissides, J. (1994) Design Patterns: Elements of Reusable Object-Oriented Software. Addison-Wesley Professional.


Node.js (2026) Node.js Documentation. Disponible en: https://nodejs.org/ [Accedido el 18 de mayo de 2026].

TypeScript (2026) TypeScript Documentation. Disponible en: https://www.typescriptlang.org/ [Accedido el 18 de mayo de 2026].

Jest (2026) Jest Documentation. Disponible en: https://jestjs.io/ [Accedido el 18 de mayo de 2026].

Chart.js (2026) Chart.js Documentation. Disponible en: https://www.chartjs.org/ [Accedido el 18 de mayo de 2026].

chartjs-node-canvas (2026) chartjs-node-canvas Documentation. Disponible en: https://www.npmjs.com/package/chartjs-node-canvas [Accedido el 18 de mayo de 2026].

Ministerio para la Transición Ecológica y el Reto Demográfico (2026) Geoportal de Gasolineras. Disponible en: https://geoportalgasolineras.es/ [Accedido el 18 de mayo de 2026].
