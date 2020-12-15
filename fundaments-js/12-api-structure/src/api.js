const hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongo')
const HeroSchema = require('./db/strategies/mongodb/schemas/herosSchema')
const HeroRoute = require('./routes/heroRoutes')

const app = new hapi.Server({
    port: 5000
})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = MongoDb.connect()
    const context = new Context(new MongoDb(connection, HeroSchema))
    app.route([
        ...mapRoutes(new HeroRoute(context), HeroRoute.methods())
    ])

    await app.start()
    console.log('Servidor rodando na porta', app.info.port);

    return app
}

module.exports = main()