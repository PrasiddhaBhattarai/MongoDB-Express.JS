// don't run this file!!
// for educational purpose only

// Mongoose provides a rich and flexible query interface. You can perform CRUD (Create, Read, Update, Delete) operations, with methods like .find(), .findOne(), .update(), and .delete().


// Find all users aged 18 or older
User.find({ age: { $gte: 18 } })
  .then((users) => {
    console.log('Users:', users);
  })
  .catch((err) => console.error(err));

// Find a user by email
User.findOne({ email: 'john.doe@example.com' })
  .then((user) => {
    console.log('Found user:', user);
  })
  .catch((err) => console.error(err));


// Expected Output: If the user exists in the database:

// Users: [ { _id: '60b...', name: 'John Doe', age: 30, email: 'john.doe@example.com' }]
// Found user: { _id: '60b...', name: 'John Doe', age: 30, email: 'john.doe@example.com' }