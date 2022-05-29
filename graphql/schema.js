import { makeSchema } from 'nexus';
import { join } from 'path';
import * as types from './types';

export const schema = makeSchema({
  types,
  outputs: {
    typegen: join(
      process.cwd(),
      'node_modules',
      '@types',
      'nexus-typegen',
      'index.d.js'
    ),
    schema: join(process.cwd(), 'graphql', 'schema.graphql'), //this will be the location of the file
  },
  contextType: {
    export: 'Context',
    module: join(process.cwd(), 'graphql', 'context.js'),
  },
});

//This schema was before Nexus

// import { gql } from "apollo-server-micro";

// export const typeDefs = gql`
//   type Book {
//     bookId: String
//     cover: String
//     title: String
//     category: String
//     content: String
//     description: String
//     totalPages: Int
//     year: Int
//     users: [String]
//   }

//   # Entry point for the graphql api
//   type Query {
//     books: [Book]!
//   }

//   #TODO: type Mutations
// `;
