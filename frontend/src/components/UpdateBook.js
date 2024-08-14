import React, { useState, useEffect } from 'react';

function UpdateBook({ book, onSubmit }) {
    const [editedBook, setEditedBook] = useState({ name: '', publisher: '', date: '' });

    useEffect(() => {
        if (book) {
            setEditedBook(book);
        }
    }, [book]);

    const handleChange = (e) => {
        setEditedBook({ ...editedBook, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(editedBook);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Book</h2>
            <input
                name="name"
                value={editedBook.name}
                onChange={handleChange}
                placeholder="Book Name"
                required
            />
            <input
                name="publisher"
                value={editedBook.publisher}
                onChange={handleChange}
                placeholder="Publisher"
                required
            />
            <input
                type="date"
                name="date"
                value={editedBook.date}
                onChange={handleChange}
                required
            />
            <button type="submit">Update Book</button>
        </form>
    );
}

export default UpdateBook;