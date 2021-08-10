// Middleware for parsing request bodies
const express = require('express')
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const port = 8000;


// Initializing Firebase with the admin SDK
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountTemplatesKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// GET api for retrieving the preset resume templates on Firebase
app.get("/Templates", async (req, res) => {

    try {
        let collection = req.body.collection
        let document = req.body.document

        let templates = []

        let snapShot = await db.collection("Templates").doc(`${document}`).collection(`${collection}`).get()

        snapShot.forEach(doc => {

            let id = doc.id
            let data = doc.data()
            templates.push({ id, ...data })

        })

        res.status(200).send(JSON.stringify(templates));
    }
    catch (error) {
        res.status(400).send("Bad Request")
    }
})

// Listening for api calls
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});



