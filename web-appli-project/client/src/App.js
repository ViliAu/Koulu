import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Helmet from 'react-helmet';
import Container from "react-bootstrap/Container";

import MyNavbar from './components/MyNavbar';
import HomePage from './components/HomePage';
import Posts from './components/Posts';
import Users from './components/Users';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/NotFound';
import CreatePost from "./components/CreatePost";
import UserSettings from "./components/UserSettings";

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
          <Route path="/posts/:id" element={<Posts />} />
          <Route path="/posts/" element={<Posts />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<Users />} />
          <Route path="/users/:id/settings" element={<UserSettings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
