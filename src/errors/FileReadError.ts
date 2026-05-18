export class FileReadError extends Error {
    constructor(mensaje: string) {
        super(mensaje);
        this.name = "FileReadError";
    }
}
