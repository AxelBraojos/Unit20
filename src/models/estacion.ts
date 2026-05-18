export class Estacion {
    constructor(
        public provincia: string,
        public municipio: string,
        public direccion: string,
        public precioGasoleoA: number | null,
        public precioGasolina95E5: number | null
    ) { }
}