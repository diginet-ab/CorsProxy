import * as express from "express";
/**
 * TypeScript class implementing a proxy server with CORS providing GET and POST access to servers without CORS.
 */
export declare class CorsProxy {
    host: string;
    port: number;
    private log?;
    app: express.Express;
    /**
     * Constructor
     * @param host The interface (IP) to host the server
     * @param port Server port
     * @param log Optional log function with a string argument
     */
    constructor(host: string, port: number, log?: ((message: string) => void) | undefined);
    catchExceptions: (fn: any) => (req: any, res: any, next: any) => void;
}
