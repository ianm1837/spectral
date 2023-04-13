import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

// node dependencies
import path from 'path'

// db connection
import db from './config/connection.js'

// my own dependencies
import { typeDefs, resolvers } from './schemas/index.js'
// import { signToken } from './utils/auth.js'

// apollo dependencies
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import bodyParser from 'body-parser';
import cors from 'cors'

// apollo websocket deps
import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
// import { greaphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

// not sure what this is for yet
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

// create executable schema for websocket server
const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express()
const httpServer = createServer(app);

// create websocket server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

// save retturn value of useServer to close it later
const serverCleanup = useServer({ schema }, wsServer);

// setup apollo server
const server = new ApolloServer({
  schema,
  plugins: [
    // proper shutdown for http server
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // proper shutdown for websocket server
    {
      async serverWillStart() {
        return {
          async drainServer() {
            serverCleanup.dispose();
          },
        };
      },
    },
  ]
});

// start apollo server
await server.start();

// set cors options
const corsOptions = {
  origin: '*',
  credentials: true,
  optionsSuccessStatus: 200,
};

// set environment variables
const PORT = process.env.PORT
const env = process.env.NODE_ENV || 'development'

// setup middleware
app.use(
  '/',
  bodyParser.urlencoded({ extended: false }),
  cors(corsOptions),
  bodyParser.json(),
  expressMiddleware(server),
);

// serve up static assets if in production
if (env === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))
}  

// connect to db and start listening for requests
db.once('open', () => {
  httpServer.listen(PORT, () => {
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  })
})
