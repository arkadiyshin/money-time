import { type RouteHandler } from 'fastify'
import type { NotFound, Params, ParamsDef, Querystring, BodyCreate, Body, Reply, ReplyList } from './schema'
import { CATEGORY_ROUTE } from "../../../constants";

const route = CATEGORY_ROUTE;

export const getCategoriesHandler: RouteHandler<{
  Params: ParamsDef
  Querystring: Querystring
  Reply: ReplyList
}> = async function (req, reply) {

  const { userId } = req.params;
  const records = await req.server.prisma.userCategory.findMany({
    where: {
      accountId: userId
    }
  });

  reply.code(200).send({ success: true, message: `${route} list`, categories: records })


}

export const getCategoryByIdHandler: RouteHandler<{
  Params: Params
  Reply: Reply | NotFound
}> = async function (req, reply) {

  const { userId, categoryId } = req.params;

  const FK_UserCategory = {
    accountId: userId,
    categoryId: categoryId
  }
  
  const record = await req.server.prisma.userCategory.findUnique({
    where: { FK_UserCategory } 
  });

  if (record) {
    reply.code(200).send({ success: true, message: `${route} found`, category: record })
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