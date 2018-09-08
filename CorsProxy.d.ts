import * as express from "express";
export declare class CorsProxy {
    host: string;
    port: number;
    private log?;
    app: express.Express;
    constructor(host: string, port: number, log?: (message: string) => void);
}
