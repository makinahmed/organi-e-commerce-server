const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

require("dotenv").config();
const app = express();
const port = 5000;
app.use(cors())
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.m8c0v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("organi-shop-e-commerce");
    const featureCollection = database.collection("feature");
    const popularProductCollection = database.collection("popularProduct");
    const blogCollection = database.collection("blog");

    // GET Features

    app.get("/features", async (req, res) => {
      const cursor = featureCollection.find({});
      const features = await cursor.toArray();
      res.send(features);
    });
    // popular products
    app.get("/popularProduct", async (req, res) => {
      const cursor = popularProductCollection.find({});
      const features = await cursor.toArray();
      res.send(features);
    });
    
    // blog

    app.get("/blog", async (req, res) => {
      const cursor = blogCollection.find({});
      const features = await cursor.toArray();
      res.send(features);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running Organi E-commerce Shop");
});

app.listen(port, () => {
  console.log("Listening on the ", port);
});
