import { useState, useEffect } from 'react';
import BookCreate from './components/BookCreate';

const App = () => {
    const [books, setBooks] = useState([]);
    
    const createBook = (title) => {
        // setBooks([ ...books, book ]);
    };

    const editBook = () => {};
    const deleteBook = () => {};

    return (
        <div>
            <BookCreate onCreate={createBook} />
        </div>
    );
}

export default App;