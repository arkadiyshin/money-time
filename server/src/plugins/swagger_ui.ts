import fp from 'fastify-plugin';
import swaggerUi, { FastifySwaggerUiOptions } from '@fastify/swagger-ui';


export default fp<FastifySwaggerUiOptions>(async (app) => {

    app.register(
        swaggerUi, <FastifySwaggerUiOptions>{
            uiConfig: {
                //docExpansion: 'full',
                deepLinking: false
            },
            hideUntagged: true,
            routePrefix: '/api',
            staticCSP: true,
        })

})