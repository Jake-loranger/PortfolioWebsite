import React, { useEffect, useState } from 'react';
import "./strikezonetracker.css";
import { Offcanvas, Row, Col, Nav, Image, Tab, Tabs, Stack, Figure } from 'react-bootstrap';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import demo from '../../assets/img/project-img/StrikeZoneTracker-img/demoSZT.mp4'

const StrikeZoneTracker = ({ show, handleClose }) => {
  const [activeTab, setActiveTab] = useState('demo');

  const handleTabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  return (
    <Offcanvas className='robodraw' show={show} onHide={handleClose} placement='end'>
      <Offcanvas.Header className='px-md-5 pt-4' closeButton>
        <Offcanvas.Title><h1>StrikeZoneTracker</h1></Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className='px-md-5 pt-4' >
        <Tabs activeKey={activeTab} onSelect={handleTabSelect} id="flyfit-tabs" className="mb-3">
          <Tab eventKey="demo" title="Demo">
            <Demo />
          </Tab>
          <Tab eventKey="frontend" title="Frontend">
            <Frontend />
          </Tab>
          <Tab eventKey="backend" title="Backend">
            <Backend />
          </Tab>
        </Tabs>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default StrikeZoneTracker

const Demo = () => (
  <Row xs={1} md={1} lg={2} className="g-5 mx-auto mt-md-5 mt-sm-3">
    <Col className="d-flex align-items-start">
      <div className='mb-md-5 px-lg-5'>
        <h4 className="mb-3 text-decoration-underline">Demo</h4>
        <p className='pe-lg-5 pe-md-3'>StrikeZoneTracker is a React-based web
          application that visualizes batting averages across different sections
          of the strike zone for MLB players. Leveraging Python to
          fetch data from the MLB Stats API, this tool allows users to enter a player's
          name and select a specific year to analyze their hot and cold
          zones. Fans, analysts, and enthusiasts can easily
          explore player strengths and weaknesses, enhancing their understanding of the game.</p>

        <a href='https://github.com/Jake-loranger/StrikeZoneTracker'><p>Check out the source code here</p></a>
      </div>
    </Col>
    <Col xs={12} md={12} lg={5} className="d-flex align-items-center">
      <video className='mx-auto' width="100%" height="auto" autoPlay loop muted>
        <source src={demo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Col>
  </Row>
);

const Frontend = () => {
  const dataFetch = ` fetch("http://localhost:5000/data", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ playerName: playerName, year: year })
    })
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });`;

  const childDisplay =
    `{loading &&
    <div className='placeholder-zone-loading'>
      <div className='spinner'></div>
    </div>}
{!loading && data &&
    <HotColdZone data={data} playerName={playerName} year={year}/>
}
{!loading && !data &&
    <div className='placeholder-zone'>
      <div className='pt-3'>Batting Average by Zone</div>
    </div>
}`;

  const hotColdZone =
    `
  const zData = [
    [trimmedData["01"], trimmedData["02"], trimmedData["03"]],
    [trimmedData["04"], trimmedData["05"], trimmedData["06"]],
    [trimmedData["07"], trimmedData["08"], trimmedData["09"]],
  ];

  var plotData = [
    {
      z: zData,
      type: 'heatmap',
      zmin: 0,      
      zmax: 1,   
      colorscale: [
        [0, '#0013BE'],
        [0.20, '#C3B2E1'],
        [0.3, '#F4A2A2'],
        [.7, '#DF2727'],
        [1, '#931212']    
      ], 
      showscale: true,
      hoverongaps: false,
      colorbar: {
        x: 1.10,  
        xpad: 10, 
        ypad: 10, 
        tickfont: {
          color: 'white'
        },
      }
    }
  ];

return <Plot data={plotData} layout={layout} config={{ displayModeBar: false }} />;
`;


  return (
    <>
      <Row xs={1} md={1} lg={2} className="g-5 mx-auto mt-md-5 mt-sm-3">
        <Col className="d-flex align-items-start">
          <div className='mb-md-5 px-lg-5'>
            <h4 className="mb-3 text-decoration-underline">Data Fetch</h4>
            <p className='pe-lg-5 pe-md-3'>In the user interface, there is a form
              that includes fields for entering a play name and year. Upon clicking the
              'View' button, the frontend triggers a fetch request that sends these inputs
              to the Python backend. Once the response is received and processed, the data
              is used to display the HotColdZone component dynamically on the page.</p>
          </div>
        </Col>
        <Col xs={12} md={12} lg={5} className="d-flex align-items-center">
          <SyntaxHighlighter language="javascript" style={solarizedlight}>
            {dataFetch}
          </SyntaxHighlighter>
        </Col>
      </Row>
      <Row xs={1} md={1} lg={2} className="g-5 mx-auto mt-md-5 mt-sm-3">
        <Col className="d-flex align-items-start">
          <div className='mb-md-5 px-lg-5'>
            <h4 className="mb-3 text-decoration-underline">Heatmap Display</h4>
            <p className='pe-lg-5 pe-md-3'>The display of the HotColdZone Heatmap within
              the application dynamically changes based on three conditions. Initially, if
              the user has not yet submitted a play name or year, a placeholder is shown to indicate
              where the heatmap will eventually load. This is handled by checking if there is no data and the application is not
              currently loading. When the user submits the form and the data is still being
              fetched, a loading spinner appears to signify that the data is being processed.
              This occurs when the loading state is true. Finally, once the data is fully fetched
              and available, the HotColdZone component is rendered, displaying the heatmap with
              the relevant data for the specified player and year.</p>
          </div>
        </Col>
        <Col xs={12} md={12} lg={5} className="d-flex align-items-center">
          <SyntaxHighlighter language="javascript" style={solarizedlight}>
            {childDisplay}
          </SyntaxHighlighter>
        </Col>
      </Row>
      <Row xs={1} md={1} lg={2} className="g-5 mx-auto mt-md-5 mt-sm-3">
        <Col className="d-flex align-items-start">
          <div className='mb-md-5 px-lg-5'>
            <h4 className="mb-3 text-decoration-underline">Heatmap Component</h4>
            <p className='pe-lg-5 pe-md-3'>This snippet highlights the HotColdZone child component, which
              leverages the Plotly.js library from React to render a heatmap visualization of batting average
              data retrieved from a Python API. The zData array organizes the formatted data into a structured
              grid necessary for the heatmap. The plotData variable specifies the visual styling of the plot,
              including a custom colorscale that defines specific colors corresponding to ranges of batting
              averages. These color ranges enhance the visual representation, making it easy to interpret
              different performance levels.</p>
          </div>
        </Col>
        <Col xs={12} md={12} lg={5} className="d-flex align-items-center">
          <SyntaxHighlighter language="javascript" style={solarizedlight}>
            {hotColdZone}
          </SyntaxHighlighter>
        </Col>
      </Row>
    </>
  )
};

const Backend = () => {
  const serverCode = `
  @app.route('/data', methods=['POST'])
  def fetch_data_route():
      request_data = request.get_json()
      playerName = request_data.get('playerName')
      year = request_data.get('year')
  
      data = get_hotcoldzones_stats(player_id, year)

      return jsonify(data)
                                                                  `
  const getStats = `
  import mlbstatsapi
  mlb = mlbstatsapi.Mlb()

  def get_hotcoldzones_stats(player_id, year): 
    stats = ['hotColdZones']
    hitting_group = ['hitting']
    params = {'season': year}

    hitting_hotcoldzones = mlb.get_player_stats(player_id, stats=stats, groups=hitting_group, params=params)
    player_hotcoldzones = hitting_hotcoldzones['stats']['hotcoldzones']

    zone_data = {}

    for split in player_hotcoldzones.splits:
        if split.stat.name == 'battingAverage':
                for zone in split.stat.zones:
                    zone_data[zone.zone] = zone.value

    return(zone_data)
                                                                  `
  return (
    <>
      <Row xs={1} md={1} lg={2} className="g-5 mx-auto mt-md-5 mt-sm-3">
        <Col className="d-flex align-items-start">
          <div className='mb-md-5 px-lg-5'>
            <h4 className="mb-3 text-decoration-underline">Server Script</h4>
            <p className='pe-lg-5 pe-md-3'>This code snippet outlines the server setup
              that facilitates data exchange between the backend and frontend using Flask.
              A Flask server, app, is created and configured with CORS to allow cross-origin requests.
              The /data route accepts POST requests, which include playerName and year as parameters.
              After extracting these parameters from the request's JSON payload, the server fetches the
              corresponding batting average data using the get_hotcoldzones_stats function. This data is
              then returned to the frontend in JSON format, enabling the dynamic display of statistics
              based on the user inputs.</p>
          </div>
        </Col>
        <Col xs={12} md={12} lg={5} className="d-flex align-items-center">
          <SyntaxHighlighter language="python" style={solarizedlight}>
            {serverCode}
          </SyntaxHighlighter>
        </Col>
      </Row>
      <Row xs={1} md={1} lg={2} className="g-5 mx-auto mt-md-5 mt-sm-3">
        <Col className="d-flex align-items-start">
          <div className='mb-md-5 px-lg-5'>
            <h4 className="mb-3 text-decoration-underline">Get Stats Function</h4>
            <p className='pe-lg-5 pe-md-3'>This function leverages the MLB Stats API 
            to retrieve detailed batting average data across the nine sections of the
             strike zone for a specified player and year. It accepts player_id and year
              as parameters. The function first configures the necessary parameters and 
              requests the hotColdZones stats within the hitting group from the API. It 
              then processes the returned object to extract batting averages specifically 
              tied to each zone. This is achieved by parsing through each split in the 
              retrieved data, focusing on those with a statistic name of 'battingAverage'. 
              Each zone's batting average is then stored in a dictionary, zone_data, keyed 
              by zone identifiers, and this dictionary is returned, containing the batting 
              average data for each zone.</p>
          </div>
        </Col>
        <Col xs={12} md={12} lg={5} className="d-flex align-items-center">
          <SyntaxHighlighter language="python" style={solarizedlight}>
            {getStats}
          </SyntaxHighlighter>
        </Col>
      </Row>
    </>
  )
};
