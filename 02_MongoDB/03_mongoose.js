//https://mongoosejs.com/docs/

// we can interact with mongodb using mongodb compass but why is mongoose used?
// -> main reason is schema to achieve validation, which isn't possible using mongodb compass or importing "mongodb"

import mongoose from 'mongoose';
import express from 'express';
import { Todo } from "./models/Todo.js";

// Top-Level await:
// Top-level await refers to the ability to use the await keyword outside of async functions, directly in the top-level scope of a module or script. This is a feature introduced in Node.js 14+ (when using ES modules) and allows you to use await without wrapping it inside an async function.
await mongoose.connect("mongodb://localhost:27017/todo");
//".../todo" creates new database "todo" if doesn't pre-exist
// the case sensitivity is preserved when creating database
// ".../TODo" would create new db "TODo"
// but if "TODo" pre-exists in another case format, them instead of creating new db, error would be thrown
// so,
// Consistency: It's generally recommended to keep your MongoDB database names consistent in style (either camelCase, snake_case, or all lowercase) to avoid confusion. This is particularly true for project consistency and naming conventions.

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    const todo = new Todo({ 
        title: "Hey first todo", 
        desc: "Description of this todo", 
        days: 9, 
        author: "OM", 
        isDone: false 
    });

    //if author is absent, takes default value

    // const todo = new Todo({title: "Hey first todo", desc: "Description of this todo",days: 9 , isDone: false});

    todo.save()
        .then(() => console.log('User saved successfully'))
        .catch((err) => console.error('Error saving user:', err));
        
    // (*) the collection "todos" is created when first todo.save() is encountered
    // 1) The Todo model you defined is associated with a collection named todos in the todo database. If the todos collection doesn't already exist, MongoDB will automatically create it when the first document (your todo object) is inserted.
    // 2) The naming convention is that the collection name is usually the lowercase plural form of the model name. So, in this case, the model Todo will correspond to the todos collection in MongoDB.


    // instead of = new Todo()
    // you can use Todo.create, which creates new instance and save it 
    // Todo.create({
    //   title: .....
    //   .....
    // })
    //.then(() => console.log("employee data saved successfully"))
    // .catch((err) => console.log("error saving employee", err));


    res.send("Hello World");
})

app.get("/read", async (req, res) => {
    let todo = await Todo.findOne({});
    res.json({ title: todo.title, desc: todo.desc, author: todo.author });
})

app.listen(port, () => {
    console.log(`server being listened on ${port}`);
})