import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()


// node dependencies
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// db connection
// import db from './config/connection.js'

// my own dependencies
import { typeDefs, resolvers } from './schemas/index.js'
import authMiddleware from './utils/auth.js'

// apollo dependencies
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import bodyParser from 'body-parser';
import cors from 'cors'

// apollo websocket deps
import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { PubSub } from 'graphql-subscriptions'

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
const serverCleanup = useServer({ 
  schema,
  context: async (ctx, msg, args) => {
    return { ctx, msg, args }
  },
}, wsServer);

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
  origin: '*', // update to match the domain you will make the request from
  credentials: true,
  optionsSuccessStatus: 200,
};

// set environment variables
const PORT = process.env.PORT
const env = process.env.NODE_ENV || 'development'

// setup middleware
// serve up static assets if in production
if (env === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))
}  
app.use(
  '/',
  bodyParser.urlencoded({ extended: false }),
  cors(corsOptions),
  bodyParser.json(),
  expressMiddleware(server, {
    // context: ({ req, res }) => ({ req, res, authMiddleware, pubsub }),
    context: ({ req, res }) => { 
      const modifiedReq = authMiddleware(req)
      return {req: modifiedReq, res }
    },
  }),
);

// connect to db and start listening for requests

let db = mongoose.connection;

let httpServerStarted = false

db.on('connecting', () => console.log('connecting to MongoDB...'));
db.on('connected', () => {
  console.log('connected to MongoDB')

  try{
    if(!httpServerStarted){
      console.log("starting http server...")
      httpServer.listen(PORT, () => {
      httpServerStarted = true
      console.info('success!')
      console.info(`Use GraphQL at http://localhost:3001/graphql`);
    })}
  }
  catch(err){
    console.error("Error starting http server: ", err)
  }

});
db.on('disconnecting', () => console.log('disconnecting from MongoDB...'));
db.on('disconnected', () => console.log('disconnected from MongoDB'));
db.on('reconnected', () => console.log('reconnected to MongoDB'));
db.on('error', (err) => console.error('MongoDB connection error: ', err));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch(err => console.log("Mongo connection error: ", err));
