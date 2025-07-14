import { Author } from "../models/author.js";
import { Book } from "../models/book.js";

const createAuthor = async (req,res) => {
    try {
        const newAuthor = await Author.create(req.body);
        
        res.status(201).json({
            success : true,
            data : newAuthor
        });
        
    } catch (error) {
        console.log("Unable to create Author", error);
        res.status(500).json({
            success : false,
            message : 'Some error occured'
        });
    }
};

const createBook = async (req,res) => {
    try {
        const newBook = await Book.create(req.body);
        
        res.status(201).json({
            success : true,
            data : newBook
        });
        
    } catch (error) {
        console.log("Unable to create Book", error);
        res.status(500).json({
            success : false,
            message : 'Some error occured'
        });
    }
};

const populateBookWithAuthor = async(req,res) => {
    try {
        //populates the "author" field of book with the actual details of author
        const book = await Book.findById(req.params.id).populate('author');

        if (!book) {
            return res.status(404).json({
                success : false,
                message : "Book not found"
            });
        }

        res.status(300).json({
            success : true,
            data : book
        });
        
    } catch (error) {
        console.log("Unable to populate Book", error);
        res.status(500).json({
            success : false,
            message : 'Some error occured'
        });
    }
}

export {createAuthor};
export {createBook};
export {populateBookWithAuthor};