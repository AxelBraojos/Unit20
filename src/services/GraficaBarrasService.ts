import fs from "fs";
import path from "path";
import { DiaSemana, MediasPorDia } from "./AnalisisMercadoService";

const DIAS_ORDENADOS: DiaSemana[] = [
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
    "domingo",
];

export class GraficaBarrasService {
    public generarGrafica(
        titulo: string,
        mediasPorDia: MediasPorDia,
        rutaSalida: string
    ): void {
        // Crea la carpeta de salida antes de guardar la imagen SVG.
        fs.mkdirSync(path.dirname(rutaSalida), { recursive: true });
        fs.writeFileSync(
            rutaSalida,
            this.crearSvg(titulo, mediasPorDia),
            "utf-8"
        );
    }

    private crearSvg(
        titulo: string,
        mediasPorDia: MediasPorDia
    ): string {
        const ancho = 900;
        const alto = 520;
        const margenIzquierdo = 80;
        const margenInferior = 80;
        const margenSuperior = 70;
        const altoGrafica = alto - margenSuperior - margenInferior;
        const anchoGrafica = ancho - margenIzquierdo - 50;
        const anchoBarra = 62;
        const separacion = anchoGrafica / DIAS_ORDENADOS.length;
        const maximo = this.obtenerMaximo(mediasPorDia);

        // Genera una barra por cada dia, aunque no haya datos.
        const barras = DIAS_ORDENADOS.map((dia, indice) => {
            const valor = mediasPorDia[dia];
            const valorGrafico = valor ?? 0;
            const alturaBarra = maximo === 0
                ? 0
                : (valorGrafico / maximo) * altoGrafica;
            const x = margenIzquierdo +
                indice * separacion +
                (separacion - anchoBarra) / 2;
            const y = margenSuperior + altoGrafica - alturaBarra;

            return this.crearBarra(
                dia,
                valor,
                x,
                y,
                anchoBarra,
                alturaBarra,
                margenSuperior + altoGrafica
            );
        }).join("");

        return [
            `<svg xmlns="http://www.w3.org/2000/svg" width="${ancho}" height="${alto}" viewBox="0 0 ${ancho} ${alto}">`,
            `<rect width="100%" height="100%" fill="#f8fafc"/>`,
            `<text x="${ancho / 2}" y="38" text-anchor="middle" font-family="Arial" font-size="24" font-weight="700" fill="#111827">${titulo}</text>`,
            `<line x1="${margenIzquierdo}" y1="${margenSuperior + altoGrafica}" x2="${ancho - 50}" y2="${margenSuperior + altoGrafica}" stroke="#374151" stroke-width="2"/>`,
            `<line x1="${margenIzquierdo}" y1="${margenSuperior}" x2="${margenIzquierdo}" y2="${margenSuperior + altoGrafica}" stroke="#374151" stroke-width="2"/>`,
            barras,
            "</svg>",
        ].join("");
    }

    private crearBarra(
        dia: DiaSemana,
        valor: number | undefined,
        x: number,
        y: number,
        ancho: number,
        alto: number,
        base: number
    ): string {
        return [
            `<rect x="${x}" y="${y}" width="${ancho}" height="${alto}" fill="#2563eb"/>`,
            `<text x="${x + ancho / 2}" y="${y - 8}" text-anchor="middle" font-family="Arial" font-size="14" fill="#111827">${this.formatearValor(valor)}</text>`,
            `<text x="${x + ancho / 2}" y="${base + 28}" text-anchor="middle" font-family="Arial" font-size="13" fill="#374151">${dia}</text>`,
        ].join("");
    }

    private formatearValor(valor: number | undefined): string {
        return valor === undefined ? "sin datos" : valor.toFixed(3);
    }

    private obtenerMaximo(mediasPorDia: MediasPorDia): number {
        const valores = Object.values(mediasPorDia);

        if (valores.length === 0) {
            return 0;
        }

        return Math.max(...valores);
    }
}
