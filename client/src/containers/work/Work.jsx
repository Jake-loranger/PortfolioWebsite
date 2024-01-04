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
        },
        {
            name: 'RoboDraw',
            image: robodrawImage,
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

            <Offcanvas show={show} onHide={handleCloseWork} placement={placement}>
                <Offcanvas.Header className='px-5 pt-4' closeButton>
                    <Offcanvas.Title><h1>Work</h1></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='px-5'>
                    <Row xs={1} md={2} lg={2} className="g-5 mx-5 mt-3">
                        {projects.map((project, idx) => (
                            <Col key={idx}>
                                <Card onClick={() => handleProjectClick(project.name)} style={{ cursor: 'pointer' }}>
                                    <Card.Img variant="top" src={project.image} />
                                    {/* <div className='project-name'>
                                        <Card.Title>{project.name}</Card.Title>
                                    </div> */}
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
