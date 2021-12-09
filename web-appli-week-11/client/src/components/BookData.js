import React , {useState, useEffect} from "react";
import {useParams} from 'react-router-dom'
import NotFound from './NotFound'
 
function BookData() {
    let [book, setBooks] = useState(null);
    const {id} = useParams()

    useEffect(() => {
        let mounted = true;
        async function fetchData() {
            try {
                const req = await fetch('/api/book/'+id);
                const items = await req.json();
                if (mounted) {
                    setBooks(items);
                }
            }
            catch { }
        }
        fetchData();
        return () => {
            mounted = false;
        }
    }, [id]);

    if (book) {
        return (
            <div className="book-data">
                <h1>{book.name}</h1>
                <h1>{book.author}</h1>
                <h1>{book.pages}</h1>
            </div>
        );
    }
    else {
        return (
            <div className="book-data">
                <NotFound />
            </div>
        );
    }
} 
 
export default BookData;