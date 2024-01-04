import React from 'react';
import { Offcanvas } from 'react-bootstrap';

const RoboDraw = ({ show, handleClose }) => {
  return (
    <Offcanvas show={show} onHide={handleClose} placement='end'>
      <Offcanvas.Header className='px-5 pt-4'  closeButton>
        <Offcanvas.Title><h1>RoboDraw</h1></Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className='px-5 pt-4' >
        <p>Details for Project C go here.</p>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default RoboDraw;
