import type { FastifySchema } from "fastify";
import { FromSchema } from 'json-schema-to-ts';
import { USER_ROUTE } from "../constants";


const route = USER_ROUTE;


/**
 * Shared Schemas
 *
 */
export const createSchema = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    email: { type: 'string', format: 'email' },
    password: { type: 'string', format: 'password' },
  },
  required: ['username', 'email', 'password'],
} as const;

export const fullSchema = {
  $id: "user",
  type: "object",
  properties: {
    id: { type: "integer" },
    ...{ ...createSchema.properties },
    firstName: { type: "string" },
    lastName: { type: "string" },
    hashPassword: { type: "string" },
    createAt: { type: "string", format: "date" },
    deleted: { type: "boolean" },
  },
  additionalProperties: false
} as const;


/**
 * Route Schemas
 * 
 */
export const notFoundSchema = {
  $id: 'userNotFound',
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
  required: ['userId'],
  properties: {
    userId: { type: 'integer' }
  },
  additionalProperties: false
} as const

export const querystringSchema = {
  type: 'object',
  properties: {},
  additionalProperties: false
} as const

export const replySchema = {
  type: 'object',
  properties: {
    success: { type: 'boolean' },
    message: { type: 'string' },
    user: { $ref: 'user#' }
  },
  additionalProperties: false
} as const

const replyListSchema = {
  type: 'object',
  properties: {
    success: { type: "boolean" },
    message: { type: "string" },
    users: {
      type: 'array',
      users: { $ref: 'user#' }
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

export const getUsersSchema: FastifySchema = {
  summary: `${route} list`,
  description: `${route} list`,
  tags: [route],
  querystring: querystringSchema,
  response: {
    200: replyListSchema,
  },
};

export const getUserByIdSchema: FastifySchema = {
  summary: `get ${route} by id`,
  description: `get ${route} by id`,
  tags: [route],
  params: paramsSchema,
  response: {
    200: replySchema,
    404: notFoundSchema,
  },
};

export const postUserSchema: FastifySchema = {
  summary: `create ${route}`,
  description: `create ${route}`,
  tags: [route],
  params: paramsSchema,
  body: createSchema,
  response: {
    201: replySchema,
    404: notFoundSchema,
  },
};

export const putUserSchema: FastifySchema = {
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

export const deleteUserSchema: FastifySchema = {
  summary: `delete ${route}`,
  description: `delete ${route}`,
  tags: [route],
  params: paramsSchema,
  response: {
    204: replySchema,
    404: notFoundSchema,
  },
};

