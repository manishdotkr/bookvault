import React, { useState } from 'react';

function CreateBook({ onSubmit }) {
    const [book, setBook] = useState({ name: '', publisher: '', date: '' });

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(book);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Book</h2>
            <input
                name="name"
                value={book.name}
                onChange={handleChange}
                placeholder="Book Name"
                required
            />
            <input
                name="publisher"
                value={book.publisher}
                onChange={handleChange}
                placeholder="Publisher"
                required
            />
            <input
                type="date"
                name="date"
                value={book.date}
                onChange={handleChange}
                required
            />
            <button type="submit">Add Book</button>
        </form>
    );
}

export default CreateBook;