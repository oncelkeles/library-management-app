# library-management-app

This is a library management application that allows users to borrow and return books, and track book scores.

## Prerequisites

- **Node.js** (preferably the latest LTS version)
- **PostgreSQL** database

### 1. Initialize the Database

Before running the app, you need to set up the database. You can initialize it by running the `initdb.sql` script.

1. Open your PostgreSQL client (e.g., pgAdmin, psql).
2. Run the SQL script `initdb.sql` to create the necessary tables and relationships for the app.

### 2. Install Dependencies

Install the necessary dependencies for the project by running:

```bash
npm install
```

#### Running in Production Mode

First, build the bundle:

```bash
npm run build
```

Then start the server:

```bash
npm start
```

#### Running in Development Mode

To run the app in development mode (with live reload and debugging), use:

```bash
npm run dev
```

This will start the application with a development server.

## API

- List users
- Access a user with previous borrowing info
- Create new user
- List books
- Access a book with average rating
- Create a new book
- Borrow a book
- Return a book

## API Requirements

1. While a book is borrowed at the time, no other user can borrow it.
2. Users can return a book if they have it borrowed it at the moment.
3. A user can borrow a book they had already borrowed and return before.
4. If a user borrows and returns the same book multiple time, only the score they give counts towards the book's score.
5. As book viewing is much more frequent than borrowing & returning, the scores should not be calculated by aggregating total borrowings. Instead, the total score and total user read is to be stored in the book documents, and calculated without access operation to other tables in the database. 
6. Whenever a user returns a book, the total score and user read times is updated in the book document.
