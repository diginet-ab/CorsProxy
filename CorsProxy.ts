import * as express from "express"
import * as parser from "body-parser"
import * as request from "request"

export class CorsProxy {
    public app: express.Express
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
            res.send(JSON.stringify({ hello: "world"}))
        })
        this.app.post("/proxyGet", async (req, res, next) => {
            if (log)
                log("PROXY GET: " + req.body.url)
            request(req.body.url, (error, response, body) => {
                if (!error) {
                    res.send(body)
                    if (log)
                        log(body)
                } else {
                    res.setHeader("Status", 400)
                    res.sendStatus(400)
                }
            })
        })
        this.app.post("/proxyPost", async (req, res, next) => {
            if (log)
                log("PROXY GET: " + req.body.url)
            request.post(req.body.url, { json: req.body.data }, (error, response, body) => {
                if (log)
                    log(body)
                res.send(body.toString())
            })
        })
        this.app.listen(this.port, this.host, () => {
            if (log) 
                log(`CORS PROXY listening on ${ this.host }:${ this.port }`)
        })
    }
}
