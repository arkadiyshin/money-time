import { type RouteHandler } from 'fastify'
import type { NotFound, Params, Querystring, BodyCreate, Body, Reply, ReplyList } from './schema'
import { CATEGORY_ROUTE } from "../constants";

const route = CATEGORY_ROUTE;

export const getCategoriesHandler: RouteHandler<{
    Querystring: Querystring
    Reply: ReplyList
}> = async function (req, reply) {

    reply.code(200).send({ success: true, message: `${route} list` })

}

export const getCategoryByIdHandler: RouteHandler<{
    Params: Params
    Reply: Reply | NotFound
}> = async function (req, reply) {


    if (true) {
        reply.code(200).send({ success: true, message: `${route} found` })
    } else {
        reply.code(404).send({ success: true, message: `${route} not found` })
    }
}

export const postCategoryHandler: RouteHandler<{
    Params: Params
    Body: BodyCreate
    Reply: Reply
}> = async function (req, reply) {

    if (true) {
        reply.code(201).send({ success: true, message: `${route} created` })
    } else {
        reply.code(404).send({ success: true, message: `${route} not created` })
    }
}

export const putCategoryHandler: RouteHandler<{
    Params: Params
    Body: Body
    Reply: Reply | NotFound
}> = async function (req, reply) {

    if (true) {
        reply.code(201).send({ success: true, message: `${route} updated` })
    } else {
        reply.code(404).send({ success: true, message: `${route} not found` })
    }
}

export const deleteCategoryHandler: RouteHandler<{
    Params: Params
    Reply: Reply | NotFound
}> = async function (req, reply) {

    if (true) {
        reply.code(204).send({ success: true, message: `${route} deleted` })
    } else {
        reply.code(404).send({ success: true, message: `${route} not found` })
    }
}