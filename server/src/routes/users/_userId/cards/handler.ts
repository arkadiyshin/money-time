import { type RouteHandler } from 'fastify'
import type { NotFound, Params, ParamsDef, Querystring, BodyCreate, Body, Reply, ReplyList } from './schema'
import { CARD_ROUTE } from "../../../constants";

const route = CARD_ROUTE;

export const getCardsHandler: RouteHandler<{
    Params: ParamsDef
    Querystring: Querystring
    Reply: ReplyList
}> = async function (req, reply) {

    const records = await req.server.prisma.bankAccount.findMany({});

    reply.code(200).send({ success: true, message: `${route} list`, cards: records })


}

export const getCardByIdHandler: RouteHandler<{
    Params: Params
    Reply: Reply | NotFound
}> = async function (req, reply) {


    const {cardId} = req.params;
    const record = await req.server.prisma.bankAccount.findUnique({
        where: {
            id: cardId
        }
    });
    
    if (record) {
        reply.code(200).send({ success: true, message: `${route} found`, card: record })
    } else {
        reply.code(404).send({ success: true, message: `${route} not found` })
    }

}

export const postCardHandler: RouteHandler<{
    Params: ParamsDef
    Body: BodyCreate
    Reply: Reply
}> = async function (req, reply) {

    if (true) {
        reply.code(201).send({ success: true, message: `${route} created` })
    } else {
        reply.code(404).send({ success: true, message: `${route} not created` })
    }
}

export const putCardHandler: RouteHandler<{
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

export const deleteCardHandler: RouteHandler<{
    Params: Params
    Reply: Reply | NotFound
}> = async function (req, reply) {

    if (true) {
        reply.code(204).send({ success: true, message: `${route} deleted` })
    } else {
        reply.code(404).send({ success: true, message: `${route} not found` })
    }
}