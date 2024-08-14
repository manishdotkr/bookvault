import React, { useState, useEffect } from 'react';
import Books from './components/Books';
import CreateBook from './components/CreateBook';
import UpdateBook from './components/UpdateBook';
import style from './App.css';

const url = process.env.BACKEND_ENDPOINT || "http://backend.bookvault.manish.kr"

function App() {
  const [view, setView] = useState('list');
  const [books, setBooks] = useState([]);
  const [bookToEdit, setBookToEdit] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${url}/api/books`);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const addBook = async (book) => {
    try {
      const response = await fetch(`${url}/api/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
      });
      const newBook = await response.json();
      setBooks([...books, newBook]);
      setView('list');
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const updateBook = async (updatedBook) => {
    try {
      const response = await fetch(`${url}/api/books/${updatedBook.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBook),
      });
      const updated = await response.json();
      setBooks(books.map(book => book.id === updated.id ? updated : book));
      setView('list');
      fetchBooks()
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await fetch(`${url}/api/books/${id}`, { method: 'DELETE' });
      setBooks(books.filter(book => book.id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="App">
      {view === 'list' && (
        <Books
          books={books}
          onCreateClick={() => setView('create')}
          onUpdateClick={(book) => { setBookToEdit(book); setView('update'); }}
          onDeleteClick={deleteBook}
        />
      )}
      {view === 'create' && (
        <CreateBook onSubmit={addBook} />
      )}
      {view === 'update' && (
        <UpdateBook book={bookToEdit} onSubmit={updateBook} />
      )}
    </div>
  );
}

export default App;
