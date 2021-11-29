import logo from './logo.svg';
import './App.css';
import BookInput from './components/BookInput';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Books</h1>
        <BookInput/>
      </header>
    </div>
  );
}

export default App;
