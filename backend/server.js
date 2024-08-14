// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: process.env.DATABASE_ENDPOINT || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'password',
    database: process.env.MYSQL_DATABASE || 'bvDB'
});


db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        console.log(`waiting for 5 sec`)
        sleep(5000);
        let failed = db.connect((err) => {
            if (err) {
                console.error('Error connecting to the database:', err);
                process.exit(1);
            }
            console.log('Connected to the database');
        });
    }
    console.log('Connected to the database');
});

// Routes
app.get('/api/books', (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            process.exit(1);
        }
        res.json(results);
    });
    console.log("getting book")
});

app.post('/api/books', (req, res) => {
    const { name, publisher, date } = req.body;
    db.query('INSERT INTO books (name, publisher, date) VALUES (?, ?, ?)', [name, publisher, date], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            process.exit(1);
        }
        res.status(201).json({ id: result.insertId, name, publisher, date });
        console.log("putting book")
    });
    console.log("putting book")
});

app.put('/api/books/:id', (req, res) => {
    const { name, publisher, date } = req.body;
    db.query('UPDATE books SET name = ?, publisher = ?, date = ? WHERE id = ?', [name, publisher, date, req.params.id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            process.exit(1);
        }
        res.json({ id: req.params.id, name, publisher, date });
        console.log(`updating book ${req.params.id}`)
    });
});

app.delete('/api/books/:id', (req, res) => {
    db.query('DELETE FROM books WHERE id = ?', [req.params.id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            process.exit(1);
        }
        res.json({ message: 'Book deleted successfully' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));