import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Helmet from 'react-helmet';
import Container from "react-bootstrap/Container";

import MyNavbar from './components/MyNavbar';
import HomePage from './components/HomePage';
import Posts from './components/Posts';
import Post from './components/Post';
import User from './components/User';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/NotFound';
import Create from "./components/Create";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'highlight.js/styles/androidstudio.css';

function App() {
  return (
    <Router>
      <Helmet>
        <title>Welcome to SITE</title>
      </Helmet>
      <MyNavbar />
      <Container className='App' bg='dark'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/user" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<Create />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
