const express = require('express')
const path = require('path')
const db = require('.config/connection')
const routes = require('./routes')
const { typeDefs, resolvers } = require('./schemas')
require('dotenv').config()

const PORT = process.env.PORT

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer(typeDefs, resolvers);