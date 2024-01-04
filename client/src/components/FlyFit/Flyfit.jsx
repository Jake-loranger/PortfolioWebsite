import React, { useState } from 'react';
import "./flyfit.css"
import { Offcanvas, Row, Col, Nav, Image, Tab, Tabs } from 'react-bootstrap';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ui from "../../assets/img/project-img/FlyFit-img/ui.png";
import headset from "../../assets/img/project-img/FlyFit-img/headset.png";
import circuit from "../../assets/img/project-img/FlyFit-img/circuit.png";
import dataflow from "../../assets/img/project-img/FlyFit-img/dataflow.png";
import fft from "../../assets/img/project-img/FlyFit-img/fft.png";

const FlyFit = ({ show, handleClose }) => {
  const [activeTab, setActiveTab] = useState('objective');

  const handleTabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  return (
    <Offcanvas className='flyfit' show={show} onHide={handleClose} placement='end'>
      <Offcanvas.Header className='px-5 pt-4' closeButton>
        <Offcanvas.Title><h1>FlyFit</h1></Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className='px-5 pt-4' >
        <Tabs activeKey={activeTab} onSelect={handleTabSelect} id="flyfit-tabs" className="mb-3">
          <Tab eventKey="objective" title="Objective">
            <Objective />
          </Tab>
          <Tab eventKey="design" title="Design">
            <Design />
          </Tab>
          <Tab eventKey="code" title="Code">
            <Code />
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
  <Row xs={1} md={2} lg={2} className="g-5 mx-auto mt-3">
    <Col>
      <h4 className="text-decoration-underline">Objective</h4>
      <p>Develop a sensor system to seamlessly integrate
        in-flight biometric and environmental data monitoring. The project
        focuses on measuring crucial biometric metrics, including heart rate,
        breathing rate, head angle, and body temperature, and environmental
        parameters such as cabin temperature, CO levels, and turbulence.
        The ultimate aim is to deliver a user-friendly iOS app that provides
        real-time access to data, thereby optimizing aviation monitoring capabilities.</p>
    </Col>
    <Col>
      <Image src={ui} fluid />
    </Col>
  </Row>
);

const Design = () => (
  <Row xs={1} md={2} lg={2} className="g-5 mx-auto mt-3">
    <Col>
      <h4 className="text-decoration-underline">Design</h4>
      <p>The sensor system consists of two accelerometers, two thermistors,
        an electret microphone, and a CO gas sensor wired to an ESP32 microcontroller. The microcontroller
        processes and analyses the data before transmitting it via bluetooth to the connect iOS device.
        A 3D-printed adaptor houses the sensor system and easily mounts to any existing pilot headset.</p>
    </Col>
    <Col>
      <Row>
        <Image className='p-5' src={headset} fluid />
      </Row>
      <Row>
        <Image className='p-5' src={circuit} fluid />
      </Row>
    </Col>
    
  </Row>
);

const Code = () => {
  const swiftCode = `
    func startScanning() {
      centralManager?.scanForPeripherals(withServices:nil)
      status = "Scanning"
      statusLabel?.text = status
      print(status)
    }

    func centralManagerDidUpdateState(_ central: CBCentralManager) {
      switch central.state {
        case .poweredOff:
          print("Is Powered Off.")
        case .poweredOn:
          print("Is Powered On.")
          startScanning()
        @unknown default:
          print("Error")
      }
    }
  `;

  const pythonCode = `
    class ESP32_BLE():
      def __init__(self, name):
        self.led = Pin(2, Pin.OUT)
        self.timer1 = Timer(0)
        self.name = name
        self.ble = ubluetooth.BLE()
        self.ble.active(True)
        self.disconnected()
        self.ble.irq(self.ble_irq)
        self.register()
        self.advertiser()
  `;

  return (
    <Row xs={1} md={2} lg={2} className="g-5 mx-auto mt-3">
      <Col>
        <p>This Swift code manages Bluetooth scanning in the iOS app,
          initiating the process by calling startScanning when the Bluetooth state
          is powered on. The centralManagerDidUpdateState method triggers
          the scanning for a designated peripheral Bluetooth device, with the microcontroller
          serving this role in the application.</p>
        <SyntaxHighlighter language="swift" style={solarizedlight}>
          {swiftCode}
        </SyntaxHighlighter>
      </Col>
      <Col>
        <p>This MicroPython code represents the peripheral, defining the ESP32_BLE
          class for Bluetooth communication on an ESP32 microcontroller. It efficiently
          manages LED configuration, advertising setup, and connection status, seamlessly
          aligning with the Swift iOS app's Bluetooth scanning functionality.</p>
        <SyntaxHighlighter language="python" style={solarizedlight}>
          {pythonCode}
        </SyntaxHighlighter>
      </Col>
    </Row>
  );
};

const DataAnalysis = () => (
  <Row xs={1} md={2} lg={2} className="g-5 mx-auto mt-3">
    <Col>
      <h4 className="text-decoration-underline">Data Analysis</h4>
      <p>Develop a sensor system to seamlessly integrate
        in-flight biometric and environmental data monitoring. The project
        focuses on measuring crucial biometric metrics, including heart rate,
        breathing rate, head angle, and body temperature, and environmental
        parameters such as cabin temperature, CO levels, and turbulence.
        The ultimate aim is to deliver a user-friendly iOS app that provides
        real-time access to data, thereby optimizing aviation monitoring capabilities.</p>
    </Col>
    <Col>
      <Image src={fft} fluid />
    </Col>
    
  </Row>
);

const DataFlow = () => (
  <Row xs={1} md={2} lg={2} className="g-5 mx-auto mt-3">
    <Col>
      <h4 className="text-decoration-underline">Data Flow</h4>
      <p>Develop a sensor system to seamlessly integrate
        in-flight biometric and environmental data monitoring. The project
        focuses on measuring crucial biometric metrics, including heart rate,
        breathing rate, head angle, and body temperature, and environmental
        parameters such as cabin temperature, CO levels, and turbulence.
        The ultimate aim is to deliver a user-friendly iOS app that provides
        real-time access to data, thereby optimizing aviation monitoring capabilities.</p>
    </Col>
    <Col>
      <Image src={dataflow} fluid />
    </Col>
  </Row>
);



