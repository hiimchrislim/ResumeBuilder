"use strict";
const log = console.log();
// read the environment variable (will be 'production' in production mode)
// const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser"); // parse cookie header
const csrf = require("csurf");

const env = process.env.NODE_ENV
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";
const express = require("express");
// starting the express server
const app = express();
const port = process.env.PORT || 5000;
const path = require('path')

// const passport = require('passport');
const bodyParser = require("body-parser");
const cors = require('cors')

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false);

// User Schema
const { User } = require("./models/user");
const { ObjectID } = require('mongodb')

const { Template, Experience, Project, Achievement, Clubs, Hackathons } = require("./models/resumeTemplate")




// enable CORS if in development, for React local development server to connect to the web server.
// if (env !== 'production') { app.use(cors()) }




// body-parser: middleware for parsing HTTP JSON body into a usable object
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());







// function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
//     return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
// }


// // middleware for mongo connection error for routes that need it
const mongoChecker = (req, res, next) => {
    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        // log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    } else {
        next()
    }
}



/* Following part handles authentication 

=============== Backend for Authentication Starts =====================
*/

app.use(
    cors({
      origin: "http://localhost:3000", // allow to server to accept request from different origin
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    //   credentials: true // allow session cookie from browser to pass through
    })
  );

const admin = require("./firebase/index")
  

// Middleware to protect and authenticate routes
const verifyAuthentication = (req, res, next) => {

    const sessionCookie = req.cookies.session || '';
    // Verify the session cookie. In this case an additional check is added to detect
    // if the user's Firebase session was revoked, user deleted/disabled, etc.
    admin
        .auth()
        .verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((decodedClaims) => {
            console.log("----------");
            console.log(decodedClaims);
            if(decodedClaims){
                next();
            } else {
                res.redirect('http://localhost:3000/login');
            }
        })
        .catch((error) => {
        // Session cookie is unavailable or invalid. Force user to login.
        res.redirect('http://localhost:3000/login');
        });
}

// login end point
app.post("/api/login", async (req, res) => {
    const idToken = req.body.idToken;
    const email = req.body.email;
    const displayName = req.body.displayName;
    const expiresIn = 60 * 60 * 1000* 24; // session cookie expires in 1 day
    admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
        console.log("Successfully verified with G")
        const uid = decodedToken.uid;

        User.findOrCreate(uid, email, displayName).then((user) => {
            console.log(user);
            admin
            .auth()
            .createSessionCookie(idToken, { expiresIn })
            .then(
                (sessionCookie) => {
                    console.log("-----------");
                    const options = { maxAge: expiresIn, httpOnly: true };
                    res.cookie("session", sessionCookie, options);
                    res.end("Success");
                    console.log(req.cookies.session)
                },
                (error) => {
                    res.status(401).send("Unauthorized");
                }
            );
        })
    })
    .catch((error) => {
        // Handle error
        res.status(401).send("Unauthorized");
    });
});


  // logout endpoint
app.get("/api/logout", (req, res) => {
    res.clearCookie("session");
    res.redirect('/login');
  });
  

// =============== Backend for Authentication Ends =====================




/*
=============== API Requests =====================
*/


// POST 
app.post('/Template', async (req, res) => {

    console.log(req.params.userid)
    console.log(req.params);
    if (!req.body.userid) {
        res.status(401).send()
        return;
    }

    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    }

    let template = await makeTemplate(req)

    try {
        console.log("before");
        const final = await template.save()
        console.log("after");
        res.status(200).send(final);

    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
        }
    }
})

// GET all the templates for the user 
app.get('/Template/getAll/:user_id', async (req, res) => {

    const user_id = req.params.user_id;
    console.log(user_id);
    if (!req.params.user_id) {
        res.status(401).send()
        return;
    }

    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        // log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    }

    // if (!ObjectID(user_id)) {
    //     res.status(404).send()
    //     return;
    // }

    try {
        const template = await Template.find({ userid: user_id }); 
        
        if (!template) {
            res.status(404).send()
        } 

        res.status(200).send(template); 
    } catch (error) {
        console.log(error); 
        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
        }
    }

})

// GET the templates 
app.get('/Template/:template_id/:user_id', async (req, res) => {

    const _id = req.params.template_id;
    console.log(_id);
    console.log(req.params.user_id);
    if (!req.params.user_id) {
        res.status(401).send()
        return;
    }

    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    }

    if (!ObjectID(_id)) {
        res.status(404).send()
        return;
    }

    try {
        const template = await Template.findById(_id)
        if (!template) {
            res.status(404).send()
        } else if(template.userid == req.params.user_id) {
            res.send(template)
        } else {
            console.log("there");
            res.status(401).send()
        }
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
        }
    }

})


// UPDATE 
app.put("/Template/:template_id", async (req, res) => {

    const _template_id = req.params.template_id;


    if (!req.body.userid) {
        res.status(401).send()
        return;
    }

    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    }

    if (!ObjectID(_template_id)) {
        res.status(401).send()
        return;
    }
    const template = await Template.findOne({ _id: _template_id, userid: req.body.userid })
    if (!template) {
        res.status(401).send()
        return;
    }
    let updated = await updateTemplate(req, template);

    try {
        const final = await updated.save()
        res.status(200).send("Updated")

    } catch (error) {
        console.log(error);
        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
        }
    }
})


// DELETE 
app.delete('/Template/:template_id/:userid', async (req, res) => {
	const _template_id = req.params.template_id

    console.log(req.params.userid)
    if (!req.params.userid) {
        // console.log(req);
        console.log("1");
        res.status(401).send()
        return;
    }

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}
    if (!ObjectID(_template_id)) {
		res.status(404).send()
		return;
	}
    console.log(_template_id);
    console.log(req.params.userid);
    const template = await Template.findOne({ _id: _template_id, userid: req.params.userid })
    if (!template) {
        console.log("2");
        res.status(404).send()
        return;
    }

	try {
        Template.deleteOne({"_id": ObjectID(_template_id)}).then((result) =>{
            
            if (result.deletedCount === 0) {
                res.status(404).send(); 
                return; 
            }
            res.status(200).send(); 

        }).catch((error) => { 
            res.status(400).send(error); 
        })
        
	} catch (error) {
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
	}

})


/*
=============== Helper Functions =====================
*/

function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
	return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}


// creates the template model and populates it with the request body data
async function makeTemplate(req) {

    const final = createSubSchema(req).then(result => {

        const template = new Template({
            userid: req.body.userid,
            Personal: {
                fname: req.body.Personal.fname,
                lname: req.body.Personal.lname,
                email: req.body.Personal.email,
                telephone: req.body.Personal.telephone,
                website: req.body.Personal.website,
                github: req.body.Personal.github
            },
            Experience: result[0],
            Projects: result[1],
            Achievements: result[2],
            EducationHistory: {
                school: req.body.EducationHistory.school,
                degree: req.body.EducationHistory.degree,
                startDate: req.body.EducationHistory.startDate,
                endDate: req.body.EducationHistory.endDate,
                gpa: req.body.EducationHistory.gpa,
            },
            Skills: req.body.Skills,
            coursework: req.body.CourseWork,
            clubs: result[3],
            hobbies: req.body.Hobbies,
            hackathons: result[4]
        })
        return template
    }).catch((error) => {
        console.error(error);
    })

    return final
}

async function updateTemplate(req, template) {
    console.log(template)
    const final = createSubSchema(req).then(result => {

        template.userid=req.body.userid;
        template.Personal.fname=req.body.Personal.fname;
        template.Personal.lname=req.body.Personal.lname;
        template.Personal.email=req.body.Personal.email;
        template.Personal.telephone=req.body.Personal.telephone;
        template.Personal.website=req.body.Personal.website;
        template.Personal.github=req.body.Personal.github;
        template.Experience=result[0];
        template.Projects=result[1];
        template.Achievements=result[2];
        template.EducationHistory.school=req.body.EducationHistory.school;
        template.EducationHistory.degree=req.body.EducationHistory.degree;
        template.EducationHistory.startDate=req.body.EducationHistory.startDate;
        template.EducationHistory.endDate=req.body.EducationHistory.endDate;
        template.EducationHistory.gpa=req.body.EducationHistory.gpa;
        template.Skills=req.body.Skills;
        template.CourseWork=req.body.CourseWork;
        template.Clubs=result[3];
        template.Hobbies=req.body.Hobbies;
        template.Hackathons=result[4];

        return template
    }).catch((error) => {
        console.error(error);
    })

    return final
}


// creates the sub schema model and populates it with the request body data
async function createSubSchema(req) {

    let experience_num = 0
    let project_num = 0
    let achievement_num = 0
    let clubs_num = 0
    let hackathons_num = 0

    if (req.body.Experience) {
        experience_num = req.body.Experience.length
    }

    if (req.body.Projects) {
        project_num = req.body.Projects.length
    }
    
    if (req.body.Achievements) {
        achievement_num = req.body.Achievements.length
    }

    if (req.body.Clubs) {
        clubs_num = req.body.Clubs.length
    }

    if (req.body.Hackathons) {
        hackathons_num = req.body.Hackathons.length
    }

    let experience_array = []
    let project_array = []
    let achievement_array = []
    let clubs_array = []
    let hackathons_array = []

    for (let i = 0; i < experience_num; i++) {
        let experience = new Experience({
            id: req.body.Experience[i].id,
            title: req.body.Experience[i].title,
            subtitle: req.body.Experience[i].subtitle,
            startDate: req.body.Experience[i].startDate,
            endDate: req.body.Experience[i].endDate,
            location: req.body.Experience[i].location,
            desc: req.body.Experience[i].desc,
        })
        experience_array.push(experience)
    }

    for (let j = 0; j < project_num; j++) {
        let project = new Project({
            id: req.body.Projects[j].id,
            title: req.body.Projects[j].title,
            subtitle: req.body.Projects[j].subtitle,
            startDate: req.body.Projects[j].startDate,
            endDate: req.body.Projects[j].endDate,
            desc: req.body.Projects[j].desc,
        })
        project_array.push(project)
    }

    for (let k = 0; k < achievement_num; k++) {
        let achievement = new Achievement({
            id: req.body.Achievements[k].id,
            title: req.body.Achievements[k].title,
            desc: req.body.Achievements[k].desc,
        })
        achievement_array.push(achievement)
    }

    for (let l = 0; l < clubs_num; l++) {
        let clubs = new Clubs({
            id: req.body.Clubs[l].id,
            title: req.body.Clubs[l].title,
            subtitle: req.body.Clubs[l].subtitle,
            startDate: req.body.Clubs[l].startDate,
            endDate: req.body.Clubs[l].endDate,
            desc: req.body.Clubs[l].desc,
        })
        clubs_array.push(clubs)
    }

    for (let m = 0; m < hackathons_num; m++) {
        let hackathons = new Hackathons({
            id: req.body.Hackathons[m].id,
            title: req.body.Hackathons[m].title,
            subtitle: req.body.Hackathons[m].subtitle,
            startDate: req.body.Hackathons[m].startDate,
            endDate: req.body.Hackathons[m].endDate,
            desc: req.body.Hackathons[m].desc,
        })
        hackathons_array.push(hackathons)
    }


    return [experience_array, project_array, achievement_array, clubs_array, hackathons_array]
}


app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}!`))