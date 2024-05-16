import React, { useState, useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import logo from './images/qbrainxlogo.png';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './App.css';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function IdentityCheck() {
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSuccess(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleClick = () => {
        navigate('/quiz');
    };

    return (
        <Row className="third_section">
            <Col className='colm4'>
                <div className='colm5'>
                    <Image src={logo} alt="QBRAINX" className='logoimage' style={{ height: "40px", width: "150px", background: "white" }} />
                    <br></br>
                    <br></br>
                    <h5 className='heading1'>LTI_Assessment Preliminary</h5>
                    <hr className='hrline' />
                    <h6 className='heading1'>Hi Krishna Kumar!</h6>
                    <p className='heading1'>Welcome to the online assessment platform</p>
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
                <Card className="second_section" style={{ width: "45rem", height: "28rem" }}>
                    <Card.Body>
                        <Card.Title style={{ color: "rgb(0, 67, 133)", fontSize: "23px" }}>Identity Check</Card.Title>
                        {!isSuccess ? (
                            <div className='container loader'>
                                <Spinner animation="border" className="custom-spinner-border" /><br></br>
                                <span style={{ color: "#757575", fontStyle: "italic" }}>Submitting your photo and ID card for validation</span>
                            </div>
                        ) : (
                            <div className='container loader'>
                                <BsFillCheckCircleFill
                                    style={{ backgroundColor: '#FFFFF', color: '#25AF64', borderRadius: '50%', fontSize: '2rem' }}
                                /><br></br>
                                <span style={{ color: "#004385", fontWeight: "bold", fontSize: "22px",marginTop:"20px" }}>Your identity check is successful!</span><br></br>
                                <Button onClick={handleClick} style={{ width: "300px", backgroundColor: "rgb(8, 168, 249)", borderRadius: "0", marginTop: "160px" }}>
                                    Proceed to Select Test Section</Button>
                            </div>
                        )}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default IdentityCheck;
