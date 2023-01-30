const functions = require("firebase-functions");
const express = require("express");
const app = express();
const admin = require("firebase-admin");
const LRU = require('lru-cache');
const quizCache = new LRU({max: 200, ttl:31536000});
const cors = require("cors")
const creds = require('./creds.json')

app.use(cors({origin: ["https://quizapp-nine-xi.vercel.app"]}))


if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(creds)
   })
}


app.get('/', (req,res) => {
    res.status(200).send("Server is running succesfully")
})



app.get('/english', async (req,res) => {
    const data = quizCache.get('english');
    if (data) {
        return res.status(200).json(data);
    }

    const db = admin.firestore();
    const snapshot = await db.collection("english").get()
    const quiz = snapshot.docs?.map((doc) => doc?.data())

    quizCache.set('english', quiz);

    res.status(200).json(quiz)
});




app.get('/math', async (req,res) => {
    const data = quizCache.get('math');
    if (data) {
        return res.status(200).json(data);
    }

    const db = admin.firestore();
    const snapshot = await db.collection("math").get()
    const quiz = snapshot.docs?.map((doc) => doc?.data())

    quizCache.set('math', quiz);

    res.status(200).json(quiz)
});


app.get('/science', async (req,res) => {
    const data = quizCache.get('science');
    if (data) {
        return res.status(200).json(data);
    }

    const db = admin.firestore();
    const snapshot = await db.collection("science").get()
    const quiz = snapshot.docs?.map((doc) => doc?.data())

    quizCache.set('science', quiz);

    res.status(200).json(quiz)
});

exports.expressApi = functions.https.onRequest(app);
