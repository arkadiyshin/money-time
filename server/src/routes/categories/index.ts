import type { FastifyInstance } from "fastify";
import {
	getCategoriesSchema,
	getCategoryByIdSchema,
	postCategorySchema,
	putCategorySchema,
	deleteCategorySchema,
	fullSchema,
} from "./schema";
import {
    getCategoriesHandler,
    getCategoryByIdHandler,
    postCategoryHandler,
    putCategoryHandler,
    deleteCategoryHandler,
} from "./handler"


export default async (app: FastifyInstance) => {

	app.addSchema(fullSchema);

	app.get('/', { schema: getCategoriesSchema }, getCategoriesHandler)
	app.get('/:categoryId', { schema: getCategoryByIdSchema }, getCategoryByIdHandler)
	app.post('/', { schema: postCategorySchema }, postCategoryHandler)
    app.put('/:categoryId', { schema: putCategorySchema }, putCategoryHandler)
    app.delete('/:categoryId', { schema: deleteCategorySchema }, deleteCategoryHandler)

};





