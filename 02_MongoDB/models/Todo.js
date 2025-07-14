import mongoose from "mongoose";

//schema definition
const todoSchema = new mongoose.Schema({
    title: String,
    desc: String,
    days: Number,
    author: {type: String, required: true, default: "PB"},
    isDone: Boolean
});

// const userSchema = new mongoose.Schema({
//     ...
// },{timestamps: true});
// In the context of Mongoose, the timestamps: true option is used to automatically add two fields (createdAt and updatedAt) to the schema for the document. These fields are used to track when a document was created and last updated in the database.


// Model definition (starts with a capital letter, convention)
// also export
export const Todo = mongoose.model("Todo", todoSchema);

// mongoose.model('ModelName', schema, collectionName);

// What happens when above line is executed?

// (1) Creating a model
//
//The mongoose.model() function is used to define a Mongoose model based on a Mongoose schema. In your case, you're creating a Todo model that will interact with the todos collection in your MongoDB database

// (2) Registering the Model
//
//When mongoose.model("Todo", TodoSchema) is executed, Mongoose registers the model in its internal model registry.

// (3) Creating the Model Constructor
//
//Once the model is created and registered, Mongoose creates a constructor function for the Todo model. This function can be used to create instances of Todo objects (i.e., individual documents).

// (4) Setting up Methods for Data Interaction
//
//Mongoose also adds built-in methods to the model for interacting with MongoDB. These methods allow you to: save(), update, delete, find



// addtionally,

// (1) When mongoose.model("Todo", TodoSchema) is executed:
//
// This line registers the model in Mongoose's internal model registry, but it does not interact with the MongoDB database directly.
//
// Mongoose does not create the collection at this point. It simply sets up the model so you can work with the collection later.

// (2) When the first document is saved (e.g., todo.save()):
// The actual creation of the todos collection happens when the first document is inserted into it.
// When you call todo.save() (or any other operation that involves inserting a document into the collection), MongoDB will automatically create the todos collection if it doesn't already exist.
// MongoDB does this automatically because MongoDB only creates collections when you insert the first document into it. Before that, the collection doesn’t exist.


// Five Features of MONGOOSE

// 1) Schemas and Model
// 2) Query Building
// 3) Middleware (Hooks)
// 4) Validation
// 5) Model methods

// prefer ./Features_of_Mongoose directory for more details