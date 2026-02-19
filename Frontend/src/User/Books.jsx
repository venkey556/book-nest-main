
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Form, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [genre, setGenre] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [freeBooks, setFreeBooks] = useState(false);

  useEffect(() => {
    // Fetch books data from API
    axios.get('http://localhost:4000/books')
      .then(response => {
        setBooks(response.data);
        setFilteredBooks(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleFilter = () => {
    let filtered = books;

    if (genre) {
      filtered = filtered.filter(book => book.genre.toLowerCase().includes(genre.toLowerCase()));
    }

    if (author) {
      filtered = filtered.filter(book => book.author.toLowerCase().includes(author.toLowerCase()));
    }

    if (price) {
      filtered = filtered.filter(book => book.price <= price);
    }

    if (freeBooks) {
      filtered = filtered.filter(book => book.price === 0);
    }

    setFilteredBooks(filtered);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 className="text-center">Books</h1>
      <div className="filters" style={{ marginBottom: '20px' }}>
        <Form>
          <Form.Group controlId="genre">
            <Form.Label>Genre</Form.Label>
            <Form.Control
              as="select"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="">All Genres</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Biography">Biography</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="author">
            <Form.Label>Author</Form.Label>
            <Form.Control
              as="select"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            >
              <option value="">All Authors</option>
              <option value="J.K. Rowling">J.K. Rowling</option>
              <option value="Stephen King">Stephen King</option>
              <option value="J.R.R. Tolkien">J.R.R. Tolkien</option>
              <option value="George R.R. Martin">George R.R. Martin</option>
              <option value="Agatha Christie">Agatha Christie</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              as="select"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            >
              <option value="">All Prices</option>
              <option value="10">Under $10</option>
              <option value="20">Under $20</option>
              <option value="30">Under $30</option>
              <option value="40">Under $40</option>
              <option value="50">Under $50</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="freeBooks">
            <Form.Check
              type="checkbox"
              label="Download Free Books"
              checked={freeBooks}
              onChange={(e) => setFreeBooks(e.target.checked)}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleFilter}>
            Apply Filters
          </Button>
        </Form>
      </div>

      <div className="books-carousel">
        <Carousel>
          {filteredBooks.map((book, index) => (
            <Carousel.Item key={index}>
              <Card style={{ width: '18rem', margin: 'auto' }}>
                <Card.Img variant="top" src={book.image} />
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>
                    Author: {book.author}
                    <br />
                    Genre: {book.genre}
                    <br />
                    Price: ${book.price}
                  </Card.Text>
                  <Link to={`/books/${book.id}`}>
                    <Button variant="primary">View Details</Button>
                  </Link>
                  {book.price === 0 && (
                    <Button variant="success" style={{ marginLeft: '10px' }}>
                      Download Free
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Books;