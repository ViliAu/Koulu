import { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LinkContainer from 'react-router-bootstrap/LinkContainer'

const MyNavbar = () => {
    const [user, setUser] = useState(null);
    // Get user data from the server with the stored auth_token and set it to user var
    useEffect(() => {
        let mounted = true;
        // Get user data from backend API
        async function fetchUserData() {
            const token = localStorage.getItem('auth_token');
            if (!token) {
                setUser(null);
                return;
            }
            try {
                const req = await fetch('/api/user/authenticate', {
                    method: 'GET',
                    headers: { 'authorization': 'Bearer ' + token }
                });
                if (mounted) {
                    // Unauthorized (token may be expired)
                    if (req.status === 401) {
                        setUser(null);
                    }
                    // Authorized
                    else {
                        const userData = await req.json();
                        setUser(userData);
                    }
                }
            }
            catch { }
        }
        fetchUserData();
        return () => {
            mounted = false;
        }
    }, []);

    return (
        <>
            <Navbar bg='dark' variant='dark' sticky="top" >
                <Container >
                    <LinkContainer to='/'>
                        <Navbar.Brand>
                            <img
                                alt=''
                                src='/logo192.png'
                                width='30'
                                height='30'
                                className='d-inline-block align-top'
                            />{' '}
                            Coding site
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Collapse>
                        <Nav className='me-auto'>
                            <LinkContainer to='/posts'>
                                <Nav.Link>Posts</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/user'>
                                <Nav.Link>Users</Nav.Link>
                            </LinkContainer>
                        </Nav>
                        <Form className='d-flex' style={{ paddingRight: 10 }}>
                            <FormControl
                                type='search'
                                placeholder="Search for posts..."
                                className='me-2'
                                aria-label='Search'
                            />
                            <Button variant='outline-success'>Search</Button>
                        </Form>
                        <LogInText user={user} />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

const LogInText = ({ user }) => {

    const logOut = () => {
        localStorage.removeItem('auth_token');
        window.location.reload(false);
    }

    if (user) {
        return (
            <Nav>
                <NavDropdown title={user.name} id="navbarScrollingDropdown">
                    <LinkContainer to={`/user/${user.name}`}>
                        <NavDropdown.Item>User</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/posts'>
                        <NavDropdown.Item>Posts</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logOut}>Log out</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        );
    }
    else {
        return (
            <Nav>
                <LinkContainer to='/login'>
                    <Nav.Link style={{ paddingRight: 10 }}>Log in</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/register'>
                    <Nav.Link>Register</Nav.Link>
                </LinkContainer>
            </Nav>
        );
    }
}

export default MyNavbar;