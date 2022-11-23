import fp from 'fastify-plugin';
import swagger, { FastifyDynamicSwaggerOptions } from '@fastify/swagger';


export default fp<FastifyDynamicSwaggerOptions>(async (app) => {
    app.register(
        swagger, <FastifyDynamicSwaggerOptions>{
            mode: 'dynamic',
            openapi: {
                info: {
                    title: 'Money-time',
                    description: 'Money-time API',
                    version: '1.0.0'
                },
                externalDocs: {
                    url: 'https://swagger.io',
                    description: 'Find more info here'
                },
                host: 'localhost',
                schemes: ['http'],
                consumes: ['application/json'],
                produces: ['application/json'],
                tags: [
                    { name: 'user', description: 'User related endpoints' },
                ],
            }
        });
})