import React, { useState, useEffect } from 'react';
import "./contact.css"
import Offcanvas from 'react-bootstrap/Offcanvas';
import emailjs from 'emailjs-com';

const Contact = ({ show, handleCloseContact }) => {
    const [placement, setPlacement] = useState('end');

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

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {};

        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        console.log('Form data:', data);
        
        emailjs.send('service_l5qjskk', 'template_jlsf6n9', data, 'dNK6Xy9ofi6C-jCwC')
        .then((response) => {
            window.alert('Email sent successfully. Jake will contact you as soon as possible.');
            window.location.reload();
        })
        .catch((error) => {
            console.error('Failed to send email', error);
            window.alert('Failed to send email. Please try again.');
        });
    };

    return (
        <>
            <Offcanvas show={show} onHide={handleCloseContact} placement={placement}>
                <Offcanvas.Header className='px-5 pt-4' closeButton>
                    <Offcanvas.Title><h1>Contact</h1></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className=' d-flex align-items-center justify-content-center'>
                            <form onSubmit={handleFormSubmit} className='mx-auto' style={{ display: 'flex', flexDirection: 'column', maxWidth: '1000px' }}>
                                {/* <div className='d-flex'> */}
                                <h3>
                                    <span>Hi, my name is </span>
                                    <input className='ms-md-4 contact-input-container' id='name' name='name' placeholder='John Doe' autoComplete='off' required/>
                                    <span>. I am contacting you about</span>
                                    <input className='ms-md-4 contact-input-container subject' id='subject' name='subject' placeholder='Website, Networking, Employment' autoComplete='off' required/>
                                    <span>. You can contact me at</span>
                                    <input className='ms-md-4 contact-input-container' id='email' name='email' type='email' placeholder='johndoe@example.com' autoComplete='off' required/>
                                    <span>. Thank you!</span>

                                </h3>

                                <div className='d-flex justify-content-end mt-5'><button type='submit'><h4>Submit</h4></button></div>
                                {/* </div> */}
                            </form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Contact
