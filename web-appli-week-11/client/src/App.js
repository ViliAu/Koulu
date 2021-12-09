import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import BookInput from './components/BookInput';
import BookData from './components/BookData';
import NotFound from './components/NotFound';

function App() {

  return (
    <Router>
      <div className="App">
        <h1>Books</h1>
        <Routes>
          <Route path="/" element={<BookInput />} />
          <Route path="/book/:id" element={<BookData />} />
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
