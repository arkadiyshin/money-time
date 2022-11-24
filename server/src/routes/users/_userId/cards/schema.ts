import type { FastifySchema } from "fastify";
import { FromSchema } from 'json-schema-to-ts';
import { CARD_ROUTE } from "../../../constants";


const route = CARD_ROUTE;


/**
 * Shared Schemas
 *
 */
export const createSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    type: { type: 'string' },
    expirationDate: { type: 'string', format: 'date'},
    currencyId: { type: 'integer' },
  },
  required: ['name', 'type', 'currencyId'],
} as const;

export const fullSchema = {
  $id: "card",
  type: "object",
  properties: {
    id: { type: "integer" },
    userId: { type: "integer" },
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
  $id: 'cardNotFound',
  type: 'object',
  required: ['success', 'message'],
  properties: {
    success: { type: 'boolean' },
    message: { type: 'string' },
  },
  additionalProperties: false
} as const

export const paramsDefSchema = {
  type: 'object',
  required: ['userId'],
  properties: {
    userId: { type: 'integer' },
  },
  additionalProperties: false
} as const

export const paramsSchema = {
  type: 'object',
  required: ['userId', 'cardId'],
  properties: {
    userId: { type: 'integer' },
    cardId: { type: 'integer' }
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
    card: { $ref: 'card#' }
  },
  additionalProperties: false
} as const

const replyListSchema = {
  type: 'object',
  properties: {
    success: { type: "boolean" },
    message: { type: "string" },
    cards: {
      type: 'array',
      cards: { $ref: 'card#' }
    }
  },
  additionalProperties: false
} as const


/**
 * Route Types
 * 
 */
export type NotFound = FromSchema<typeof notFoundSchema>;
export type ParamsDef = FromSchema<typeof paramsDefSchema>
export type Params = FromSchema<typeof paramsSchema>
export type Querystring = FromSchema<typeof querystringSchema>
export type BodyCreate = FromSchema<typeof createSchema>
export type Body = FromSchema<typeof fullSchema>
export type Reply = FromSchema<typeof replySchema, {
  references: [typeof fullSchema],
  deserialize: [
    {
      pattern: {
        type: "string";
        format: "date";
      };
      output: Date;
    },
    {
      pattern: {
        type: "string";
        format: "date-time";
      };
      output: Date;
    }
  ]; }>

export type ReplyList = FromSchema<typeof replyListSchema, { references: [typeof fullSchema],
  deserialize: [
    {
      pattern: {
        type: "string";
        format: "date";
      };
      output: Date;
    },
    {
      pattern: {
        type: "string";
        format: "date-time";
      };
      output: Date;
    }
  ]; }>

/** 
 * Route Options
 */

export const getCardsSchema: FastifySchema = {
  summary: `${route} list`,
  description: `${route} list`,
  tags: [route],
  params: paramsDefSchema,
  querystring: querystringSchema,
  response: {
    200: replyListSchema,
  },
};

export const getCardByIdSchema: FastifySchema = {
  summary: `get ${route} by id`,
  description: `get ${route} by id`,
  tags: [route],
  params: paramsSchema,
  response: {
    200: replySchema,
    404: notFoundSchema,
  },
};

export const postCardSchema: FastifySchema = {
  summary: `create ${route}`,
  description: `create ${route}`,
  tags: [route],
  params: paramsDefSchema,
  body: createSchema,
  response: {
    201: replySchema,
    404: notFoundSchema,
  },
};

export const putCardSchema: FastifySchema = {
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

export const deleteCardSchema: FastifySchema = {
  summary: `delete ${route}`,
  description: `delete ${route}`,
  tags: [route],
  params: paramsSchema,
  response: {
    204: replySchema,
    404: notFoundSchema,
  },
};

