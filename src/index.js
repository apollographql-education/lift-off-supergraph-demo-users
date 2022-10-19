const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { buildSubgraphSchema } = require('@apollo/subgraph');

const gql = require('graphql-tag');
const { readFileSync } = require('fs');
const path = require('path');

const typeDefs = gql(readFileSync(path.resolve(__dirname, './schema.graphql'), { encoding: 'utf-8' }));
const resolvers = require('./resolvers');

async function startApolloServer() {
  const server = new ApolloServer({ schema: buildSubgraphSchema({ typeDefs, resolvers }) });

  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT || 4002 },
  });

  console.log(`
    🚀  Server is running
    📭  Query at ${url}
  `);
}

startApolloServer();
