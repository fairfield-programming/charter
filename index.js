require('dotenv').config()

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const { sequelize } = require('./server/models')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000

async function bootstrap() {

    try {

        await sequelize.sync({ force: false });

        console.log("Connection created successfully.");

    } catch (error) {

        console.error("Unable to connect to database: " + error);

    } 

    const app = next({ dev, hostname, port })
    const handle = app.getRequestHandler()

    app.prepare().then(() => {
    createServer(async (req, res) => {

        try {

            const parsedUrl = parse(req.url, true)
            await handle(req, res, parsedUrl)

        } catch (err) {

            console.error('Error occurred handling', req.url, err)
            res.statusCode = 500
            res.end('internal server error')

        }

    })
        .once('error', (err) => {
            console.error(err)
            process.exit(1)
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`)
        })
    })

}

bootstrap();