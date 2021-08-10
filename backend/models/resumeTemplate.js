/* Resume Template model */
'use strict';

const mongoose = require('mongoose')

// Creating the experience template through mongoose schema
const ExperienceSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: false,
        trim: false
    },
    title: {
        type: String,
        required: false,
        trim: false
    },
    subtitle: {
        type: String,
        required: false,
        trim: false
    },
    startDate: {
        type: String,
        required: false,
        trim: false
    },
    endDate: {
        type: String,
        required: false,
        trim: false
    },
    location: {
        type: String,
        required: false,
        trim: false
    },
    desc: {
        type: [String],
        required: false
    }
}, {versionKey: false})

// Creating the project template through mongoose schema
const ProjectSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: false,
        trim: false
    },
    title: {
        type: String,
        required: false,
        trim: false
    },
    subtitle: {
        type: String,
        required: false,
        trim: false
    },
    startDate: {
        type: String,
        required: false,
        trim: false
    },
    endDate: {
        type: String,
        required: false,
        trim: false
    },
    desc: {
        type: [String],
        required: false
    }
}, {versionKey: false})

// Creating the achievement template through mongoose schema
const AchievementSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: false,
        trim: false
    },
    title: {
        type: String,
        required: false,
        trim: false
    },
    desc: {
        type: String,
        required: false,
        trim: false
    }
}, {versionKey: false})

// Creating the achievement template through mongoose schema
const ClubsSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: false,
        trim: false
    },
    title: {
        type: String,
        required: false,
        trim: false
    },
    startDate: {
        type: String,
        required: false,
        trim: false
    },
    endDate: {
        type: String,
        required: false,
        trim: false
    },
    desc: {
        type: [String],
        required: false,
    },
    subtitle: {
        type: String,
        required: false,
    }
}, {versionKey: false})

// Creating the achievement template through mongoose schema
const HackathonsSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: false,
        trim: false
    },
    title: {
        type: String,
        required: false,
        trim: false
    },
    subtitle: {
        type: String,
        required: false,
        trim: false
    },
    startDate: {
        type: String,
        required: false,
        trim: false
    },
    endDate: {
        type: String,
        required: false,
        trim: false
    },
    desc: {
        type: [String],
        required: false,
    }
}, {versionKey: false})

// Creating the resume template through mongoose schema
const TemplateSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: false,
        trim: true
    },
    Personal: {
        fname: {
            type: String,
            required: false,
            trim: true
        },
        lname: {
            type: String,
            required: false,
            trim: true
        },
        email: {
            type: String,
            required: false,
            trim: true
        },
        telephone: {
            type: String,
            required: false,
            trim: true
        },
        website: {
            type: String,
            required: false,
            trim: true
        },
        github: {
            type: String,
            required: false,
            trim: true
        },
    },
    Experience: {
        type: [ExperienceSchema],
        required: false
    },
    Projects: {
        type: [ProjectSchema],
        required: false
    },
    Achievements: {
        type: [AchievementSchema],
        required: false
    },
    EducationHistory: {
        school: {
            type: String,
            required: false,
            trim: true
        },
        degree: {
            type: String,
            required: false,
            trim: true
        },
        startDate: {
            type: String,
            required: false
        },
        endDate: {
            type: String,
            required: false
        },
        gpa: {
            type: Number,
            required: false
        }
    },
    Skills: {
        type: [String],
        required: false
    },
    CourseWork: {
        type: [String],
        required: false
    },
    Clubs: {
        type: [ClubsSchema],
        required: false
    },
    Hobbies: {
        type: [String],
        required: false
    }, 
    Hackathons: {
        type: [HackathonsSchema],
        required: false
    }
}, {versionKey: false})

// make models using schemas
const Template = mongoose.model('Template', TemplateSchema)
const Experience = mongoose.model('Experience', ExperienceSchema)
const Project = mongoose.model('Project', ProjectSchema)
const Achievement = mongoose.model('Achievement', AchievementSchema)
const Clubs = mongoose.model('Clubs', ClubsSchema)
const Hackathons = mongoose.model('Hackathons', HackathonsSchema)

module.exports = { Template, Experience, Project, Achievement, Clubs, Hackathons }