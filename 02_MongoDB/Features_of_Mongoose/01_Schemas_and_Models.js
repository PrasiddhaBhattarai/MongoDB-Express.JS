// don't run this file!!
// for educational purpose only

// Schemas define the structure of documents within a collection in MongoDB. They allow you to define the types of fields (e.g., string, number, date) and set validation rules. Models are based on these schemas and provide an interface to interact with the database.

const mongoose = require('mongoose');

// Define a schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },  
  // The name field is required

  age: { type: Number, min: 18, max: 100 },  
  // Age must be between 18 and 100

  email: { type: String, unique: true, required: true }  
  // Email is unique and required
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

// Create a new user document
const newUser = new User({
  name: 'John Doe',
  age: 30,
  email: 'john.doe@example.com'
});

// since the email is unique: true,
// if you try to create new user with an prexisting email, an error will be thrown

// Save the user to the database
newUser.save()
  .then(() => console.log('User saved successfully'))
  .catch((err) => console.log('Error:', err));