import type { FastifyInstance } from "fastify";
import {
	getUsersSchema,
	getUserByIdSchema,
	postUserSchema,
	putUserSchema,
	deleteUserSchema,
	fullSchema,
} from "./schema";
import {
    getUsersHandler,
    getUserByIdHandler,
    postUserHandler,
    putUserHandler,
    deleteUserHandler,
} from "./handler"


export default async (app: FastifyInstance) => {

	app.addSchema(fullSchema);

	app.get('/', { schema: getUsersSchema }, getUsersHandler)
	app.get('/:userId', { schema: getUserByIdSchema }, getUserByIdHandler)
	app.post('/', { schema: postUserSchema }, postUserHandler)
    app.put('/userId', { schema: putUserSchema }, putUserHandler)
    app.delete('/userId', { schema: deleteUserSchema }, deleteUserHandler)

};





