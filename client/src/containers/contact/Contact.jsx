import React, { useState, useEffect } from 'react';
import "./contact.css"
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Contact = ({ show, handleCloseContact }) => {
    const [placement, setPlacement] = useState('end');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 767) {
                setPlacement('bottom');
            } else {
                setPlacement('end');
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {};

        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        console.log('Form data:', data);
        // You can perform further actions with the form data here
    };

    return (
        <>
            <Offcanvas show={show} onHide={handleCloseContact} placement={placement}>
                <Offcanvas.Header className='px-5 pt-4' closeButton>
                    <Offcanvas.Title><h1>Contact</h1></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='px-5 d-flex align-items-center justify-content-center px-5'>
                    <Row className='connect-row'>
                        <Col  lg={6} xl={5} >
                            <h1>Let's Connect</h1>
                        </Col>
                        <Col lg={6} xl={7} >
                            <Form onSubmit={handleFormSubmit}>
                                <Form.Group className="mb-3" controlId="nameField">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="name" placeholder="First & Last Name" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="emailField">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" name="email" placeholder="Name@Example.com" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="subjectField">
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control type="text" name="subject" placeholder="Web Dev, Networking, Employment, etc." />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="messageField">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control as="textarea" placeholder='Elaborate' rows={3} name="message" />
                                </Form.Group>
                                <div className='d-flex justify-content-end'>
                                    <Button type="submit">Send</Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Contact
