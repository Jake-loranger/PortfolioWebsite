import React, { useState } from 'react';
import { Offcanvas, Row, Col, Nav, Image, Tab, Tabs, Stack, Figure } from 'react-bootstrap';
import './oldhouseparts.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import structure from '../../assets/img/project-img/OldHouseParts-img/structure.png';
import demoOHP from '../../assets/img/project-img/OldHouseParts-img/demoOHP.mp4';
import demoBackend from '../../assets/img/project-img/OldHouseParts-img/demoBackend.mp4';

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
                    <p className='pe-lg-5 pe-md-3'>The Old House Parts Co. website is a full-stack
                        application developed for a local antique shop using the React framework.
                        This custom-designed platform features a user-friendly frontend with five distinct pages:
                        Home, Inventory, About, FAQs, and Contact. The backend of the application is supported by a
                        robust MySQL database, which stores all the inventory data. It facilitates various operations
                        such as adding, editing, and archiving inventory items through a PHP-based API that handles both POST and
                        GET requests. The frontend, designed to retrieve inventory information, primarily makes GET requests.
                        The entire application was designed and developed in-house, incorporating technologies such as
                        React.js, Bootstrap, HTML, CSS, and JavaScript to create a seamless and responsive user experience.</p>

                    <p>Please reach out if you would like to see the full source code, as this is contained in a private repo for security reasons.</p>

                    <a href='https://rockycoastlabs.xyz/'><h5><br></br>Check out the website here</h5></a>
                </div>
            </Col>
            <Col xs={12} md={12} lg={5} className="d-flex align-items-center">
                <video className='mx-auto' width="100%" height="auto" autoPlay loop muted>
                    <source src={demoOHP} type="video/mp4" />
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

    const phpPOST =
        `
        $con = mysqli_connect($host, $user, $password, $dbname);

        $name = $_POST['name'];
        $dimensionW = $_POST['dimensionW'];
        $dimensionH = $_POST['dimensionH'];
        $dimensionD = $_POST['dimensionD'];
        $price = $_POST['price'];
        $quantity = $_POST['quantity'];
        $description = $_POST['description'];
        $category = $_POST['category'];
        $subCategory = $_POST['subCategory'];
        $doorPanels = $_POST['doorPanels'];
        $shipping = $_POST['shipping'];

        $uniqueIdentifier = uniqid();
        $uploadPath = 'uploads/' . $uniqueIdentifier . '/'; // Your upload folder with a unique identifier
        $imagePaths = array();
        
        if (!is_dir($uploadPath)) {
            mkdir($uploadPath, 0755, true);
        }
        
        for ($i = 1; $i <= 3; $i++) {
            $fileKey = 'image' . $i;
            $targetFile = $uploadPath . basename($_FILES[$fileKey]['name']);
        
            if (!empty($_FILES[$fileKey]['tmp_name']) && file_exists($_FILES[$fileKey]['tmp_name'])) {
                if (move_uploaded_file($_FILES[$fileKey]['tmp_name'], $targetFile)) {
                    $imagePaths[$i - 1] = $targetFile;
                } else {
                    echo "Error uploading file " . $fileKey;
                }
            } else {
                $imagePaths[$i - 1] = NULL;
            }
        }
        
        $imagePath1 = $imagePaths[0];
        $imagePath2 = $imagePaths[1];
        $imagePath3 = $imagePaths[2];
    
        $sql = "INSERT INTO Inventory (name, dimensionH, dimensionW, dimensionD, price, quantity, description, category, sub_category,  door_panels, shipping, image_path1, image_path2, image_path3)
        VALUES ('$name', '$dimensionH', '$dimensionW', '$dimensionD', '$price', '$quantity', '$description', '$category', '$subCategory', '$doorPanels', '$shipping', '$imagePath1', '$imagePath2', '$imagePath3')";
        
        if (mysqli_query($con, $sql)) {
            echo "Data inserted successfully";
        } else {
            echo "Error: " . $sql . "<br>" . mysqli_error($con);
        }
        `

    const dataStruc =
        `const initialState = {
            image1: null,
            image2: null,
            image3: null,
            date: '',
            name: '',
            dimensionH: '',
            dimensionW: '',
            dimensionD: '',
            price: '',
            quantity: '',
            description: '',
            category: '',
            subCategory: '',
            doorPanels: '',
            shipping: '0',
        };
        
        const [formData, setFormData] = useState(initialState);`

    const formControl =
        `<Form.Control 
        type="name" 
        name="name"
        onChange={handleInputChange} required 
        />`

    const handleInput =
        `const handleInputChange = (e) => {
            const { name, value } = e.target;
    
            setFormData({
                ...formData,
                [name]: value,
            });
        };`


    return (
        <>
            <Row xs={1} md={1} lg={2} className="g-5 mx-auto mt-md-5 mt-sm-3">
                <Col className="d-flex align-items-start">
                    <div className='mb-md-5 px-lg-5'>
                        <h4 className="mb-3 text-decoration-underline">Demo</h4>
                        <p className='pe-lg-5 pe-md-3'>This video demonstrates the process of adding and editing an inventory item. Once the "Post to Website" buttton is pressed,
                            the data contained within the form is saved to a MySQL database with a POST method API call using PHP. The frontend website pulls data from this database based on
                            the parameters such as category, subcategory, recency, inventory ID, etc. When inventory information is edited and confirmed, a PHP file makes a POST call to
                            the database and changes the parameters that are different than the current ones. </p>
                    </div>
                </Col>
                <Col xs={12} md={12} lg={5} className="d-flex align-items-center">
                    <video className='mx-auto' width="100%" height="auto" autoPlay loop muted>
                        <source src={demoBackend} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </Col>
            </Row>

            <Row xs={1} md={1} lg={2} className="g-5 mx-auto my-md-5 my-sm-3">
                <Col xs={12} md={12} lg={6} className="d-flex align-items-start">
                    <div className='mb-md-5 px-lg-5'>
                        <h4 className="mb-3 text-decoration-underline">Form Overview</h4>
                        <p className='pe-lg-5 pe-md-3'>
                            These three code snippets are integral components of the AddForm.jsx component.
                            The first snippet establishes the initial state structure for form data, and facilitates
                            the state management via the useState hook. The second snippet defines the form control
                            for the name input field within the Form component, which controls the event handling.
                            The third snippet defines the handleInputChange function, triggered upon any user input
                            change, dynamically updating the corresponding field within the form data state, thereby
                            ensuring real-time synchronization between user input and component state.
                            Together, these snippets contribute to a robust form handling mechanism within the AddForm component.
                        </p>
                    </div>
                </Col>
                <Col xs={12} md={12} lg={6}>
                    <SyntaxHighlighter language="javascript" style={solarizedlight}>
                        {dataStruc}
                    </SyntaxHighlighter>
                    <SyntaxHighlighter language="javascript" style={solarizedlight}>
                        {formControl}
                    </SyntaxHighlighter>
                    <SyntaxHighlighter language="javascript" style={solarizedlight}>
                        {handleInput}
                    </SyntaxHighlighter>
                </Col>
            </Row>

            <Row xs={1} md={1} lg={2} className="g-5 mx-auto my-md-5 my-sm-3">
                <Col xs={12} md={12} lg={6} className="d-flex align-items-start">
                    <div className='mb-md-5 px-lg-5'>
                        <h4 className="mb-3 text-decoration-underline">PHP POST Function</h4>
                        <p className='pe-lg-5 pe-md-3'>
                            When a POST request is initiated to upload a new inventory item, the
                            upload PHP file is invoked. This file orchestrates the collection of
                            inventory data from the backend and subsequently executes a query in the
                            SQL database to integrate the new item. It also manages the storage
                            of inventory images by organizing them into item-specific folders. The file
                            then records the URL paths of these images within the corresponding image
                            parameters in the SQL database.
                        </p>
                    </div>
                </Col>
                <Col xs={12} md={12} lg={6}>
                    <SyntaxHighlighter language="php" style={solarizedlight}>
                        {phpPOST}
                    </SyntaxHighlighter>
                </Col>
            </Row>


        </>
    )
};

const SEO = () => {
    const sitemap =
        `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>https://www.oldhouseparts.com</loc>
            <lastmod>2024-02-22</lastmod>
            <changefreq>yearly</changefreq>
            <priority>1.0</priority>
        </url>
        <url>
            <loc>https://www.oldhouseparts.com/inventory</loc>
            <lastmod>2024-02-21</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
        </url>
        <url>
            <loc>https://www.oldhouseparts.com/about</loc>
            <lastmod>2024-02-21</lastmod>
            <changefreq>yearly</changefreq>
            <priority>0.6</priority>
        </url>
        <url>
            <loc>https://www.oldhouseparts.com/faqs</loc>
            <lastmod>2024-02-21</lastmod>
            <changefreq>yearly</changefreq>
            <priority>0.8</priority>
        </url>
        <url>
            <loc>https://www.oldhouseparts.com/contact</loc>
            <lastmod>2024-02-21</lastmod>
            <changefreq>yearly</changefreq>
            <priority>0.6</priority>
        </url>
    </urlset>`

    const HomeHelmet =
        `<Helmet>
         <title>Old House Parts - Home</title>
         <meta name="description" 
         content="Embark on a journey to Old House Parts & Company, 
         in the charming town of Kennebunk, Maine just a two hour 
         drive from Boston. Our antique sanctuary resides within an 
         11,000 square foot 1872 freight warehouse, a testament to 
         the rich history that awaits inside. " />
         
         <meta name="keywords" 
         content="Old House Parts, 
         Antique Shop, Kennebunk, Maine, Architectural salvage, Vintage Furniture, Collectibles" />
     
         <meta property="og:url" content="https://www.oldhousepartsco.com" />
         <meta property="og:title" content="Old House Parts Co." />
         <meta property="og:description" content="Explore our collection of vintage furniture, art, and collectibles at Old House Parts Co. in Kennebunk, Maine." />
         <meta property="og:image" content={metaImage} />
     
         <meta property="article:publisher" content={socialLinks.facebook} />
         <meta property="instagram:site" content={socialLinks.instagram} />
         <meta property="youtube:channel" content={socialLinks.youtube} />
</Helmet>`

    return (
        <>
            <Row xs={1} md={1} lg={2} className="g-5 mx-auto my-md-5 my-sm-3">
                <Col xs={12} md={12} lg={6} className="d-flex align-items-start">
                    <div className='mb-md-5 px-lg-5'>
                        <h4 className="mb-3 text-decoration-underline">Sitemap</h4>
                        <p className='pe-lg-5 pe-md-3'>
                            A sitemap is a file that lists all the important pages on a website
                            to help search engines understand its structure. This sitemap for
                            rockycoastlabs.xyz includes URLs for the homepage, inventory, about,
                            FAQs, and contact pages, along with details like the last modification
                            date, change frequency, and priority level for each page. It provides
                            search engines with valuable information to efficiently crawl and index
                            the website's content.
                        </p>
                    </div>
                </Col>
                <Col xs={12} md={12} lg={6}>
                    <SyntaxHighlighter language="xml" style={solarizedlight}>
                        {sitemap}
                    </SyntaxHighlighter>
                </Col>
            </Row>

            <Row xs={1} md={1} lg={2} className="g-5 mx-auto my-md-5 my-sm-3">
                <Col xs={12} md={12} lg={6} className="d-flex align-items-start">
                    <div className='mb-md-5 px-lg-5'>
                        <h4 className="mb-3 text-decoration-underline">Sitemap</h4>
                        <p className='pe-lg-5 pe-md-3'>
                        The Helmet component 
                        allows for the inclusion of metadata such as the page title, description, 
                        and keywords, which significantly contribute to search engine visibility 
                        and user engagement. The Helmet enables the integration of social 
                        media metadata, facilitating seamless sharing and enhancing the website's presence 
                        across various platforms. Overall, it helps improve both the functionality and visibility of web pages within search engines.
                        </p>
                    </div>
                </Col>
                <Col xs={12} md={12} lg={6}>
                    <SyntaxHighlighter language="xml" style={solarizedlight}>
                        {HomeHelmet}
                    </SyntaxHighlighter>
                </Col>
            </Row>

        </>
    )
};