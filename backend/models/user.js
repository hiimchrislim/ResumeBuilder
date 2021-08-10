/* User model */
'use strict';

const mongoose = require('mongoose')
const validator = require('validator')


// Making a Mongoose model a little differently: a Mongoose Schema
// Allows us to add additional functionality.
const UserSchema = new mongoose.Schema({
    displayName : {
        type: String,
		required: true,
		minlength: 1,
		trim: true,
    },
    id: {
        type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
    },
	email: {
		type: String,
		required: true,
		minlength: 3,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,   // custom validator
			message: 'Not valid email'
		}
    }
})



// A static method on the document model.
UserSchema.statics.findOrCreate = function(googleId, email, displayName) {
	const User = this // binds this to the User model

	return User.findOne({ id: googleId }).then((user) => {
		if (!user) {
            const new_user = User.create({id: googleId, email:email, displayName:displayName});

            if(!new_user){
                return Promise.reject()  // a rejected promise
            }
            // console.log("New User Created!")
            return Promise.resolve(new_user);
		}
		// if the user exists, return the user
        // console.log("User Exists!")
		// console.log(user)
		return Promise.resolve(user);
	})
}

// make a model using the User schema
const User = mongoose.model('User', UserSchema)
module.exports = { User }
