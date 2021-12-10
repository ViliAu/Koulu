import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import NavDropdown from 'react-bootstrap/NavDropdown';

const MyNavbar = () => {
    return (
        <>
            <Navbar bg='dark' variant='dark' sticky="top" >
                <Container >
                    <Navbar.Brand href="/" >
                        <img
                            alt=''
                            src='logo192.png'
                            width='30'
                            height='30'
                            className='d-inline-block align-top'
                        />{' '}
                        Coding site
                    </Navbar.Brand>
                    <Navbar.Collapse>
                        <Nav className='me-auto'>
                            <Nav.Link href='/posts'>Posts</Nav.Link>
                            <Nav.Link href='/user'>User</Nav.Link>
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
                        <LogInText />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

const LogInText = () => {
    let loggedIn = false;
    let userName = "USERNAME";

    if (loggedIn) {
        return (
            <Nav>
                <NavDropdown title={userName} id="navbarScrollingDropdown">
                    <NavDropdown.Item href="/user">User</NavDropdown.Item>
                    <NavDropdown.Item href="/posts">Posts</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/logout">Log out</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        );
    }
    else {
        return (
            <Nav>
                <Nav.Link href="/login" style={{ paddingRight: 10 }}>Log in</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
        );
    }
}

export default MyNavbar;