// CRUD Operation
use("CrudDb")


// Create Operation
db.createCollection("courses")


//Create

// db.courses.insertOne({
//     name: "Harrys web dev free course",
//     price: 0,
//     assignments: 12,
//     projects: 45
// })

// db.courses.insertMany([
//     {
//       "name": "Python Masterclass",
//       "price": 0,
//       "assignments": 10,
//       "projects": 30
//     },
//     {
//       "name": "JavaScript Basics",
//       "price": 0,
//       "assignments": 8,
//       "projects": 20
//     },
//     {
//       "name": "C# for Beginners",
//       "price": 0,
//       "assignments": 15,
//       "projects": 40
//     },
//     {
//       "name": "Web Development Fundamentals",
//       "price": 0,
//       "assignments": 12,
//       "projects": 35
//     },
//     {
//       "name": "Java Programming Essentials",
//       "price": 0,
//       "assignments": 14,
//       "projects": 38
//     },
//     {
//       "name": "ReactJS Crash Course",
//       "price": 0,
//       "assignments": 10,
//       "projects": 25
//     },
//     {
//       "name": "SQL Simplified",
//       "price": 0,
//       "assignments": 12,
//       "projects": 30
//     },
//     {
//       "name": "Responsive Web Design",
//       "price": 0,
//       "assignments": 10,
//       "projects": 28
//     },
//     {
//       "name": "Node.js for Beginners",
//       "price": 0,
//       "assignments": 13,
//       "projects": 36
//     },
//     {
//       "name": "Frontend Development with Vue.js",
//       "price": 0,
//       "assignments": 11,
//       "projects": 32
//     }
//   ]
//   )



// READ
// more about read below:

// let a = db.courses.find({price: 0}) 

// console.log(a.toArray())

// let b = db.courses.findOne({price: 0}) 

// console.log(b)



// UPDATE

// db.courses.updateOne({price: 0}, {$set:{price: 100}})

// db.courses.updateMany({price: 0}, {$set:{price: 1000}})




// DELETE

db.courses.deleteOne({price: 1000})

db.courses.deleteMany({price: 1000})

// https://www.mongodb.com/docs/manual/reference/operator/query/


//more about read
function dontCallTHis(){

    const getAllCourses = db.courses.find();
    
    if(getAllCourses.length > 0){};
    // This would throw an error if allBooks is null or undefined, because trying to access the .length property on null or undefined will result in a TypeError.
    
    // Use Optional Chaining Instead.
    // Syntax: object?.property or object?.[property]
    // It ensures that if the value to the left of the ?. is null or undefined, it will return undefined instead of throwing an error.
    
    if(getAllCourses?.length > 0){};
    // This uses the optional chaining (?.) operator to safely check if allBooks is null or undefined before attempting to access its .length property
    // If allBooks is null or undefined, the ?. operator ensures that it does not attempt to access .length and will return undefined instead. As a result, the condition evaluates to false, and the code inside the if block won't execute.
}