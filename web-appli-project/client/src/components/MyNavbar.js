import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LinkContainer from 'react-router-bootstrap/LinkContainer'

const MyNavbar = () => {
    return (
        <>
            <Navbar bg='dark' variant='dark' sticky="top" >
                <Container >
                    <LinkContainer to='/'>
                        <Navbar.Brand>
                            <img
                                alt=''
                                src='logo192.png'
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
                                <Nav.Link>User</Nav.Link>
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
                    <LinkContainer to='/user'>
                        <NavDropdown.Item>User</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/posts'>
                        <NavDropdown.Item>Posts</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/logout">Log out</NavDropdown.Item>
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