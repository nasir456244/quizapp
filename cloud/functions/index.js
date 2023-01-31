const functions = require("firebase-functions");
const express = require("express");
const app = express();
const admin = require("firebase-admin");
const cors = require("cors")
const creds = require('./creds.json')

app.use(cors({origin: ["https://quizapp-nine-xi.vercel.app"]}))


if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(creds)
   })
}


const getCollection = async (type) => {
    const db = admin.firestore();
    const snapshot = await db.collection(type).get()
    const quiz = snapshot.docs?.map((doc) => doc?.data())
    return quiz
}

app.get('/', (req,res) => {
    res.status(200).send("Server is running succesfully")
})


app.get('/english', async (req,res) => {
    const quiz = await getCollection("english")
    res.status(200).json(quiz)
});


app.get('/math', async (req,res) => {
    const quiz = await getCollection("math")
    res.status(200).json(quiz)
});


app.get('/science', async (req,res) => {
    const quiz = await getCollection("science")
    res.status(200).json(quiz)
});

exports.expressApi = functions.https.onRequest(app);
