import { Product } from "../models/product.js";

const insertSampleProducts = async (req, res) => {
    try {
        const sampleProducts = [
            {
                name: "Laptop",
                category: "Electronics",
                price: 999,
                inStock: true,
                tags: ["computer", "tech"],
            },
            {
                name: "Smartphone",
                category: "Electronics",
                price: 699,
                inStock: true,
                tags: ["mobile", "tech"],
            },
            {
                name: "Headphones",
                category: "Electronics",
                price: 199,
                inStock: false,
                tags: ["audio", "tech"],
            },
            {
                name: "Running Shoes",
                category: "Sports",
                price: 89,
                inStock: true,
                tags: ["footwear", "running"],
            },
            {
                name: "Novel",
                category: "Books",
                price: 15,
                inStock: true,
                tags: ["fiction", "bestseller"],
            },
        ];

        const result = await Product.insertMany(sampleProducts);
        res.status(201).json({
            success: true,
            message: `Inserted ${result.length} sample products.`
        });

    } catch (error) {
        console.log("error when inserting sample data", error);
        res.status(500).json({
            success: false,
            message: "Some error occured!"
        });
    }
}

const getProductStats = async (req, res) => {
    try {
        // $match : FilterQuery<any>
        // the $match stage in the aggregation pipeline is used to filter documents that match a specified condition. It is similar to the find method but is more powerful and flexible because it can be used in the context of an aggregation pipeline.

        // $group : { _id : <any field>}
        //the $group stage in the aggregation pipeline is used to group documents based on a specified expression, typically by one or more fields. This stage is often used to perform aggregation operations like counting, summing, averaging, finding the minimum or maximum values, etc., on groups of documents.

        const result = await Product.aggregate([
            // stage 1
            {
                $match: {
                    inStock: true,
                    price: {
                        $gte: 100
                    }
                }
            },

            //stage 2
            {
                $group : {
                    _id: "$category",
                    avgPrice : {
                        $avg : "$price"
                    },
                    count : {
                        $sum : 1
                    }
                }
            }
        ]);

        //stage 2

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        console.log("error when fetching products.", error);
        res.status(500).json({
            success: false,
            message: "Some error occured!"
        });
    }
};

const getProductAnalysis = async (req, res) => {
    try {
        // $ project
        // the $project stage in the aggregation pipeline is used to reshape the documents by including, excluding, renaming old fields or adding new fields. It's a way to specify which fields you want to keep or modify in the documents that pass through the aggregation pipeline.
        // to rename, {productName: "$name"}
        const result = await Product.aggregate([
            {
                $match : {
                    category : 'Electronics'
                }
            },
            {
                $group : {
                    _id : null,
                    totalRevenue : {
                        $sum : "$price"
                    },
                    averagePrice : {
                        $avg : "$price"
                    },
                    maxProductPrice : {
                        $max : "$price"
                    },
                    minProductPrice : {
                        $min : "$price"
                    }
                }
            },
            {
                $project : {
                    // 0 => exclude
                    _id : 0,
                    // 1 => include
                    totalRevenue : 1,
                    averagePrice : 1,
                    maxProductPrice : 1,
                    minProductPrice : 1,
                    priceRange : {
                        $subtract : ["$maxProductPrice", "$minProductPrice"]
                    }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: result
        });
        
    } catch (error) {
        console.log("error when fetching products.", error);
        res.status(500).json({
            success: false,
            message: "Some error occured!"
        });
    }
}

export { insertSampleProducts };
export { getProductStats };
export { getProductAnalysis };