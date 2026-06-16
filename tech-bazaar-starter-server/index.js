const express = require("express");
const dontenv = require("dotenv");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { createRemoteJWKSet, jwtVerify } = require("jose-cjs");
dontenv.config();

const uri = process.env.MONGODB_URI;

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    credentials: true,
    origin: [process.env.NEXT_PUBLIC_CLIENT_URL],
  }),
);
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const JWKS = createRemoteJWKSet(
  new URL(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/auth/jwks`)
)

const verify = async (req,res,next) => {
  const header = req.headers.authorization
  if(!header){
    return res.status(401).json({message: "Unauthorized"})
  }
  const token = header.split(' ')[1]
  if(!token){
    return res.status(401).json({message: "Unauthorized"})
  }

  try{
    const { payload } = await jwtVerify(token, JWKS)
    console.log(payload)
    next()
  }
  catch(error){
    return res.status(401).json({message: "Forbidden"})
  }
}

async function run() {
  try {
    await client.connect();
    const db = client.db("tech-bazaar");
    const subcriptionCollection = db.collection('subscriptions')
    const userCollection = db.collection('user')
    const productsCollection = db.collection('products')


    app.post('/subscription', async(req,res) => {
      const {sessionId, priceId, userId} = req.body
      await subcriptionCollection.insertOne({
        sessionId,
        priceId,
        userId,
      })

      const isExist = await subcriptionCollection.findOne({sessionId})
      if(isExist){
        return res.json({message: 'Aready Exist'})
      }

      await userCollection.updateOne(
        {_id: new ObjectId(userId)},
        { $set: { plan: 'pro'}}
      )

      res.json({message: 'Payment Successfull'})

    })

    app.post('/seller/products',verify, async(req,res) => {
      const data = req.body
      const result = await productsCollection.insertOne(data)
      res.json(result)
    })
    

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } 
  finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is running fine!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
