import React, { useState } from 'react';
import "./home.css";
import { Row, Col, Stack, Nav, Offcanvas } from "react-bootstrap";
import About from '../about/About';
import Work from '../work/Work';
import Contact from '../contact/Contact';

const Home = () => {
    const [showAbout, setShowAbout] = useState(false);
    const [showWork, setShowWork] = useState(false);
    const [showContact, setShowContact] = useState(false);

    const handleNavClick = (id) => {
        switch (id) {
            case 'work':
                setShowWork(true);
                break;
            case 'about':
                setShowAbout(true);
                break;
            case 'contact':
                setShowContact(true);
                break;
            default:
                break;
        }
    };

    const handleClose = () => {
        setShowAbout(false);
        setShowWork(false);
        setShowContact(false);
    };

    return (
        <div>
            <Row className='home'>
                <Col className='name-container' xs={12} md={8} lg={8} xxl={9}>
                    <h1 className='name'>Jake Loranger</h1>
                </Col>
                <Col className='nav-container' xs={12} md={4} lg={4} xxl={3}>
                    <Nav>
                        <Stack className='nav-stack' gap={1}>
                            <Nav.Link onClick={() => handleNavClick('work')}>
                                <h2>Work</h2>
                            </Nav.Link>
                            <Nav.Link onClick={() => handleNavClick('about')}>
                                <h2>About</h2>
                            </Nav.Link>
                            <Nav.Link onClick={() => handleNavClick('contact')}>
                                <h2>Contact</h2>
                            </Nav.Link>
                        </Stack>
                    </Nav>
                </Col>
            </Row>

            <About show={showAbout} handleCloseAbout={handleClose} />
            <Work show={showWork} handleCloseWork={handleClose}/>
            <Contact show={showContact} handleCloseContact={handleClose}/>
        </div>
    )
}

export default Home