import React, { useState, useEffect } from 'react';
import '../App.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const CalculateModel = (props) => {
  const [show, setShow] = useState(false);

  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (props.successResponse != "" ) {
        setTimeout(function() {
            setShow(false)
        }, 5000);
    }
  }, [props.successResponse]);  

  return (
    <>
      <Button variant="light" onClick={handleShow}>
        Launch Calculator
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Calculate Shipping Box</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Please input your dimensions.
            <>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Length</InputGroup.Text>
                    <Form.Control
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="26"                  
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text>Width</InputGroup.Text>
                    <Form.Control
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="16"
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text>Height</InputGroup.Text>
                    <Form.Control
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="22"
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text>Weight</InputGroup.Text>
                    <Form.Control
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="50"
                    />
                </InputGroup>
            </>

            <div className='error-message'>{props.errorResponse}</div>

            { 
                props.successResponse && <div>We recommend: <span className='success-message'>{props.successResponse}</span></div>
            }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => props.submitDimensions(length, width, height, weight)}>Calculate</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CalculateModel;