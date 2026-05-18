export class InvalidJsonError extends Error {
    constructor(mensaje: string) {
        super(mensaje);
        this.name = "InvalidJsonError";
    }
}