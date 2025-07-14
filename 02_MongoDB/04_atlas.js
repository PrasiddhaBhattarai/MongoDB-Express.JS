import express from 'express';
import mongoose from 'mongoose';

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get the MongoDB URI from the .env file
const mongoURI = process.env.MONGO_URI;

try {
    await mongoose.connect(process.env.MONGO_URI);
} catch (error) {
    console.error("Mongodb atlas connection failed", error);
    process.exit(1);
}

const app = express();
const port = 3000;

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: String,
    age: Number,
    isActive: Boolean,
    tags: [String],
    // createdAt: {type: Date, default: new Date()}
    //default: new Date() is evaluated immediately when the schema is defined, meaning the default value will be the exact moment the schema is created, rather than when a new document is inserted into the database.
    createdAt: { type: Date, default: () => new Date() }
});

//create a model
const User = mongoose.model("User", userSchema);

async function runQueryExamples() {
    try {
        // create new document + save it
        // const newUser = await User.create({
        //     name: "MSI Dell",
        //     email: "msidell@gmail.com",
        //     age: 49,
        //     isActive: false,
        //     tags: ['manager'],
        // })
        // console.log("created new user", newUser);

        // find all user in model
        // can use User.find(); without curly braces, they work the same
        // const allUsers = await User.find({});
        // console.log(allUsers);

        // filtered find
        // const getUserOfActiveFalse = await User.find({isActive: false});
        // console.log(getUserOfActiveFalse);

        //find one
        // const getHanJangUser = await User.findOne({ name: "Han Jang" });
        // console.log(getHanJangUser);

        // find by ID
        // const getUserByID = await User.findById('67c7cb224f59215ea17a4b9e');
        // console.log(getUserByID);

        // find and select the fields to display
        // const selectedFields = await User.find().select("name email -_id");
        // console.log(selectedFields);
        // User.find() retrieves all documents from the User collection.
        // .select("name email -_id") specifies to include only the name and email fields and exclude the _id field.

        //.select("-_id") => shows all fields except "_id"

        // find all, limit the result by 2, skip first one
        // const limitedUsers = await User.find().limit(2).skip(1);
        // console.log(limitedUsers);

        // find and sort ascendingly according to age
        // const sortedUsers = await User.find().sort({ age: 1 });
        // console.log(sortedUsers);

        // count number of documents/ user who are active
        // const countDocuments = await User.countDocuments({ isActive: true });
        // console.log(countDocuments);

        // find user by ID and delete
        // it returns deleted document
        // const deletedUser = await User.findByIdAndDelete(newUser._id);
        // console.log("deleted user ->", deletedUser);


        //find user by ID and update
        const updateUser = await User.findByIdAndUpdate(
            // ID of user to find
            '67c7cb60b2a5c12bf2654f99',
            //the fields you want to update
            {
                // set => updates the "age"(specified field) already exists, else creates new one adds value
                $set: { age: 19 },
                
                //push => used to append array, if not array, converts it into one and apends the value
                // push: { tags: "updated" },

                // pull => removes "manager" tag from the tags array
                // if "manager" doesn't exist, doesn't throw error
                $pull: { tags: "manager"}

                // can't use both push and pull here
                //MongoDB does not allow multiple update operations on the same array field at the same time that could result in conflicting changes.
            },
            // this is optional, { new: false } by default
            // {new: true } => returns new updated document instead of before upadate
            { new: true }
        );
        console.log("updated user", updateUser);

    } catch (e) {
        console.log("Error ->", e);
    } finally {
        await mongoose.connection.close();
    }
}

runQueryExamples();

app.listen(port, () => {
    console.log(`Server running on port, ${port}`);
});