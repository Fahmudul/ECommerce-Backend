const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
// middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://jobtask-bb93c.web.app",
      "https://jobtask-bb93c.firebaseapp.com",
    ],
    credentials: true,
  })
);
app.use(express.json());

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.nkzn5jr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    const Database = client.db("ECommerce");
    const productsCollection = Database.collection("AllProduct");
    app.get("/allproduct", async (req, res) => {
      const limit = parseInt(req.query.limit);
      const category = req.query.category;
      if (category) {
        const allProduct = await productsCollection
          .find({ category: category })
          .toArray();
        res.send(allProduct);
      }
      if (limit) {
        const allProduct = await productsCollection
          .find()
          .limit(limit)
          .toArray();
        res.send(allProduct);
      }
    });
    // Searched product api
    app.get("/products", async (req, res) => {
      const searchText = req.query.search.toLowerCase();
      const result = await productsCollection
        .find({
          category: { $regex: searchText, $options: "i" },
        })
        .toArray();
      res.send(result);
    });
    // Filter product api
    app.post("/filteredproducts", async (req, res) => {
      const filter = req.body;
      const skip = parseInt(req.query.skip);
      const limit = parseInt(req.query.limit);
      // console.log(skip, limit);
      // console.log(filter);
      const { brand, category, price } = filter;
      console.log(brand, category, price);
      // For brand, category and price
      if (brand.length > 0 && category.length > 0 && price.length > 0) {
        console.log(brand, category, price);
        console.log("from line 75");
        const result = await productsCollection
          .find({
            $and: [
              {
                $or: brand.map((b) => ({
                  productName: { $regex: b, $options: "i" },
                })),
              },
              {
                $or: category.map((c) => ({
                  category: { $regex: c, $options: "i" },
                })),
              },
              {
                price: { $gt: price[0], $lte: price[1] },
              },
            ],
          })
          .skip((skip - 1) * limit)
          .limit(limit)
          .toArray();
        // console.log("from line 85", result);
        const productArrayLength = result.length;
        res.send({ result, productArrayLength });
      } else if (
        brand.length > 0 ||
        category.length > 0 ||
        (price[0] >= 150 && price[1] <= 5000)
      ) {
        // / const productArrayLength = await productsCollection.countDocuments();
        console.log("from line 106");
        const query = {
          $or: [
            ...brand.map((b) => ({
              productName: { $regex: b, $options: "i" },
            })),
            ...category.map((c) => ({
              category: { $regex: c, $options: "i" },
            })),
            { price: { $gt: price[0], $lte: price[1] } },
          ],
        };
        const result = await productsCollection.find(query);
        const productArrayWithLimit = await result
          .skip((skip - 1) * limit)
          .limit(limit)
          .toArray();
        // console.log("from line 123", productArray);
        const productArray = await productsCollection.find(query).toArray();
        console.log("from line 125", productArray.length);
        res.send({
          result: productArrayWithLimit,
          productArrayLength: productArray.length,
        });
      } else if (brand.length > 0 && category.length > 0) {
        // For brand and category
        console.log("from line 102");
        const result = await productsCollection
          .find({
            $and: [
              {
                $or: brand.map((b) => ({
                  productName: { $regex: b, $options: "i" },
                })),
              },
              {
                $or: category.map((c) => ({
                  category: { $regex: c, $options: "i" },
                })),
              },
            ],
          })
          .skip((skip - 1) * limit)
          .limit(limit)
          .toArray();
        const productArrayLength = result.length;
        res.send({ result, productArrayLength });
      } else if (brand.length > 0 && price.length > 0) {
        // For brand and price
        console.log("from line 125");
        const result = await productsCollection
          .find({
            $and: [
              {
                $or: brand.map((b) => ({
                  productName: { $regex: b, $options: "i" },
                })),
              },
              {
                price: { $gt: price[0], $lt: price[1] },
              },
            ],
          })
          .skip((skip - 1) * limit)
          .limit(limit)
          .toArray();
        const productArrayLength = result.length;
        res.send({ result, productArrayLength });
      } else if (category.length > 0 && price.length > 0) {
        // For category and price
        console.log("from line 146");
        const result = await productsCollection
          .find({
            $and: [
              {
                $or: category.map((c) => ({
                  category: { $regex: c, $options: "i" },
                })),
              },
              {
                price: { $gt: price[0], $lt: price[1] },
              },
            ],
          })
          .skip((skip - 1) * limit)
          .limit(limit)
          .toArray();
        const productArrayLength = result.length;
        res.send({ result, productArrayLength });
      } else if (price[0] == 0 && price[1] == 90) {
        console.log("from line 194 ");
        const productArrayLength = await productsCollection.countDocuments();
        const result = await productsCollection
          .find()
          .skip((skip - 1) * limit)
          .limit(limit)
          .toArray();
        res.send({ result, productArrayLength });
      }
    });

    // Search by id
    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { id: parseInt(id) };
      const result = await productsCollection.findOne(query);
      res.send(result);
    });
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
