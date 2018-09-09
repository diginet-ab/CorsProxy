import { CorsProxy } from "../CorsProxy"
import * as parseArgs from "minimist"

const argv = parseArgs(process.argv)
let ip: string = argv.ip ? argv.ip.trim() : "127.0.0.1"
let port: number = argv.p ? parseInt((argv.p).trim()) : 8787
const corsProxy = new CorsProxy(ip, port, console.log)
setTimeout(() => {

}, 100000)
