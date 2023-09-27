var express = require('express');
var router = express.Router();

// const book = require('../models/Book');
const Book = require('../models/Book');
const { routes } = require('../app');

/* GET home page. */
router.get('/', (req, res, next) => {
  Book.find()
      .then((results) => {
        console.log(results)
        res.render('books/books-list.hbs', { results })
      })
      .catch((err) => {
        console.log(err)
        next(err)
      })

  // res.render('books/books-list.hbs');
});

router.get('/book-details/:bookId', (req, res, next) => {
  let { bookId } = req.params

  Book.findById(bookId)
      .then((foundBook) => {
        console.log("Here is the book from the DB", foundBook)
        res.render('books/book-details.hbs', foundBook)
      })
      .catch((err) => {
        console.log(err)
        next(err)
      })

})

router.get('/create', (req, res, next) => {

  res.render('books/book-create.hbs')

})

router.post('/create', (req, res, next) => {
  let { title, description, author, rating } = req.body;

  Book.create({
    title,
    description,
    author,
    rating
  })
  .then((createdBook) => {
    console.log("This is the new book ===>", createdBook)
    res.redirect(`/books/book-details/${createdBook._id}`)
  })
  .catch((err) => {
    console.log(err)
    next(err)
  })

})

module.exports = router;
