import React, { useState} from "react";
import { Input, FormBtn } from "../components/Form";
import Jumbotron from "../components/Jumbotron";
import GoogleAPI from "../utils/GoogleAPI"
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import SaveButton from "../components/SaveBtn"
import API from "../utils/API" 



function Search() {

    // Setting our component's initial state
    const [books, setBooks] = useState([])
    const [formObject, setFormObject] = useState({})

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    // When the form is submitted, use the API.saveBook method to save the book data
    // Then reload books from the database
    function handleFormSubmit(event) {
        event.preventDefault();
        GoogleAPI.searchGoogle(formObject.searchTerm)
            .then(res => {
                setBooks(res.data.items)
                console.log(res.data.items)
            })
            .catch(error => {
                console.log(error.response)
            })
    };

    function saveBook(title, description, author) {
        console.log("Title: ", title)
        console.log("Author: ", author)
        console.log("Description: ", description)

        let checkedAuthor
        if(author == null){
            checkedAuthor = "Unlisted"
        } else {
            checkedAuthor = author[0]
        }

        API.saveBook({
            title: title,
            author: checkedAuthor,
            synopsis: description
        })
        .catch(err => console.log(err))
    }

    return (<div>
        <Container fluid>
            <Row>
                <Col size="md-4">
                    <Jumbotron>
                        <h1>What Books Should I Read?</h1>
                    </Jumbotron>
                    <form>
                        <Input
                            onChange={handleInputChange}
                            name="searchTerm"
                            placeholder="Keyword(s)"
                        />
                        <FormBtn
                            disabled={!(formObject.searchTerm)}
                            onClick={handleFormSubmit}
                        >
                            Search
              </FormBtn>
                    </form>
                </Col>
                <Col size="md-8 sm-12">
                    <Jumbotron>
                        <h1>Results</h1>
                    </Jumbotron>
                    {books.length ? (
                        <List>
                            {books.map(book => (
                                <ListItem>
                                    <strong>
                                        <img src={book.volumeInfo.imageLinks.thumbnail} alt="search result"></img>
                                        {book.volumeInfo.title} by  <span id="authorList">{book.volumeInfo.authors}</span>
                                    </strong>
                                    <SaveButton onClick={() => saveBook(book.volumeInfo.title, book.volumeInfo.description, book.volumeInfo.authors)} />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <h3>No Results to Display</h3>
                    )}
                </Col>

            </Row>
        </Container>
    </div>)
}

export default Search