import React, { useState } from 'react';
import './robodraw.css';
import { Offcanvas, Row, Col, Nav, Image, Tab, Tabs, Stack, Figure } from 'react-bootstrap';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import mockup from "../../assets/img/project-img/RoboDraw-img/robodraw-header.png";
import drawing from "../../assets/img/project-img/RoboDraw-img/drawing.png";
import robovid from "../../assets/img/project-img/RoboDraw-img/robodemo.mp4";
import drawing1 from "../../assets/img/project-img/RoboDraw-img/drawing1.jpg";
import drawing2 from "../../assets/img/project-img/RoboDraw-img/drawing2.jpg";
import drawing3 from "../../assets/img/project-img/RoboDraw-img/drawing3.jpg";

const RoboDraw = ({ show, handleClose }) => {
  const [activeTab, setActiveTab] = useState('objective');

  const handleTabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  return (
    <Offcanvas className='robodraw' show={show} onHide={handleClose} placement='end'>
      <Offcanvas.Header className='px-md-5 pt-4' closeButton>
        <Offcanvas.Title><h1>RoboDraw</h1></Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className='px-md-5 pt-4' >
        <Tabs activeKey={activeTab} onSelect={handleTabSelect} id="flyfit-tabs" className="mb-3">
          <Tab eventKey="objective" title="Objective">
            <Objective />
          </Tab>
          <Tab eventKey="design" title="Design">
            <Design />
          </Tab>
          <Tab eventKey="development" title="Development">
            <Development />
          </Tab>
          <Tab eventKey="analysis" title="Analysis">
            <Analysis />
          </Tab>
        </Tabs>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default RoboDraw;

const Objective = () => (
  <Row xs={1} md={1} lg={2} className="g-5 mx-auto mt-md-5 mt-sm-3">
    <Col className="d-flex align-items-start">
      <div className='mb-md-5 px-lg-5'>
        <h4 className="mb-3 text-decoration-underline">Objective</h4>
        <p className='pe-lg-5 pe-md-3'>Design and build a SCARA (Selective Compliance Assembly Robot Arms) that
          enables the production of physical drawings using automatic or maunal control. The photo to the right displays a model of the project modeled and rendered in blender </p>
      </div>
    </Col>
    <Col xs={12} md={12} lg={5} className="d-flex align-items-center">
      <Image src={mockup} fluid />
    </Col>
  </Row>
);

const Design = () => (
  <Row xs={1} md={1} lg={2} className="g-5 mx-auto mt-md-5 mt-sm-3">
    <Col className="d-flex align-items-start">
      <div className='mb-md-5 px-lg-5'>
        <h4 className="mb-3 text-decoration-underline">Design</h4>
        <p className='pe-lg-5 pe-md-3'> SCARA robots are known for their
          versatility in assembly applications, characterized by three main joints that facilitate
          precise 3D translation of the end effector. To ensure cost-effectiveness, the base of the
          robotic arm was constructed using LEGO components, while the arms were
          modeled using onShape and then 3D printed.
        </p>
        <br />
        <p className='pe-lg-5 pe-md-3'>
          For seamless integration and precise control, a Raspberry Pi Pico was chosen as the
          microcontroller, and MicroPython was employed for programming the servos. As the project
          advanced, the need for manual control became apparent. To address this, a numerical keypad
          (numpad) was incorporated, allowing for manual and intuitive control of the robotic arm's servos.
        </p>
      </div>
    </Col>
    <Col xs={12} md={12} lg={5} className="d-flex align-items-center">
      <Image src={drawing} fluid />
    </Col>
  </Row>
);

const Development = () => {
  const pythonServoCode = `
  class Servo:
    def __init__(self, pin: int or Pin or PWM, minVal=2500, maxVal=7500):
        if isinstance(pin, int):
            pin = Pin(pin, Pin.OUT)
        if isinstance(pin, Pin):
            self.__pwm = PWM(pin)
        if isinstance(pin, PWM):
            self.__pwm = pin
        self.__pwm.freq(50)
        self.minVal = minVal
        self.maxVal = maxVal

    def goto(self, value: int):
        if value < 0:
            value = 0
        if value > 1024:
            value = 1024
        delta = self.maxVal-self.minVal
        target = int(self.minVal + ((value / 1024) * delta))
        self.__pwm.duty_u16(target)
  `;

  const pythonNumpadCode = `
  def scanKeys():

    matrix_keys = [['1','2','3', 'A'],
                   ['4','5','6', 'B'],
                   ['7','8','9', 'C'],
                   ['*','0','#', 'D']]

    keypad_rows = [2, 3, 4, 5]
    keypad_columns = [6, 7, 8, 9]

    col_pins = []
    row_pins = []

    for x in range(0,4):
        row_pins.append(Pin(keypad_rows[x],Pin.OUT))
        row_pins[x].value(1)
        col_pins.append(Pin(keypad_columns[x],Pin.IN, Pin.PULL_DOWN))
        col_pins[x].value(0)

    for row in range(4):
        for col in range(4):
            row_pins[row].high()
            key = None
            if col_pins[col].value() == 1:
                key_press = int(matrix_keys[row][col])
        row_pins[row].low()

    return key_press
  
  `;

  const pythonMainCode = `
  s1 = Servo(0)
  s2 = Servo(1)
  
  def servo_Map(x, in_min, in_max, out_min, out_max):
      return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min

  def servo_Angle(servo,angle):
      servo.goto(round(servo_Map(angle,0,180,0,1024)))

  while True:
      direct = scanKeys()

      if direct == 1:
          s1_angle += 1
      if direct == 2:
          s1_angle -= 1
      if direct == 4:
          s2_angle += 1
      if direct == 5:
          s2_angle -= 1

      servo_Angle(s1, s1_angle)
      servo_Angle(s2, s2_angle) 

      utime.sleep(.01)
  `;

  return (
    <>
      <Row xs={1} md={1} lg={2} className="g-5 mx-auto my-5">
        <Col xl={5} lg={12} className="mb-3">
          <div className='mb-md-5'>
            <h4 className="mb-3 text-decoration-underline">Servo Movement</h4>
            <p className='pe-lg-5 pe-md-3'>The "Servo" class is designed to facilitate servo motor
              control through pulse width modulation (PWM). Its constructor initializes the class with a
              specified pin, allowing flexibility for both integer and PWM pin inputs. The default frequency
              is set to 50 Hz, and users can customize the minimum and maximum pulse width values. The "goto"
              method enables precise servo positioning by converting a normalized input value to the corresponding
              pulse width and updating the PWM duty cycle accordingly. This class streamlines the configuration
              and movement control of servo motors in the embedded system.
            </p>
          </div>
        </Col>
        <Col xl={7} lg={12}>
          <h6 className="mb-3">servo.py</h6>
          <SyntaxHighlighter language="python" style={solarizedlight}>
            {pythonServoCode}
          </SyntaxHighlighter>
        </Col>
      </Row>

      <Row xs={1} md={1} lg={2} className="g-5 mx-auto my-5">
        <Col xl={5} lg={12} className="mb-3">
          <div className='mb-md-5'>
            <h4 className="mb-3 text-decoration-underline">Numpad Control</h4>
            <p className='pe-lg-5 pe-md-3'>The "scanKeys" function is integral to the numpad control system,
              responsible for reading and returning the value of the pressed key. The function utilizes
              a 4x4 matrix representing the numpad layout, with corresponding row and column pin configurations.
              By scanning through the rows and columns, the function detects the pressed key, returning its
              integer value. This code enables seamless integration of a numpad for manual servo control,
              contributing to the overall functionality of the robotic arm project.
            </p>
          </div>
        </Col>
        <Col xl={7} lg={12}>
          <h6 className="mb-3">numpad.py</h6>
          <SyntaxHighlighter language="python" style={solarizedlight}>
            {pythonNumpadCode}
          </SyntaxHighlighter>
        </Col>
      </Row>

      <Row xs={1} md={1} lg={2} className="g-5 mx-auto my-5">
        <Col xl={5} lg={12} className="mb-3">
          <div className='mb-md-5'>
            <h4 className="mb-3 text-decoration-underline">Main</h4>
            <p className='pe-lg-5 pe-md-3'>This "main.py" script orchestrates the control
              of the robotic arm. It initializes two servo instances, "s1" and "s2," representing
              the joints of the robotic arm. The script includes utility functions like "servo_Map"
              for mapping angles to servo values and "servo_Angle" for positioning the servos based
              on specified angles. The main loop continuously scans the numpad for direction inputs,
              adjusting the angles of "s1" and "s2" accordingly. This real-time servo control loop
              ensures precise movement of the robotic arm.
            </p>
          </div>
        </Col>
        <Col xl={7} lg={12}>
          <h6 className="mb-3">main.py</h6>
          <SyntaxHighlighter language="python" style={solarizedlight}>
            {pythonMainCode}
          </SyntaxHighlighter>
        </Col>
      </Row>
    </>
  );
};

const Analysis = () => (
  <>
    <Row xs={1} md={1} lg={2} className=" my-5 justify-content-between mx-5">
      <Col className="d-flex align-items-center ">
        <div className='mb-md-5'>
          <h4 className="mb-3 text-decoration-underline">Analysis</h4>
          <p className='pe-lg-5 pe-md-3'>An improvement that I would implement into this project is the movement of both motors with one numpad button. 
            Only one servo was specified to move at a time which restricted the movement of the end effector. A command should have been programmed 
            within the while statement in main.py to allow for the increase in angle of both the motors. This would significantly increase the area 
            the end effector could span.  
            
            <br/><br/>
            
            A few challenges were overcome throughout this project.  The first was powering both a 12 volt motor and two 3.3 volt motors with a ~5 
            volt power source without affecting the PWM (pulse width modulation), however this was overcome by implementing a level shifter to keep 
            the PWM consistent while providing enough power to each motor. Another challege that arose was trying to optimize the stability of the 
            end effector without increasing weight too much.
          </p>
        </div>
      </Col>
      <Col xs={12} md={12} lg={3} className='d-flex justify-content-center'>
        <video className='mx-auto' width="70%" height="auto" autoPlay loop muted>
          <source src={robovid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Col>
    </Row>
    <Row xs={1} md={1} lg={2} className="g-5 mx-auto mt-md-5 mt-sm-3 pt-md-5 pt-sm-3 justify-content-center">
        <Col xs={12} md={12} lg={3} className='d-flex justify-content-center'>
          <Figure>
            <h4>Trial 1</h4>
            <Figure.Image src={drawing1} fluid />
            <Figure.Caption>
              <p>This drawing was made manually with one<br /> working servo.</p>
            </Figure.Caption>
          </Figure>
        </Col>
        <Col xs={12} md={12} lg={3} className='d-flex justify-content-center'>
          <Figure>
            <h4>Trial 2</h4>
            <Figure.Image src={drawing2} fluid />
            <Figure.Caption>
              <p>This drawing was made manually with all<br /> servos working.</p>
            </Figure.Caption>
          </Figure>
        </Col>
        <Col xs={12} md={12} lg={3} className='d-flex justify-content-center'>
          <Figure>
            <h4>Trial 3</h4>
            <Figure.Image src={drawing3} fluid />
            <Figure.Caption>
              <p>This drawing was made automatically by<br /> implementing  inverse kinematics and inputting<br /> coordinated for a square.</p>
            </Figure.Caption>
          </Figure>
        </Col>
    </Row>
  </>
);