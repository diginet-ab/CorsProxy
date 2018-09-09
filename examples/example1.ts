import { CorsProxy } from "../CorsProxy"
import * as parseArgs from "minimist"

const argv = parseArgs(process.argv)
let host: string = argv.h ? argv.h.trim() : "127.0.0.1"
let port: number = argv.p ? parseInt((argv.p).trim()) : 8787
const corsProxy = new CorsProxy(host, port, console.log)
setTimeout(() => {

}, 100000)
