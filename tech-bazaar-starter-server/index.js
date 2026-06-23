const express = require("express");
const dontenv = require("dotenv");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { createRemoteJWKSet, jwtVerify } = require("jose-cjs");
dontenv.config();

const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "umayer@gmail.com",
    pass: "*******"
  }
})

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
    // console.log(payload)
    req.user = payload
    next()
  }
  catch(error){
    return res.status(403).json({message: "Forbidden"})
  }
}

const sellerVerify = async (req,res,next) => {
  const user = req.user
  if(user?.role !== 'seller' || user?.plan !== 'pro'){
    return res.status(403).json({message: "Forbidden"})
  }
  // console.log(user)
  next()
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

    app.post('/seller/products',verify,sellerVerify, async(req,res) => {
      const data = req.body
      const result = await productsCollection.insertOne({...data, userId: req.user.id})
      res.json(result)
    })

    // app.get('/seller/products',verify,sellerVerify, async(req,res) => {

    //   const {page=1, limit=10} = req.query
    //   const skip = (Number(page)-1) * Number(limit)

    //   const result = await productsCollection.find({userId: req.user.id}).skip(skip).limit(Number(limit)).toArray()
    //   res.json(result)
    // })

    app.get('/seller/products', verify, sellerVerify, async (req, res) => {

        const { page = 1, limit = 10 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const query = { userId: req.user.id };
        const total = await productsCollection.countDocuments(query);
        const result = await productsCollection.find(query).skip(skip).limit(Number(limit)).toArray();

        res.json({data: result,total,page: Number(page),totalPages: Math.ceil(total/Number(limit)),
        });
    });

    app.get('/products', async(req,res) => {
      const {search} = req.query
      // console.log(search)
      let cursor;
      if(!search){
        cursor = await productsCollection.find()
      }
      else{
        cursor = await productsCollection.find({
          $or:[
            {
              title:{
                $regex: search,
                $options: 'i'
              }
            },
            {
              description:{
                $regex: search,
                $options: 'i'
              }
            },
          ]
        })
      }
      const result = await cursor.toArray()
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

app.post('/api/send-email', async(req,res) => {
  const {name,email} = req.query
  console.log(name, email)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
