export class SessionExpiredError extends Error {
    constructor(message) {
        super(message); // (1)
        this.name = "SessionExpiredError"; // (2)
    }
}