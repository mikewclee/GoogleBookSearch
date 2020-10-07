import React, { useState, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import Button from 'react-bootstrap/Button'

function Search() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({})

  // on load search 
  useEffect(() => {
    loadBooks()
  }, [])

  function loadBooks() {
    API.searchTitle("")
      .then(res => {
        console.log(res.data.items)
        setBooks(res.data.items)
      })
      .catch(err => {
        console.log(err);
      })
  };

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value })
  };

  function saveBookSelection(book) {
    // event.preventDefault();
    // savebook to dbase
    API.saveBook({
      _id: book.id,
      title: book.title,
      author: book.authors[0],
      description: book.description,
      image: book.imageLinks.smallThumbnail,
      link: book.infoLink
    })
      .then(res => loadBooks())
      .catch(err => console.log(err));
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.search) {
      API.searchTitle(formObject.search)
        .then(res => {
          console.log(res.data)
          setBooks(res.data.items)
        })
        .catch(err => {
          console.log(err);
        })
    }
  };

  return (
    <Container fluid >
      <Row>
        <Col size="md-6" >
          <Jumbotron>
            <h1>Google Books Search</h1>
            <h3>Search and Save Books</h3>
          </Jumbotron>
          <form>
            <Input
              onChange={handleInputChange}
              name="search"
              placeholder="Search book title ..."
            />
            <FormBtn
              disabled={!(formObject.search)}
              onClick={handleFormSubmit}
            >
              Search
              </FormBtn>
          </form>
        </Col>
        <Col size="md-6 sm-12">
          <h1>Results</h1>
          <Row>
            {books.length ? (
              <List>
                {books.map(book => (
                  <ListItem key={book.id}>
                    <img src={book.volumeInfo.imageLinks.smallThumbnail} alt={book.volumeInfo.title} />
                    <Link to={"/books/" + book.id} />
                    <Button onClick={() => saveBookSelection(book.volumeInfo)} variant="outline-success" className='ml-3' >Save</Button>
                    <strong>
                      <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer"> link to book </a><br></br>
                    </strong>
                    <strong className="m-4">
                      Title: {book.volumeInfo.title}
                    </strong>
                    <strong>
                      Author: {book.volumeInfo.authors[0]}
                    </strong>
                    <p className="mt-3" >
                      Description: {book.volumeInfo.description}
                    </p>

                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Search;