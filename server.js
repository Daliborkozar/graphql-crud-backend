const express = require("express");
require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const mongoose = require('mongoose')

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  //schema to be loaded before start

  await apolloServer.start();

  apolloServer.applyMiddleware({ app: app });
  //express middleware

  app.use((req, res) => {
    res.send("Hello apolloServer");
  });

  //connect db
  await mongoose.connect(process.env.DB)
  console.log('database connected')

  app.listen(4000, () => {
    return console.log("Server running on port 4000");
  });
}

startServer();
