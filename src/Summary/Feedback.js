import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Feedback = () => {
  const handleSubmit = () => {
    alert('Test completed successfully');
  };
       
  return (
    <div>
      <div className="heading">
        Feedback
      </div>
      <hr className='hrLine' />
      <div style={{ margin: "25px" }}>
        <InputGroup>
          <InputGroup.Text>With textarea</InputGroup.Text>
          <Form.Control as="textarea" aria-label="With textarea" />
        </InputGroup>
      </div>
      <Button onClick={handleSubmit} style={{ margin: "20px", textAlign: "center" }}>
        Submit
      </Button>
    </div>
  );
}

export default Feedback;
