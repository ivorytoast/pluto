// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

fastify.get('/', async (request, reply) => {
    return { pong: 'homepage' }
})

fastify.get('/ping', async (request, reply) => {
    return { pong: 'it worked!' }
})

// Run the server!
const start = async () => {
    try {
        await fastify.listen(3000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()