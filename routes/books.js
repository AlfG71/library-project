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
    rating,
  })
    .then((createdBook) => {
      console.log("This is the new book ===>", createdBook);
      res.redirect(`/books/book-details/${createdBook._id}`);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });

})

router.get('/edit/:bookId', (req, res, next) => {
  const { bookId } = req.params;

  Book.findById(bookId)
      .then((foundBook) => {
        console.log("Here is the book from the DB", foundBook)
        res.render('books/book-edit.hbs', foundBook)
      })
      .catch((err) => {
        console.log(err)
        next(err)
      })
})

router.post('/edit/:bookId', (req, res, netx) => {
  let { bookId } = req.params;

  let { title, description, author, rating } = req.body;

  Book.findByIdAndUpdate(
    bookId,
    {
      title,
      description,
      author,
      rating,
    },
    { new: true }
  )
    .then((updateBook) => {
      console.log("Book after update ===>", updateBook);
      res.redirect(`/books/book-details/${updateBook._id}`)
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
})

router.post('/delete/:bookId', (req, res, next) => {
  let { bookId } = req.params;

  Book.findByIdAndRemove(bookId)
    .then((result) => {
      console.log("Deletion result ===>", result);
      res.redirect('/books')
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
})

module.exports = router;
