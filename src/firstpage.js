import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import logo from './images/qbrainxlogo.png';
import modemimage from './images/modemimage.webp';
import refreshimage from './images/refreshimage.jpg';
import autosaveimage from './images/autosaveimages.png';
import './App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { useNavigate } from "react-router-dom";

function Firstpage(){

    const navigate = useNavigate()

    const handleClick=()=>{
        navigate("/secondpage");
  }
    return(
        <div style={{minHeight:"100vh"}}>
            <Row className="first_section">
                <Col className='colm1'>
                    <div className='colm2'>
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
                        <Button onClick={handleClick} style={{width:"400px",backgroundColor:"rgb(8, 168, 249)"}}>Proceed to System Check</Button>
                    </div>
                </Col>
                <Col className='colm3'>
                    <Card className="container second_section" style={{width:"45rem",height:"28rem"}}>
                        <Card.Body>
                            <Card.Title style={{padding:"30px"}}>Important Note</Card.Title>
                            <div className='container heading3'>
                                <div className='row heading4'>
                                    <div className='col-2'>
                                        <Image src={modemimage} className='logo1' alt="warning"/>
                                    </div>
                                    <div className='col-9'>
                                        <h6 className='para'>Internet Connectivity</h6>
                                        <p className='paragraph'>Ensure that you have a stable internet conection with a minimum speed of 512 kbps</p>
                                    </div>
                                </div>
                                <div className='row heading4'>
                                    <div className='col-2'>
                                        <Image src={refreshimage} className='logo1' alt="warning"/>
                                    </div>
                                    <div className='col-9'>
                                        <h6 className='para'>Don't Refresh</h6>
                                        <p className='paragraph'>Don't refresh the webpage during the assessment. This will lead to immediate submission of your responses.</p>
                                    </div>
                                </div>
                                <div className='row heading4'>
                                    <div className='col-2'>
                                        <Image src={autosaveimage} className='logo1' alt="warning"/>
                                    </div>
                                    <div className='col-9'>
                                        <h6 className='para'>Auto Save</h6>
                                        <p className='paragraph'>All your responses are saved automatically. In case of disconnection or shutdown,you will still be able to resume easily.</p>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Firstpage;