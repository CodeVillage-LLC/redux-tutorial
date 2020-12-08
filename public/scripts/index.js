"use strict";

var _immer = require("immer");

var book = {
  title: "You don't know JS"
};

function publish(book) {
  return (0, _immer.produce)(book, function (draftBook) {
    draftBook.isPublished = true;
    draftBook.title = "We don't know JS";
  });
}

var publishedBook = publish(book);
console.log({
  book: book,
  publishedBook: publishedBook
});