import React, { useState, useEffect } from 'react';
import './about.css';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import Nav from 'react-bootstrap/Nav'
import profile from '../../assets/img/profile.png';
import mail from '../../assets/img/mail.svg';
import github from '../../assets/img/github.svg';
import linkedIn from '../../assets/img/linkedIn.svg';

const About = ({ show, handleCloseAbout }) => {
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

    return (
        <div className='about'>
            <Offcanvas show={show} onHide={handleCloseAbout} placement={placement}>
                <Offcanvas.Header className='px-5 pt-4' closeButton>
                    <Offcanvas.Title><h1>About</h1></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='px-lg-5 px-md-3 d-flex align-items-center justify-content-center'>
                    <Row className='about-row'>
                        <Col lg={6} xl={5} className='d-flex align-items-center justify-content-center' >
                            <Image className='py-4 profile img-fluid m-auto' src={profile} roundedCircle />
                        </Col>
                        <Col lg={6} xl={7} className='about-content px-5'>
                            <h2 className='pb-2'>
                                Hi, I'm Jake,
                                <span className="d-none d-md-inline"><br /></span>
                                a passionate learner and builder
                            </h2>
                            <p>
                                My interest in science and technology led me to pursue a degree
                                in Biomedical Engineering at the University of Maine. I gained
                                valuable experience as a research engineer at VEMI, focusing on
                                software accessibility and human-computer interactions. Afterward,
                                I co-founded a marketing agency that specializes in designing and developing websites
                                for local businesses. Currently, I'm searching for opportunities
                                in an innovative startup aimed at making a positive impact on people's
                                lives.
                            </p>
                            <Stack className='social-icons-stack pt-4' direction='horizontal' gap={4}>
                                <Nav.Link href='https://www.linkedin.com/in/jakeloranger/'>
                                    <img className='social-icons' src={linkedIn} alt='LinkedIn'></img>
                                </Nav.Link>
                                <Nav.Link href='https://github.com/Jake-loranger'>
                                    <img className='social-icons' src={github} alt='Github'></img>
                                </Nav.Link>
                                <Nav.Link href='mailto:jake@rockycoastlabs.com'>
                                    <img className='social-icons' src={mail} alt="Email"></img>
                                </Nav.Link>
                            </Stack>
                        </Col>
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default About
