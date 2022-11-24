import { type RouteHandler } from 'fastify'
import type { NotFound, Params, Querystring, BodyCreate, Body, Reply, ReplyList } from './schema'
import { USER_ROUTE } from "../constants";

const route = USER_ROUTE;

export const getUsersHandler: RouteHandler<{
    Querystring: Querystring
    Reply: ReplyList
}> = async function (req, reply) {

    const records = await req.server.prisma.account.findMany({});

    reply.code(200).send({ success: true, message: `${route} list`, users: records })

}

export const getUserByIdHandler: RouteHandler<{
    Params: Params
    Reply: Reply | NotFound | any
}> = async function (req, reply) {
    
    const {userId} = req.params;
    const record = await req.server.prisma.account.findUnique({
        where: {
            id: userId
        }
    });

    if (record) {
        const {createAt,...user} = record;
        reply.code(200).send({ success: true, message: `${route} found`, user: {createAt, ...user} })
    } else {
        reply.code(404).send({ success: true, message: `${route} not found` })
    }
}

export const postUserHandler: RouteHandler<{
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

export const putUserHandler: RouteHandler<{
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

export const deleteUserHandler: RouteHandler<{
    Params: Params
    Reply: Reply | NotFound
}> = async function (req, reply) {

    if (true) {
        reply.code(204).send({ success: true, message: `${route} deleted` })
    } else {
        reply.code(404).send({ success: true, message: `${route} not found` })
    }
}