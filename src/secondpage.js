import React from 'react';
import Image from 'react-bootstrap/esm/Image';
import logo from './images/qbrainxlogo.png';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './App.css';
import Card from 'react-bootstrap/card';

function secondpage() {
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
                <div className='container'>
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
            <Card className="container second_section" style={{width:"45rem",height:"28rem"}}>
                <Card.Body>
                    <Card.Title style={{color:"rgb(0, 67, 133)",fontSize:"23px",padding:"30px"}}>System Campatibility and Permissions</Card.Title>
                    <div className='container heading3'>
                        <div className='row heading4'>
                            <div className='col-12'>
                                <div className='warning_msg'>
                                    Permissions are required as this is a Proctored Test. Please note that you will be monitored via vedio/screen feed during the conduct of this session.
                                </div>
                            </div>
                        </div>
                        <div className='row heading4'>
                            <div className='col-9'>
                                <h6 >System Compatibility</h6>
                                <p style={{color:"rgb(255, 131, 49)",fontSize:"15px"}}>Checking for system compatibility...</p>
                                <p className='paragraph'>Please make sure Grammar or Spell check plugins are not installed in your system, for example Grammarly, LanguageTool, etc.Please disable/uninstall such plugin(s) as your response might not get saved.</p>
                            </div>
                        </div>
                        <div className='row heading4'>
                            
                            <div className='col-9'>
                                <h6 className='para1'>Webcam & Audio Permissions</h6>
                            </div>
                        </div>
                        <div className='row heading4'>
                            
                            <div className='col-9'>
                                <h6 className='para1'>Screen Sharing Permissions</h6>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    </Row>
  )
}

export default secondpage;