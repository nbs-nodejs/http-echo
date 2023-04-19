const express = require("express"),
    cors = require("cors"),
    config = require("./config");

function main() {
    // Init server
    const app = express();
    // Init middlewares
    app.use(express.raw({verify: rawBodySaver, type: '*/*'}));
    // Set-up cors
    if (config.CORS_ORIGIN) {
        const corsMiddleware = cors({
            origin: config.CORS_ORIGIN,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        })
        app.use(corsMiddleware)
        app.options('*', corsMiddleware)
        console.log(`  > http-echo: CORS Enabled. Origin=${config.CORS_ORIGIN}`)
    }

    const composeHeaders = (rawHeader) => {
        const header = {};
        for (let i = 0; i < rawHeader.length; i += 2) {
            header[rawHeader[i]] = rawHeader[i + 1];
        }
        return header;
    }

    /**
     * Compose result by extracting raw Request
     * @param {Request} req
     * @return {Object}
     */
    const composeResult = (req) => {
        // Compose body result
        let body = null;
        switch (req.method) {
            case "POST":
            case "PUT":
            case "PATCH":
            case "DELETE": {
                body = req.body.toString()
            }
        }

        return {
            httpVersion: req.httpVersion,
            method: req.method,
            path: req.path,
            header: composeHeaders(req.rawHeaders),
            query: req.query,
            body,
        }
    }

    app.get(/(.*)/, (req, res) => {
        res.json(composeResult(req))
    })
    app.post(/(.*)/, (req, res) => {
        res.json(composeResult(req))
    })
    app.put(/(.*)/, (req, res) => {
        res.json(composeResult(req))
    })
    app.patch(/(.*)/, (req, res) => {
        res.json(composeResult(req))
    })
    app.delete(/(.*)/, (req, res) => {
        res.json(composeResult(req))
    })
    app.options(/(.*)/, (req, res) => {
        res.json(composeResult(req))
    })

    app.listen(config.PORT, () => {
        console.log(`  > http-echo: Serving on http://localhost:${config.PORT}`);
    })
}

/**
 *
 * @param req
 * @param res
 * @param {Buffer} buf
 * @param {"utf8"} encoding
 */
const rawBodySaver = (req, res, buf, encoding) => {
    if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || 'utf8');
    }
}

main();