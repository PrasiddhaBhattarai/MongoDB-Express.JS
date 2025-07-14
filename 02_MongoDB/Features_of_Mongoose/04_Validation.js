// don't run this file!!
// for educational purpose only

// Mongoose provides built-in validation, which helps ensure data integrity. You can validate fields when saving documents by using built-in validators like required, min, max, or by creating custom validation logic.


/// Define a schema with validation
const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true // Name is required
    },
    price: {
      type: Number,
      min: [0, 'Price must be a positive number'], // Price should be >= 0
      // 'Price must.....' is the error message that will be displayed if validation failed
      required: true
    }
  });
  
  // Create a model from the schema
  const Product = mongoose.model('Product', productSchema);
  
  // Create and save a new product
  const newProduct = new Product({
    name: 'Laptop',
    price: -200 // Invalid price (negative number)
  });
  
  newProduct.save()
    .then(() => console.log('Product saved'))
    .catch((err) => console.log('Error:', err.message)); // Validation error: Price must be a positive number


// Expected Output:
  
//   Error: Price must be a positive number

// If you change the price to a positive number (e.g., 100), it will save successfully:
  
//   Product saved