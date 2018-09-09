import * as express from "express"
import * as parser from "body-parser"
import * as request from "request-promise-native"
import * as boom from "boom"

/**
 * TypeScript class implementing a proxy server with CORS providing GET and POST access to servers without CORS.
 */
export class CorsProxy {
    public app: express.Express
    /**
     * Constructor
     * @param host The interface (IP) to host the server
     * @param port Server port
     * @param log Optional log function with a string argument
     */
    constructor(public host: string, public port: number, private log?: (message: string) => void) {
        this.app = express()
        this.app.use(parser.json());
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
            next()
        })
        this.app.get("/", (req, res, next) => {
            res.send("CORS PROXY")
        })
        this.app.get("/get", this.catchExceptions(async (req, res, next) => {
            if (log)
                console.log("GET " + req.query.url)
            if (req.query.url) {
                let reply = await request(req.query.url)
                res.send(reply)
                if (log)
                    log(reply)
            }
            else
                throw boom.badRequest('missing query parameter: url')
        }))
        this.app.post("/post", this.catchExceptions(async (req, res, next) => {
            if (log)
                console.log("POST " + req.query.url)
            if (req.query.url) {
                let reply = await request.post({ url: req.query.url, json: req.body})
                res.send(reply.toString())
                if (log)
                    log(reply)
            } else
                throw boom.badRequest('missing query parameter: url')
        }))
        this.app.listen(this.port, this.host, () => {
            if (log)
                log(`CORS PROXY listening on ${this.host}:${this.port}`)
        })
    }
    catchExceptions = fn => (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((err) => {
            if (!err.isBoom) {
                return next(boom.badImplementation(err));
            }
            next(err);
        });
    };
}
