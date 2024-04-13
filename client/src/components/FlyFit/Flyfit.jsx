import React, { useState } from 'react';
import "./flyfit.css"
import { Offcanvas, Row, Col, Image, Tab, Tabs } from 'react-bootstrap';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ui from "../../assets/img/project-img/FlyFit-img/ui.png";
import headset from "../../assets/img/project-img/FlyFit-img/headset.png";
import circuit from "../../assets/img/project-img/FlyFit-img/circuit.png";
import dataflow from "../../assets/img/project-img/FlyFit-img/dataflow.png";
import fft from "../../assets/img/project-img/FlyFit-img/fft.png";
import accel from "../../assets/img/project-img/FlyFit-img/accel.png";
import temp from "../../assets/img/project-img/FlyFit-img/temp.png";
import datavid from "../../assets/img/project-img/FlyFit-img/data-vid.mp4";

const FlyFit = ({ show, handleClose }) => {
  const [activeTab, setActiveTab] = useState('objective');

  const handleTabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  return (
    <Offcanvas className='flyfit' show={show} onHide={handleClose} placement='end'>
      <Offcanvas.Header className='px-md-5 pt-4' closeButton>
        <Offcanvas.Title><h1>FlyFit</h1></Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className='px-5 pt-4' >
        <Tabs activeKey={activeTab} onSelect={handleTabSelect} id="flyfit-tabs" className="mb-3">
          <Tab eventKey="objective" title="Objective">
            <Objective />
          </Tab>
          <Tab eventKey="hardware" title="Hardware">
            <Hardware />
          </Tab>
          <Tab eventKey="software" title="Software">
            <Software />
          </Tab>
          <Tab eventKey="dataAnalysis" title="Data Analysis">
            <DataAnalysis />
          </Tab>
          <Tab eventKey="dataFlow" title="Data Flow">
            <DataFlow />
          </Tab>
        </Tabs>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default FlyFit;

const Objective = () => (
  <Row xs={1} md={2} lg={2} className="g-5 mx-auto mt-md-5 mt-sm-3">
    <Col className="d-flex justify-content-start">
      <div className='mb-md-5 px-lg-5'>
        <h4 className="mb-3 text-decoration-underline">Objective</h4>
        <p className='pe-lg-5 pe-md-3'>Develop a sensor system to seamlessly integrate
          in-flight biometric and environmental data monitoring. The project
          focuses on measuring crucial biometric metrics, including heart rate,
          breathing rate, head angle, and body temperature, and environmental
          parameters such as cabin temperature, CO levels, and turbulence.
          The ultimate aim is to deliver a wearable sensor system that connects to a user-friendly
          iOS app to provide real-time access to data, thereby optimizing aviation monitoring capabilities.</p>
      </div>
    </Col>
    <Col className="d-flex align-items-center w-80">
      <Image src={ui} fluid />
    </Col>
  </Row>
);

const Hardware = () => (
  <>
    <Row xs={1} md={2} lg={2} className="g-5 mx-auto mt-3">
      <Col className="d-flex align-items-center">
        <div className='mb-5 pb-md-5  px-lg-5'>
          <h4 className="mb-3 text-decoration-underline">Sensor System</h4>
          <p className='pe-lg-5 pe-md-3'>The sensor system consists of two accelerometers, two thermistors,
            an electret microphone, and a CO gas sensor wired to an ESP32 microcontroller. The microcontroller
            processes and analyses the data before transmitting it via Bluetooth to the connected iOS device.
          </p>
        </div>
      </Col>
      <Col className="d-flex align-items-center">
        <Image src={circuit} fluid />
      </Col>
    </Row>
    <Row xs={1} md={2} lg={2} className="g-5 mx-auto mt-4">
      <Col className="order-sm-2 order-md-1 d-flex align-items-center">
        <Image src={headset} fluid />
      </Col>
      <Col className="d-flex align-items-center order-sm-1 order-md-2">
        <div className='mb-md-5 px-lg-5'>
          <h4 className="mb-3 text-decoration-underline">Headset Adaptor</h4>
          <p>A 3D-printed adaptor houses the electronics box and easily mounts to the pilot's seatbelt.
            The microphone, a thermistor, and an accelerometer exceed to clip onto any existing aviation headset.
          </p>
        </div>
      </Col>
    </Row>
  </>
);

const Software = () => {
  const swiftBLECode = `
    func startScanning() {
      centralManager?.scanForPeripherals(withServices:nil)
      status = "Scanning"
      statusLabel?.text = status
      print(status)
    }

  `;

  const pythonBLECode = `
    class ESP32_BLE():
      def __init__(self, name):
        self.name = name
        self.ble = ubluetooth.BLE()
        self.ble.active(True)
        self.register()
        self.advertiser()
  `;

  const pythonDataCode = `
    while True:
      if is_ble_connected:
        # Send data
        ble.send(f"bTemp: {bTemp_value}")          
        ble.send(f"cTemp: {cTemp_value}")
        ble.send(f"cO: {cO_value}")
        ble.send(f"bPM: {bPM_value}")
        ble.send(f"bAccelY: {bAccelY_value}")
        ble.send(f"hAccel_Y: {hAccelY_value}")

      sleep_ms(1000)
  `;

  const swiftChartCode = `
  struct SensorView: View {
    var dataControl = DataController()
    var data = [Sensor]()
    
    init() {
        data = dataControl.fetchData()
    }
    
    var body: some View {
        let timer = Timer.publish(every: 1, on: .main, in: .common).autoconnect()
        GroupBox ("Sensor Name") {
            Chart {
                ForEach(data) { item in
                    LineMark(
                        x: .value("Time", item.time!),
                        y: .value("Temp", item.bTemp)
                    )
                    .interpolationMethod(.catmullRom)
                }
            }
            .onReceive(timer, perform: updateData)
        }
    }
}
  `;

  return (
    <>
      <Row xs={1} md={2} lg={2} className="g-5 mx-auto my-5">
        <Col xl={5} md={12} xs={12} className="mb-3">
          <div className='mb-md-5 px-lg-5'>
            <h4 className="mb-3 text-decoration-underline">Connection</h4>
            <p className='pe-lg-5 pe-md-3'>A Bluetooth Low Energy (BLE) connection involves two essential components:
              a central device, responsible for scanning and connecting to a peripheral, and a peripheral device, which
              holds data to be shared. The connection relies on unique identifiers (UUIDs), with the peripheral advertising
              specific UUIDs for the central device to scan and establish a connection. In the context of this application,
              the microcontroller serves as the peripheral, transmitting sensor data upon connection to the iOS device,
              which acts as the central device.
            </p>
          </div>
        </Col>
        <Col xl={4} lg={6}>
          <h6 className="mb-3">Central scanning function (Swift)</h6>
          <SyntaxHighlighter language="swift" style={solarizedlight}>
            {swiftBLECode}
          </SyntaxHighlighter>
        </Col>
        <Col xl={3} lg={6}>
          <h6 className="mb-3">Peripheral advertising function (Python)</h6>
          <SyntaxHighlighter language="python" style={solarizedlight}>
            {pythonBLECode}
          </SyntaxHighlighter>
        </Col>
      </Row>

      <Row xs={1} md={2} lg={2} className="g-5 mx-auto my-5">
        <Col lg={5} md={12} xs={12} className="d-flex align-items-center">
          <div className='mb-md-5 px-lg-5'>
            <h4 className="mb-3 text-decoration-underline">Transmission</h4>
            <p>In the data transmission process, sensor data, including body temperature,
              cabin temperature, body accelerometer readings, head accelerometer readings,
              carbon monoxide levels, and breaths per minute, is continuously recorded every
              second by the sensor system. This real-time data is then transmitted to the
              central iOS device using Bluetooth Low Energy (BLE) communication. After transmission,
              the data is locally stored on the iOS device for further processing and analysis.
            </p>
          </div>
        </Col>
        <Col md={12}>
          <div className='mb-md-5'>
            <h6 className="mb-3">Peripheral data transmission (Python)</h6>
            <SyntaxHighlighter language="python" style={solarizedlight}>
              {pythonDataCode}
            </SyntaxHighlighter>
          </div>
        </Col>
      </Row>

      <Row xs={1} md={2} lg={2} className="g-5 mx-auto my-5">
        <Col xl={5} md={12} xs={12} className="mb-3">
          <div className='mb-md-5 px-lg-5'>
            <h4 className="mb-3 text-decoration-underline">Visualization</h4>
            <p className='pe-lg-5 pe-md-3'>Upon receiving data from the peripheral,
              the iOS device employs the CoreData library to persistently store the
              information in its corresponding schema. Subsequently, the SensorView component,
              activated by a user-clicked SensorCell, dynamically generates a Chart using a Chart
              library to visually represent the data. The displayed chart undergoes real-time
              updates every second, offering users a continuous and current overview of the
              sensor's recorded data.
            </p>
          </div>
        </Col>
        <Col xl={4} lg={6}>
          <h6 className="mb-3">Sensor data chart (SwiftUI)</h6>
          <SyntaxHighlighter language="swift" style={solarizedlight}>
            {swiftChartCode}
          </SyntaxHighlighter>
        </Col>
        <Col xl={3} lg={6}>
          <video width="100%" height="auto" autoPlay loop muted>
            <source src={datavid} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Col>
      </Row>
    </>
  );
};

const DataAnalysis = () => (
  <>
    <Row xs={1} md={1} lg={2} className="g-5 mx-auto my-5">
      <Col className="d-flex align-items-center">
        <div className='mb-md-5 px-lg-5'>
          <h4 className="mb-3 text-decoration-underline">Breathing Rate</h4>
          <p>The microphone within the sensor system initially measured sound
            amplitude, while our primary objective was to ascertain the breathing
            rate. To bridge this gap, a Fast Fourier Transform (FFT) was applied
            to transition the data from the time domain to the frequency domain.
            This transformation enabled the extraction of the average breathing rate
            over a specified interval, a crucial metric that is then displayed on
            the user interface.  </p>
        </div>
      </Col>
      <Col>
        <Image src={fft} fluid />
      </Col>
    </Row>

    <Row xs={1} md={1} lg={2} className="g-5 mx-auto my-5">
      <Col className='d-flex align-items-center order-md-1 order-lg-2'>
        <div className='mb-md-5 px-lg-5'>
          <h4 className="mb-3 text-decoration-underline">Temperature Calibration</h4>
          <p>The thermistors in the sensor system output an arbitrary bit number that
            corresponds to the temperature of their respective probes. A calibration
            curve was created to determine the relationship between the thermistor
            values and the actual temperature of the environment. The trendline of this data
            anables the conversion of thermistor values to temperature.
            Due to inherent equipment differences, individual calibration curves were developed
            for each thermistor within the sensor system. The accuracy of these trendlines for
            both thermistors was consistently measured at approximately 99%, ensuring a high
            level of precision in temperature calculations..</p>
        </div>
      </Col>
      <Col className='order-md-2 order-lg-1'>
        <Image src={temp} fluid />
      </Col>
    </Row>

    <Row xs={1} md={1} lg={2} className="g-5 mx-auto my-5">
      <Col className='d-flex align-items-center'>
        <div className='mb-md-5 px-lg-5'>
          <h4 className="mb-3 text-decoration-underline">Accelerometer</h4>
          <p>The accelerometers aimed to detect prolonged head slumping as an
            indicator of drowsiness. To achieve this, one accelerometer was
            positioned on the headset, and another was placed on the body. A
            comparative analysis of the signals from both accelerometers determined
            the head's displacement. The graph depicts the signal ratio versus time
            for the X, Y, and Z axes. An alert would be triggered if the signal ratio
            in the Y axis surpassed 2 for an extended duration.</p>
        </div>
      </Col>
      <Col className='d-flex justify-content-center'>
        <Image src={accel} fluid />
      </Col>
    </Row>
  </>
);

const DataFlow = () => (
  <Row xs={1} md={2} lg={2} className="g-5 mx-auto mt-md-5 mt-sm-3">
    <Col md={12} className="d-flex align-items-center">
      <div className='mb-md-5 px-lg-5'>
        <h4 className="mb-3 text-decoration-underline">Data Flow</h4>
        <p className='pe-lg-5 pe-md-3'>This diagram illustrates the comprehensive
          data flow within the system. The sensor system and Apple Watch collaboratively
          collect biometric and environmental information from the pilot, establishing a
          seamless relay to the iOS app, where the data is stored locally for immediate
          access. As part of future enhancements, there are plans to implement an external
          server. This server will serve as a centralized repository, receiving data dumps
          from the iOS app, thereby enabling storage in multiple locations. The extended
          functionality aims to facilitate additional accident diagnostics and enhance
          overall data redundancy.</p>
      </div>
    </Col>
    <Col md={12} className="d-flex align-items-center">
      <Image src={dataflow} fluid />
    </Col>
  </Row>
);



