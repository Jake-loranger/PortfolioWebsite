import React, { useEffect, useState } from 'react';
import "./work.css";
import { Card, Col, Offcanvas, Row } from 'react-bootstrap';
import { FlyFit, RoboDraw } from '../../components'
import flyfitImage from "../../assets/img/project-img/FlyFit-img/flyfit-header.png"
import robodrawImage from "../../assets/img/project-img/RoboDraw-img/robodraw-header.png"

const Work = ({ show, handleCloseWork }) => {
    const [placement, setPlacement] = useState('end');
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
        {
            name: 'FlyFit',
            image: flyfitImage,
            description: 'A wearable sensor system and user-friendly iOS app for real-time biometric and environmental data',
            tools: "Swift, Python, Microcontrollers, Figma"
        },
        {
            name: 'RoboDraw',
            image: robodrawImage,
            description: 'A robotic arm that draws using manual or automatic control', 
            tools: "SolidWorks, Python, Microcontrollers, Blender"
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

            <Offcanvas className='work' show={show} onHide={handleCloseWork} placement={placement}>
                <Offcanvas.Header className='px-5 pt-4' closeButton>
                    <Offcanvas.Title><h1>Work</h1></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='px-lg-5'>
                    <Row xs={1} md={2} lg={2} className="g-5 mx-5 mt-3">
                        {projects.map((project, idx) => (
                            <Col key={idx} className='d-flex justify-content-center'>
                                <Card onClick={() => handleProjectClick(project.name)} className='px-lg-5 py-lg-3' style={{ cursor: 'pointer', width: "500px" }}>
                                    <Card.Body className='my-4'>
                                        <Card.Title className='text-center mb-4'><h3>{project.name}</h3></Card.Title>
                                        <Card.Text className='text-center'>
                                            <p>{project.description}</p>
                                            <p style={{opacity: '0.7'}}><strong>Tools:</strong> {project.tools}</p>
                                        </Card.Text>
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

export default Work
