export class ForbiddenError extends Error {
    constructor(message?: string) {
        super(message);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}