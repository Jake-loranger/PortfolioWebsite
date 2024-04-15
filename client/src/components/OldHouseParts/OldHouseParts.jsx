import React, { useState } from 'react';
import { Offcanvas, Row, Col, Nav, Image, Tab, Tabs, Stack, Figure } from 'react-bootstrap';
import './oldhouseparts.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import structure from '../../assets/img/project-img/OldHouseParts-img/structure.png';
import demo from '../../assets/img/project-img/OldHouseParts-img/demoOHP.mp4'

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
                    <Tab eventKey="frontend" title="Frontend">
                        <Frontend />
                    </Tab>
                    <Tab eventKey="backend" title="Backend">
                        <Backend />
                    </Tab>
                    <Tab eventKey="seo" title="SEO">
                        <SEO />
                    </Tab>
                </Tabs>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default OldHouseParts;

const Overview = () => (
    <>
        <Row xs={1} md={1} lg={2} className="g-5 mx-auto py-md-5 py-sm-3">
            <Col className="d-flex align-items-start">
                <div className='mb-md-5 px-lg-5'>
                    <h4 className="mb-3 text-decoration-underline">Overview</h4>
                    <p className='pe-lg-5 pe-md-3'>The Old House Parts Co. website is a full-stack application developed for a local antique shop using the
                        React framework. This custom-designed platform features a user-friendly frontend with five distinct pages: Home, Inventory, About,
                        FAQs, and Contact. The backend of the application is supported by a robust MySQL database, which stores all the inventory data. It
                        facilitates various operations such as adding, editing, and archiving inventory items through a PHP-based API that handles both
                        POST and GET requests. The frontend, designed to retrieve inventory information, primarily makes GET requests. The entire application
                        was designed and developed in-house, incorporating technologies such as React.js, Bootstrap, HTML, CSS, and JavaScript to create a
                        seamless and responsive user experience.</p>

                    <a href='https://rockycoastlabs.xyz/'><h5><br></br>Check out the website here</h5></a>
                </div>
            </Col>
            <Col xs={12} md={12} lg={5} className="d-flex align-items-center">
                <video className='mx-auto' width="100%" height="auto" autoPlay loop muted>
                    <source src={demo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </Col>
        </Row>
        <Row xs={1} md={1} lg={1} className="g-5 mx-5 my-md-5 my-sm-3" >
            <Image src={structure} />
        </Row>
    </>
);
const Frontend = () => {
    const appCode =
        `
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/about" element={<About />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </Router>
        `;

    const homeCode = `
    const Home = () => {
        return (
          <div>
            <HomeHelmet />
            <Header />
            <HomeLanding />
            <VisitUs />
            <Gallery />
            <GetInTouch />
            <Footer />
          </div>
      
        )
      };`

    const getInventory =
        `const handleNavItemClick = (category, subCategory) => {
        axios.get('https://example.com/getInventory.php', {
            params: {
                category,
                subCategory,
            },
        })
            .then(response => {
                console.log(response.data)
                onNavItemSelect(response.data, category, subCategory)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        };`

    const phpGET =
        `
    if (!$con) {
        die("Connection failed: " . mysqli_connect_error());
    }
    
    $category = $_GET['category'];
    $subCategory = $_GET['subCategory'];
    
    $sql = "SELECT * FROM Inventory WHERE category = '$category' AND sub_category = '$subCategory'";
    $result = $con->query($sql);
    $data = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }
    
    echo json_encode($data);
        `

    return (
        <>
            <Row xs={1} md={1} lg={2} className="g-5 mx-auto mt-md-5 mt-sm-3">
                <Col xs={12} md={12} lg={6} className="d-flex align-items-start">
                    <div className='mb-md-5 px-lg-5'>
                        <h4 className="mb-3 text-decoration-underline">Frontend Design</h4>
                        <p className='pe-lg-5 pe-md-3'>
                            This code snippet demonstrates the implementation of client-side routing
                            in a React application using the React Router library, encapsulated within
                            the &lt;Router&gt; and &lt;Routes&gt; components. The routing setup defines
                            the navigation structure for a website with five main pages: Home, Inventory,
                            About, FAQs, and Contact. Each page is associated with a specific path and is
                            rendered using a corresponding React component.
                        </p>
                    </div>
                </Col>
                <Col xs={12} md={12} lg={6}>
                    <SyntaxHighlighter language="javascript" style={solarizedlight}>
                        {appCode}
                    </SyntaxHighlighter>
                </Col>
            </Row>

            <Row xs={1} md={1} lg={2} className="g-5 mx-auto my-md-5 my-sm-3">
                <Col xs={12} md={12} lg={6} className="d-flex align-items-start">
                    <div className='mb-md-5 px-lg-5'>
                        <h4 className="mb-3 text-decoration-underline">Home Page Components</h4>
                        <p className='pe-lg-5 pe-md-3'>
                            The Home component serves as the primary container for the homepage, organizing its content
                            through several key components. It includes &lt;HomeHelmet /&gt; for SEO-optimized meta tags,
                            &lt;Header /&gt; which contains the navigation bar, and &lt;HomeLanding /&gt; for the welcome
                            section. Additional elements like &lt;VisitUs /&gt; for location information, &lt;Gallery /&gt;
                            for visual content, and &lt;GetInTouch /&gt; for communication are integral for user interaction.
                            The &lt;Footer /&gt; at the bottom provides necessary auxiliary information. This structure ensures
                            each component is clearly defined and easy to manage, improving both code maintainability and user
                            experience.
                        </p>
                    </div>
                </Col>
                <Col xs={12} md={12} lg={6}>
                    <SyntaxHighlighter language="javascript" style={solarizedlight}>
                        {homeCode}
                    </SyntaxHighlighter>
                </Col>
            </Row>

            <Row xs={1} md={1} lg={2} className="g-5 mx-auto my-md-5 my-sm-3">
                <Col xs={12} md={12} lg={6} className="d-flex align-items-start">
                    <div className='mb-md-5 px-lg-5'>
                        <h4 className="mb-3 text-decoration-underline">Inventory Data Fetch</h4>
                        <p className='pe-lg-5 pe-md-3'>
                            This function is triggered when a user selects a category from the navigation bar in the inventory page.
                            It takes two arguments: category and subCategory, corresponding to the user's selection.
                            Upon being called, it uses axios to make a GET request to the specified PHP backend URL,
                            with the selected category and subcategory as parameters. The invenotry data from this request
                            is passed to the inventorry container to be displayed in the inventory cells.
                        </p>
                    </div>
                </Col>
                <Col xs={12} md={12} lg={6}>
                    <SyntaxHighlighter language="javascript" style={solarizedlight}>
                        {getInventory}
                    </SyntaxHighlighter>
                </Col>
            </Row>

            <Row xs={1} md={1} lg={2} className="g-5 mx-auto my-md-5 my-sm-3">
                <Col xs={12} md={12} lg={6} className="d-flex align-items-start">
                    <div className='mb-md-5 px-lg-5'>
                        <h4 className="mb-3 text-decoration-underline">PHP GET Function</h4>
                        <p className='pe-lg-5 pe-md-3'>
                            This PHP script first checks for a database connection; if the connection fails,
                            it exits with an error message. Upon a successful connection, it retrieves category
                            and subCategory from GET parameters and executes a SQL query on the Inventory table
                            to find matching entries. The results are then fetched and stored in an array, $data,
                            which is subsequently encoded into JSON format and outputted, effectively returning
                            the inventory items to the client.
                        </p>
                    </div>
                </Col>
                <Col xs={12} md={12} lg={6}>
                    <SyntaxHighlighter language="php" style={solarizedlight}>
                        {phpGET}
                    </SyntaxHighlighter>
                </Col>
            </Row>

        </>
    );
};

const Backend = () => {
    return (
        <>
        </>
    )
};

const SEO = () => {
    return (
        <>
        </>
    )
};