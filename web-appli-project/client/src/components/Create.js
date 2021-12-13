import { React, useState, useEffect } from 'react';
import hljs from 'highlight.js';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';

const Create = () => {
    const [code, setCode] = useState('');
    const [formattedCode, setFormattedCode] = useState('');
    const [preview, setPreview] = useState(false);
    const updateCode = () => {
        const codetextBox = document.getElementById('postForm.code');
        // Resize text box
        codetextBox.style.overflow = 'hidden';
        codetextBox.style.height = 0;
        codetextBox.style.height = codetextBox.scrollHeight + 'px';

        // Set values
        const codeString = codetextBox.value;
        let codeFormatted = hljs.highlightAuto(codeString).value;
        setCode(codeString);
        setFormattedCode(codeFormatted);
    }
    const renderPreview = (eventkey) => {
        setPreview(eventkey !== '1');
    }
    return (
        <>
            <Container text='light' style={{ padding: 20, marginTop: 20, backgroundColor: '#1A1C1E', borderRadius: 8 }} >
                <h1>Create a post</h1>
                <Form className='postForm'>
                    <Form.Group className="mb-3" controlId="postForm.header">
                        <Form.Label>Post header</Form.Label>
                        <Form.Control type="text" placeholder="Insert the topic of your post here" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="postForm.text">
                        <Form.Label>Post text</Form.Label>
                        <Form.Control as="textarea" placeholder="Insert your question here" rows={8} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="postForm.code">
                        <Nav variant="tabs" defaultActiveKey="1" bg='dark' onSelect={renderPreview}>
                            <Nav.Item>
                                <Nav.Link eventKey="1"><Form.Label>Post code</Form.Label></Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="2"><Form.Label>Preview</Form.Label></Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <CodeInput preview = {preview} updateCode = {updateCode} code = {code} formattedCode = {formattedCode}/>
                    </Form.Group>
                    <Button variant="primary">
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    );
}

const CodeInput = ({preview, updateCode, code, formattedCode}) => {
    useEffect(()=>{
        if (!preview)
            updateCode();
    });
    if (preview) {
        return (
            <pre><code dangerouslySetInnerHTML={{ __html: formattedCode }}></code></pre>
        );
    }
    else {
        return (
            <pre><code><Form.Control as="textarea" placeholder="Insert your code snippet here" defaultValue={code} onKeyUp={() => { updateCode() }} style={{height: 'auto', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderTop: 0}}/></code></pre>
        );
    }
}

export default Create;