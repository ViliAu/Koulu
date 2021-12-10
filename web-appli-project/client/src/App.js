import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Helmet from 'react-helmet';

import MyNavbar from './components/MyNavbar';
import HomePage from './components/HomePage';
import Posts from './components/Posts';
import Post from './components/Post';
import User from './components/User';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/NotFound';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Helmet>
        <title>Welcome to SITE</title>
      </Helmet>
      <MyNavbar />
      <div className='App'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/user" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
