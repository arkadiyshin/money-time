import type { FastifyInstance } from "fastify";
import {
	getCardsSchema,
	getCardByIdSchema,
	postCardSchema,
	putCardSchema,
	deleteCardSchema,
	fullSchema,
} from "./schema";
import {
    getCardsHandler,
    getCardByIdHandler,
    postCardHandler,
    putCardHandler,
    deleteCardHandler,
} from "./handler"


export default async (app: FastifyInstance) => {

	app.addSchema(fullSchema);

	app.get('/', { schema: getCardsSchema }, getCardsHandler)
	app.get('/:cardId', { schema: getCardByIdSchema }, getCardByIdHandler)
	app.post('/', { schema: postCardSchema }, postCardHandler)
    app.put('/:cardId', { schema: putCardSchema }, putCardHandler)
    app.delete('/:cardId', { schema: deleteCardSchema }, deleteCardHandler)

};





