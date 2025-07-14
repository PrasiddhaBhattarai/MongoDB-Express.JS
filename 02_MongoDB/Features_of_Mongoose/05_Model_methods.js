// don't run this file!!
// for educational purpose only


// // You can define custom instance methods or static methods on your Mongoose models. These methods can be used to implement specific operations that are related to your application logic.

// 1) Instance methods are methods you call on a single document.
// 2) Static methods are methods you call on the model itself.


const mongoose = require('mongoose');

// Connect to MongoDB (adjust with your MongoDB URI if necessary)
mongoose.connect('mongodb://localhost:27017/userdb')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Define the user schema
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true }
});

// Instance method: Get the full name for a user
userSchema.methods.getFullName = function () {
    return `${this.firstName} ${this.lastName}`;
};

// Static method: Find users above a certain age
userSchema.statics.findAboveAge = function (age) {
    return this.find({ age: { $gte: age } });
};

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

// Create and save a new user document
const newUser = new User({
    firstName: 'John',
    lastName: 'Doe',
    age: 30
});

// Save the new user to the database
newUser.save()
    .then(() => {
        console.log('User saved successfully');
        // Call the instance method to get the full name
        console.log('Full Name:', newUser.getFullName());  // Output: John Doe

        // Use the static method to find users above a certain age
        return User.findAboveAge(25);
    })
    .then((users) => {
        console.log('Users above age 25:', users); // Output: List of users above age 25
    })
    .catch((err) => console.error('Error:', err));



// In this example:

// The instance method getFullName is called on an individual User document to return their full name.
// The static method findAboveAge is called on the User model to find all users older than a given age.


// Expected Output:
// 
// User saved successfully
// 
// Full Name: John Doe
// 
// Users above age 25: [
//   { _id: '60c72b2f9b1b1e5c247ff072', firstName: 'John', lastName: 'Doe', age: 30 }
// ]
// 
// If no users are found above 25, the result would be an empty array:
// Users above age 25: []