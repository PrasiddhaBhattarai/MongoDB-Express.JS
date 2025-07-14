import express from 'express';
import { createAuthor, createBook, populateBookWithAuthor} from '../controllers/book-controller.js';

const router = express.Router();

router.post("/author", createAuthor);

router.post("/book", createBook);

router.get("/book/:id", populateBookWithAuthor);

export default router;