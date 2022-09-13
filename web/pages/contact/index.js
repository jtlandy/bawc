import { Container, Row, Form, Modal} from "react-bootstrap";
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Header from "../../components/layout/header/header";
import Layout from "../../components/layout";

export default function Contact() {
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false);

  const form = useRef();

  const handleReset = () => {
    form.current.reset();
    setValidated(false);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_hsa2qdm', 'template_hkdfslv', form.current, 'u7nB8pnz3LvK4tUA1')
      .then((result) => {
        console.log(result.text);
        setShow(true)
        setValidated(true);
        handleReset();
      }, (error) => {
        console.log(error.text);
      });
  };

  return (
    <div className="ComingSoon">
      <Layout>
      <Container fluid className="mt-5 max-800">
        <Row className="mt-5 justify-content-center">
          <h1 className="text-center text-white">Contact Us</h1>
          <div className="card shadow-sm border-0 px-3 rounded-2 py-4 mx-auto mt-5 bg-form text-white">
            <div className="card-header bg-transparent border-0 text-left">
              <p>{"We'd love to hear from you, please use this form to reach out to us and we will get back to you as soon as possible."}</p>
            </div>
            <div className="card-body">
              <Form action="/" ref={form} validated={validated} onSubmit={sendEmail} encType="multipart/form-data" autoComplete="off">
                <div className="form-group row mb-3">
                  <div className="col-6">
                    <label className="mb-0">Full Name<span className="text-danger">*</span></label>
                    <input name="full_name" type="text" className="form-control" placeholder="Name" required/>
                  </div>
                  <div className="col-6">
                    <label className="mb-0">Your email<span className="text-danger">*</span></label>
                    <input name="email" type="email" className="form-control" placeholder="Email" required/>
                  </div>
                </div>
                <div className="form-group row my-3">
                  <div className="col-6">
                    <label className="mb-0">Your contact number(optional)</label>
                    <input name="phone" type="text" className="form-control" placeholder="Number"/>
                  </div>
                  <div className="col-6">
                    <label className="mb-0">Organization<span className="text-danger">*</span></label>
                    <input name="organisation" type="text" className="form-control" placeholder="Organization" required/>
                  </div>
                </div>
                <div className="form-group my-3">
                  <label className="mb-0">Message<span className="text-danger">*</span></label>
                  <textarea name="content" rows="5" className="form-control" placeholder="Message" required/>
                </div>
                <p className="text-right mt-5">
                  <input type="submit" className="action-btn btn btn-lg joinList lazy btn btn-primary text-uppercase" value="Submit Now" />
                </p>
              </Form>
            </div>
          </div>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Thanks for reaching out to us. One of our team members will get back to you very soon!</p>
        </Modal.Body>
      </Modal>
      </Layout>
      
    </div>
  );
}
