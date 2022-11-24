import type { FastifySchema } from "fastify";
import { FromSchema } from 'json-schema-to-ts';
import { CATEGORY_ROUTE } from "../constants";


const route = CATEGORY_ROUTE;


/**
 * Shared Schemas
 *
 */
export const createSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    type: { type: 'string' },
    iconId: { type: 'integer'},
    default: { type: 'boolean' },
  },
  required: ['name', 'type'],
} as const;

export const fullSchema = {
  $id: "category",
  type: "object",
  properties: {
    id: { type: "integer" },
    deleted: { type: "boolean" },
    ...{ ...createSchema.properties },
  },
  additionalProperties: false
} as const;


/**
 * Route Schemas
 * 
 */
export const notFoundSchema = {
  $id: 'categoryNotFound',
  type: 'object',
  required: ['success', 'message'],
  properties: {
    success: { type: 'boolean' },
    message: { type: 'string' },
  },
  additionalProperties: false
} as const

export const paramsSchema = {
  type: 'object',
  required: ['categoryId'],
  properties: {
    categoryId: { type: 'integer' }
  },
  additionalProperties: false
} as const

export const querystringSchema = {
  type: 'object',
  properties: {
    type: { type: 'string' },
    default: { type: 'boolean' },
    deleted: { type: "boolean" },
  },
  additionalProperties: false
} as const

export const replySchema = {
  type: 'object',
  properties: {
    success: { type: 'boolean' },
    message: { type: 'string' },
    category: { $ref: 'category#' }
  },
  additionalProperties: false
} as const

const replyListSchema = {
  type: 'object',
  properties: {
    success: { type: "boolean" },
    message: { type: "string" },
    categories: {
      type: 'array',
      categories: { $ref: 'category#' }
    }
  },
  additionalProperties: false
} as const


/**
 * Route Types
 * 
 */
export type NotFound = FromSchema<typeof notFoundSchema>;
export type Params = FromSchema<typeof paramsSchema>
export type Querystring = FromSchema<typeof querystringSchema>
export type BodyCreate = FromSchema<typeof createSchema>
export type Body = FromSchema<typeof fullSchema>
export type Reply = FromSchema<typeof replySchema, { references: [typeof fullSchema] }>
export type ReplyList = FromSchema<typeof replyListSchema, { references: [typeof fullSchema] }>

/** 
 * Route Options
 */

export const getCategoriesSchema: FastifySchema = {
  summary: `${route} list`,
  description: `${route} list`,
  tags: [route],
  querystring: querystringSchema,
  response: {
    200: replyListSchema,
  },
};

export const getCategoryByIdSchema: FastifySchema = {
  summary: `get ${route} by id`,
  description: `get ${route} by id`,
  tags: [route],
  params: paramsSchema,
  response: {
    200: replySchema,
    404: notFoundSchema,
  },
};

export const postCategorySchema: FastifySchema = {
  summary: `create ${route}`,
  description: `create ${route}`,
  tags: [route],
  body: createSchema,
  response: {
    201: replySchema,
    404: notFoundSchema,
  },
};

export const putCategorySchema: FastifySchema = {
  summary: `update ${route}`,
  description: `update ${route}`,
  tags: [route],
  params: paramsSchema,
  body: fullSchema,
  response: {
    201: replySchema,
    404: notFoundSchema,
  },
};

export const deleteCategorySchema: FastifySchema = {
  summary: `delete ${route}`,
  description: `delete ${route}`,
  tags: [route],
  params: paramsSchema,
  response: {
    204: replySchema,
    404: notFoundSchema,
  },
};

