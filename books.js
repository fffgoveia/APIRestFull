const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// Rota para obter todos os livros
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para obter um livro específico
router.get('/:id', getBook, (req, res) => {
  res.json(res.book);
});

// Rota para criar um livro
router.post('/', async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    year: req.body.year
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para atualizar um livro
router.patch('/:id', getBook, async (req, res) => {
  if (req.body.title != null) {
    res.book.title = req.body.title;
  }
  if (req.body.author != null) {
    res.book.author = req.body.author;
  }
  if (req.body.year != null) {
    res.book.year = req.body.year;
  }

  try {
    const updatedBook = await res.book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para excluir um livro
router.delete('/:id', getBook, async (req, res) => {
  // código para deletar um livro
});

