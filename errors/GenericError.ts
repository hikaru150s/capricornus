export class GenericError extends Error {
    public status: number;

    constructor(message: string = 'Generic Failure', status: number = 500) {
        super(message);
        this.status = status;
    }
}
