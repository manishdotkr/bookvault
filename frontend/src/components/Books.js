import React from 'react';

function Books({ books, onCreateClick, onUpdateClick, onDeleteClick }) {
    return (
        <div>
            <h1>Books</h1>
            <button onClick={onCreateClick}>Add New Book</button>
            {books.length === 0 ? (
                <p>No books available.</p>
            ) : (
                <ul>
                    {books.map(book => (
                        <li key={book.id}>
                            {book.name} by {book.publisher} ({book.date})
                            <div className="book-actions">
                                <button onClick={() => onUpdateClick(book)}>Edit</button>
                                <button className="delete-btn" onClick={() => onDeleteClick(book.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Books;