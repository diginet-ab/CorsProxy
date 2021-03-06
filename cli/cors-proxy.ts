#!/usr/bin/env node
import { CorsProxy } from "../CorsProxy"
import * as parseArgs from "minimist"

const argv = parseArgs(process.argv)
if (argv.h || argv.v) {
    if (argv.h)
        console.log("cors-proxy -s <server-ip> -p <port>")
    else
        console.log("V1.1.3")
} else {
    let server: string = argv.s ? argv.s.trim() : "185.20.12.99"
    let port: number = argv.p ? parseInt((argv.p).trim()) : 80
    const corsProxy = new CorsProxy(server, port, console.log)
}
