const express = require('express');
const cors = require('cors');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;
const { MongoClient, ServerApiVersion } = require('mongodb');
const { application } = require('express');

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cors());

//Database Connection

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rpx5h.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const database = client.db('tourMaster');
    const destinationCollection = database.collection('destinations');
    // const bookingCollection = database.collection('placeOrder');

    app.get('/allbookings', async (req, res) => {
      const cursor = destinationCollection.find({});
      const destinations = await cursor.toArray();
      res.send(destinations);
    });

    // insert new destination using POST api
    app.post('/allbookings', async (req, res) => {
      const destination = req.body;
      const result = await destinationCollection.insertOne(destination);
      res.json(result);
    });
  } finally {
    //  await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Tour planet Server is running');
});
app.listen(port, () => {
  console.log('listening port', port);
});
