// don't run this file!!
// for educational purpose only

//Middleware (Hooks: pre and post hooks)

//Mongoose middleware (also called hooks) allows you to execute functions before or after certain database operations, such as saving or removing a document. Middleware is useful for tasks like validation, logging, or modifying data.

// There are pre and post hooks that run before or after an action, respectively.


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Connect to MongoDB (replace 'mongodb://localhost/test' with your database URL)
mongoose.connect('mongodb://localhost:27017/test');

// Define a schema
const userSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    password: { type: Number, required: true }
});


// Pre-save hook to hash the password before saving
userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = hashPassword(this.password); // Assume hashPassword is a function
    }

    // Custom validation or modification can be done here
    if (this.age < 18) {
        console.log('User is underage!');
    }

    // Always call next() to pass control to the next middleware or save operation
    next();
});

// Post-save hook to log a message
userSchema.post('save', function (doc) {
    console.log('User saved successfully:', doc);
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Create and save a new user document
const newUser = new User({ name: 'John Doe', age: 25 });

newUser.save()
    .then(doc => {
        console.log('Saved User:', doc);
        mongoose.connection.close(); // Close the connection after saving
    })
    .catch(err => {
        console.error('Error:', err);
        mongoose.connection.close();
    });


// In this example:
//
// The pre-save hook hashes the password before saving a user document and there is custom validation
//
// The post-save hook logs a message after a user is saved.

// Explanation:

// Pre-save Middleware:
// 
// This middleware is executed before the save() method is called.
// It logs the user’s name and age.
// If the age is less than 18, it logs a message saying the user is underage.
// Finally, it calls next(), which proceeds to save the document or to the next middleware function.


// Post-save Middleware:
// 
// This middleware is executed after the save() method is called.
// It logs a message that the user has been saved successfully.