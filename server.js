'use strict';

const express = require('express')
require('dotenv').config()
const app = express()
require('ejs')
const superagent = require('superagent')
const client = require('./lib/client')
var methodOverride = require('method-override')

const PORT = process.env.PORT || 3001;
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded ({ extended: true, }));
app.use(methodOverride('_method'));

// app.get('/', getBooks);
// app.post('/searches', getBookInfo);
// app.get('/searches/new', getForm);
// app.post('/', insertIntoDatabase);
// app.get('/books/:book_isbn', getOneBook);
// app.put('/books/updatebook', updateBook);
// app.delete('/delete/deletebook', deleteBook);

// function getForm(request, response){
//   response.render('pages/searches/new');
// }

// function getBookInfo(request, response){

//   let url = 'https://www.googleapis.com/books/v1/volumes?q=';
//   let typeOfSearch = request.body.search[1];
//   let searchCriteria = request.body.search[0];

//   if(typeOfSearch === 'author'){
//     url += `+inauthor:${searchCriteria}`;
//   }

//   if(typeOfSearch === 'title'){
//     url += `+intitle:${searchCriteria}`;
//   }

//   superagent.get(url)
//     .then(res => {
//       let tenBooksArray = [];
//       for (let i = 0; i < 10; i++){
//         tenBooksArray.push(res.body.items[i]);
//       }
//       let bookArray = tenBooksArray.map(book => {
//         return new Book(book.volumeInfo);
//       });
//       response.render('pages/searches/show', {bookArray: bookArray});
//     })
//     .catch(error => {
//       console.log(error);
//       response.render('pages/error');
//     });
// }

// function getBooks(request, response){
//   let sql = 'SELECT * FROM books;';
//   client.query(sql)
//     .then(results => {

//       let bookObjectArray = results.rows;
//       if(bookObjectArray.length){
//         response.render('pages/index', {bookArray: bookObjectArray});
//       }
//       else{
//         response.render('pages/searches/new');
//       }
//     })
//     .catch(error => {
//       console.log(error);
//       response.render('pages/error');
//     });
// }

// function getOneBook(request, response){
//   let id = request.params.book_isbn;
//   let sql = 'SELECT * FROM books WHERE isbn = $1;';
//   let safeValues = [id];

//   client.query(sql, safeValues)
//     .then(results => {
//       let chosenBook = results.rows[0];
//       response.render('pages/details', {book:chosenBook});
//     });
//   // go to the database, get a specific task using the id of that task and show the details of that task on the detail.ejs page
// }

// function insertIntoDatabase(request, response){
//   let sql = 'INSERT INTO books (authors, title, isbn, image_url, description, bookshelf) VALUES ($1, $2, $3, $4, $5, $6);';
//   let safeValues = [request.body.book[1], request.body.book[0], request.body.book[2], request.body.book[3], request.body.book[5], request.body.book[4]];

//   client.query(sql, safeValues);

//   response.redirect('/');
// }

// function updateBook(request, response){
//   let {authors, title, isbn, image, description, bookshelf} = request.body;

//   let sql = 'UPDATE books SET authors=$1, title=$2, isbn=$3, image_url=$4, description=$5, bookshelf=$6 WHERE isbn=$7;';

//   let safeValues = [authors, title, isbn, image, description, bookshelf, isbn];

//   client.query(sql, safeValues);

//   response.redirect(`/books/${isbn}`);
//   // redirect to the detail page with the new information
// }

// function deleteBook(request, response){
//   let sql = `DELETE FROM books WHERE isbn = $1;`;
//   let isbn = request.body.isbn;
//   let safeValues = [isbn];

//   client.query(sql, safeValues)
//     .then(() => {
//       response.redirect('/');
//     })
//     .catch(error => {
//       handleError(error, response);
//     });
// }

function Cocktails(obj){
    this.name = obj.strDrink; 
    this.image_url = obj.strDrinkThumb;
    this.id = obj.idDrink;
    this.alcoholic = obj.strAlcoholic;
    this.category = obj.strCategory;
    this.instructions = obj.strInstructions;
    for (let i = 0; i < 15; i++){
        if(obj.strIngredient`${i+1}` !== null){
            this.ingredient`${i+1}` = obj.strIngredient`${i+1}`;
        }
    // }
    // for (let i = 0; i < 15; i++){
    //     if(obj.strMeasure`${i+1}` !== null){
    //         this.measure.push(obj.strMeasure`${i+1}`);
    //     }
    // }
  }

function SearchCocktail(obj){
    this.name = obj.strDrink; 
    this.image_url = obj.strDrinkThumb;
    this.id = obj.idDrink;
  }

// function handleError(request, response, error) {
//   console.error(error);
//   response.status(404).render('pages/error');
// }

client.connect()
  .then( () => {
    app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
  })
  .catch( err => console.error(err));
