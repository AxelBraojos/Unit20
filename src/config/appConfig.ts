export const appConfig = {
  apiMinisterioUrl:
    "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/",

  apiMinisterioHistoricoUrl:
    "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestresHist/",

  diasHistorico: 30,

  rutaArchivo: "./data/preciosgasolina.json",

  rutaHistorico: "./data/historico",

  rutaGraficas: "./output/graficas",

  provinciasInteres: [
    "MADRID",
    "CORUÑA",
    "SANTA CRUZ DE TENERIFE",
    "BADAJOZ",
  ],

  combustiblesInteres: [
    "Precio Gasoleo A",
    "Precio Gasolina 95 E5",
  ],
};
