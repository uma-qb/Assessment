import React,{useState} from 'react';
import Image from 'react-bootstrap/esm/Image';
// import logo from './images/qbrainxlogo.png';
import logo from './../images/qbrainxlogo.png';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './../App.css';
import Card from 'react-bootstrap/card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";


function Quizpage() {

    const sections = [
        { title: '1', questions: 10, duration : '30 minutes' },
        { title: '2', questions: 10, duration : '30 minutes' },
        { title: '3', questions: 10, duration : 'Untimed*' },
        { title: '4', questions: 10, duration : 'Untimed' }
      ];

  const [selectedSection, setSelectedSection] = useState(()=>-1);

  const handleRadioChange = (index) => {
    setSelectedSection(index);
  };

  const navigate = useNavigate()

  const handleStartTest = () => {
    if (selectedSection !== null) {
      const selectedSectionInfo = sections[selectedSection];
      console.log(`Start test for Section ${selectedSectionInfo.title}`);
      // Perform further actions based on the selected section
      navigate("/quizproceed");
    }
  };
  
  return (
    <Row className="third_section">
        <Col className='colm4'>
            <div className='colm5'>
                <Image src={logo} alt="QBRAINX" className='logoimage' style={{ height:"40px",width:"150px",background:"white"}}/>
                <br></br>
                <br></br>
                <h5 className='heading1'>LTI_Assessment Preliminary</h5>
                <hr className='hrline' />
                <h6 className='heading1'>Hi Krishna Kumar!</h6>
                <p className='heading1'>Welcome to online assessment platform</p>
                <div>
                    <div className='row'>
                        <div className='col-3'>
                            <p className='heading2'>Questions:</p>
                        </div>
                        <div className='col-3'>
                            <p className='heading2'>Sections:</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3'>
                            <p className='heading2'>50</p>
                        </div>
                        <div className='col-3'>
                            <p className='heading2'>4</p>
                        </div>
                    </div>
                    <div className='row'>
                        <p className='heading2'>Test Duration:</p>
                    </div>
                    <div className='row'>
                        <p className='heading2'>1 Hour 20 Minutes</p>
                    </div>
                </div>    
                <br></br>
                <br></br>
            </div>
        </Col>
        <Col className='colm6'>
            <Card className="second_section" style={{width:"45rem",height:"30rem"}}>
                <Card.Body>
                    <Card.Title style={{color:"rgb(0, 67, 133)",fontSize:"20px"}}>
                        <p style={{borderBottom:"1px solid black",paddingTop:"10px",paddingBottom:"10px"}}>You are all done and ready!</p>
                        <h6 style={{color:"black",fontWeight:"400",fontSize:"15px"}}>Select the section you like to begin the test with and click on “Start Test” 
                           button. Or you can navigate within sections once you start the test.</h6>
                    </Card.Title>
                    
                    <Form>
                        {sections.map((section, index) => (
                            <div key={`section-${index}`} style={{borderBottom:"1px solid black",paddingBottom:"8px",paddingTop:"8px"}}>
                                <Form.Check
                                    inline
                                    label={
                                    <div>
                                        <p style={{fontSize:"16px",margin:"0",lineheight:"1.4"}} className="Title">{`Section Title ${section.title}`}</p>
                                        <p style={{fontSize:"13px",margin:"0"}}>{`Questions : ${section.questions}  \u2022  Duration : ${section.duration}`}</p>
                                    </div>
                                    }
                                    name="group1"
                                    type="radio"
                                    id={`inline-radio-${index + 1}`}
                                    onChange={() => handleRadioChange(index)}
                                />
                            </div>
                        ))}
                    </Form>
                    <div>
                    <Button 
                    style={{width:"300px",marginLeft:"200px",marginTop:"40px"}}
                     variant="primary"  onClick={handleStartTest}
                     disabled={selectedSection === -1}>Start Test</Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    </Row>
  )
}

export default Quizpage;