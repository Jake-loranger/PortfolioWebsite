import React, { useState } from 'react';
import { Offcanvas, Row, Col, Nav, Image, Tab, Tabs, Stack, Figure } from 'react-bootstrap';
import './oldhouseparts.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import structure from '../../assets/img/project-img/OldHouseParts-img/structure.png'

const OldHouseParts = ({ show, handleClose }) => {
    const [activeTab, setActiveTab] = useState('overview');

    const handleTabSelect = (selectedTab) => {
        setActiveTab(selectedTab);
    };

    return (
        <Offcanvas className='robodraw' show={show} onHide={handleClose} placement='end'>
            <Offcanvas.Header className='px-5 pt-4' closeButton>
                <Offcanvas.Title><h1>Old House Parts Co.</h1></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='px-5 pt-4' >
                <Tabs activeKey={activeTab} onSelect={handleTabSelect} id="oldhouseparts-tabs" className="mb-3">
                    <Tab eventKey="overview" title="Overview">
                        <Overview />
                    </Tab>
                    <Tab eventKey="design" title="Design">
                        <Design />
                    </Tab>
                    <Tab eventKey="development" title="Development">
                        <Development />
                    </Tab>
                </Tabs>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default OldHouseParts;

const Overview = () => {
    return (
        <>
            <Image src={structure} fluid />
        </>
    );

};

const Design = () => {
    const appCode =
        `
        <Router >
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/about" element={<About />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/contact" element={<Contact />} />
            </Routes>
        </Router>
        `;

    return (
        <>
            <Row xs={1} md={1} lg={2} className="g-5 mx-auto mt-md-5 mt-sm-3">
                <Col xs={12} md={12} lg={6} className="d-flex align-items-start">
                    <div className='mb-md-5 px-lg-5'>
                        <h4 className="mb-3 text-decoration-underline"> Frontend Design</h4>
                        <p className='pe-lg-5 pe-md-3'>
                            The frontend design consists of five pages: Home, Inventory, About, FAQs, and Contact. Each page has it's own component and url route.
                        </p>
                    </div>
                </Col>
                <Col xs={12} md={12} lg={6}>
                    <SyntaxHighlighter language="javascript" style={solarizedlight}>
                        {appCode}
                    </SyntaxHighlighter>
                </Col>
            </Row>

            <Row xs={1} md={1} lg={2} className="g-5 mx-auto mt-md-5 mt-sm-3">
                <Col xs={12} md={12} lg={6} className="d-flex align-items-start">
                    <Image>

                    </Image>
                </Col>
                <Col xs={12} md={12} lg={6}>
                </Col>
            </Row>

        </>
    );
};

const Development = () => {
    <>
    </>
};

const Integration = () => (
    <>
    </>
);

const SEO = () => (
    <>
    </>
);