export class ApiReadError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ApiReadError";
    }
}
