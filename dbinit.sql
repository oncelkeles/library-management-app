-- Drop tables if they already exist to ensure a clean slate
DROP TABLE IF EXISTS borrowings;

DROP TABLE IF EXISTS books;

DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE
    users (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL);

-- Create books table
CREATE TABLE
    books (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        total_score FLOAT DEFAULT 0, -- Total score for books (for aggregation)
        users_read INT DEFAULT 0 -- Number of times the book has been read
    );

-- Create borrowings table
CREATE TABLE
    borrowings (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        book_id INT NOT NULL REFERENCES books (id) ON DELETE CASCADE,
        score NUMERIC CHECK (
            score >= 0
            AND score <= 10
        ), -- Ensure score is between 0 and 10
        borrowed_at TIMESTAMP
        WITH
            TIME ZONE NOT NULL DEFAULT NOW (), -- Borrow date
            returned_at TIMESTAMP
        WITH
            TIME ZONE -- Return date
    );

-- Insert initial data into users
INSERT INTO
    users (name)
VALUES
    ('Eray Aslan'),
    ('Enes Faruk Meniz'),
    ('Sefa Eren Şahin'),
    ('Kadir Mutlu');

-- Insert initial data into books
INSERT INTO
    books (name)
VALUES
    ('The Hitchhiker''s Guide to the Galaxy'),
    ('I, Robot'),
    ('Dune'),
    ('1984'),
    ('Brave New World');