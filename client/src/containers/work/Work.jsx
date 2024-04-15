import React, { useEffect, useState } from 'react';
import "./work.css";
import { Card, Col, Offcanvas, Row } from 'react-bootstrap';
import { FlyFit, OldHouseParts, RoboDraw, StrikeZoneTracker } from '../../components'
import flyfitImage from "../../assets/project-headers/fly-fit.png"
import robodrawImage from "../../assets/project-headers/robo-draw.png"
import ohpImage from "../../assets/project-headers/old-house-parts.png";
import szt from "../../assets/project-headers/fenway.png";

const Work = ({ show, handleCloseWork }) => {
    const [placement, setPlacement] = useState('end');
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
        {
            name: 'StrikeZoneTracker',
            year: 2024,
            image: szt,
            description: 'A web app to visualize MLB player strike zone performance with interactive, data-driven heatmaps.',
        },
        {
            name: 'OldHouseParts',
            year: 2024,
            image: ohpImage,
            description: 'A custom web platform with an integrated database storage tailored for a local business',
        },
        {
            name: 'FlyFit',
            year: 2023,
            image: flyfitImage,
            description: 'An iOS app and integrated sensor-system for real-time biometric and environmental data',
        },
        {
            name: 'RoboDraw',
            year: 2023,
            image: robodrawImage,
            description: 'A robotic arm that draws using manual and automatic control',
        },


    ];

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

    const handleProjectClick = (projectName) => {
        setSelectedProject(projectName);
    };

    const handleCloseContent = () => {
        setSelectedProject(null);
    };

    return (
        <>
            {selectedProject === 'FlyFit' && <FlyFit show={true} handleClose={handleCloseContent} />}
            {selectedProject === 'RoboDraw' && <RoboDraw show={true} handleClose={handleCloseContent} />}
            {selectedProject === 'OldHouseParts' && <OldHouseParts show={true} handleClose={handleCloseContent} />}
            {selectedProject === 'StrikeZoneTracker' && <StrikeZoneTracker show={true} handleClose={handleCloseContent} />}

            <Offcanvas className='work' show={show} onHide={handleCloseWork} placement={placement}>
                <Offcanvas.Header className='px-5 pt-4' closeButton>
                    <Offcanvas.Title><h1>Work</h1></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='px-lg-5'>
                    <Row xs={1} md={2} lg={2} className="g-5 mx-5 mt-2 mb-4">
                        {projects.map((project, idx) => (
                            <Col key={idx} className='d-flex justify-content-center'>
                                <Card
                                    onClick={() => handleProjectClick(project.name)}
                                    className='px-lg-5 py-lg-3'
                                    style={{
                                        cursor: 'pointer',
                                        width: "500px",
                                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.6)), url(${project.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                >
                                    <Card.Body className='my-2'>
                                        <Card.Title className='text-center mb-2'>
                                            <h3>{project.name}</h3>
                                            
                                        </Card.Title>
                                        <Card.Text className='text-center pb-2'>
                                            <p>{project.description}</p>
                                        </Card.Text>
                                        {/* <h6 className='text-end'>{project.year}</h6> */}
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default Work;
