import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import logo from './images/qbrainxlogo.png';
import './App.css';

function Secondpage() {
    // System accessibility
    const [isLoading, setIsLoading] = useState(true);
    const [isSecondLoading, setIsSecondLoading] = useState(false);
    const [browserInfo, setBrowserInfo] = useState('');

    useEffect(() => {
        const checkBrowser = () => {
            const userAgent = navigator.userAgent;
            setBrowserInfo(userAgent);
            setTimeout(() => {
                setIsLoading(false);
                setIsSecondLoading(true); // Start the second spinner when the first one completes
            }, 5000);
        };
        checkBrowser();
    }, []);

    useEffect(() => {
        if (isSecondLoading) {
            const timer = setTimeout(() => {
                setIsSecondLoading(false);
            }, 5000); // Simulate second loading duration
            return () => clearTimeout(timer);
        }
    }, [isSecondLoading]);

    // Screen sharing
    const [loading, setLoading] = useState(true);
    const [isSharing, setIsSharing] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [screenStream, setScreenStream] = useState(null);
    const [paragraphText, setParagraphText] = useState('Please click on Start Screen Capture button below.');

    useEffect(() => {
        // Simulate a delay of 6000 milliseconds (6 seconds)
        const delay = 6000;

        // Set a timer to execute after the delay
        const timer = setTimeout(() => {
            setLoading(false); // Update loading state to indicate loading has finished
            setShowMessage(true); // Update state to show the message after delay
        }, delay);

        // Clean up the timer on component unmount or if dependencies change
        return () => clearTimeout(timer);
    }, []); // Empty dependency array means this effect runs only once after initial render

    const startScreenSharing = async () => {
        setIsSharing(true);
        setParagraphText('Click on the ‘Hide’ Button shown below for better visibility.');

        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            setScreenStream(stream);
        } catch (err) {
            console.error('Error accessing screen:', err);
            setIsSharing(false);
        }
    };

    useEffect(() => {
        return () => {
            if (screenStream) {
                screenStream.getTracks().forEach(track => track.stop());
            }
        };
    }, [screenStream]);

    return (
        <Row className="third_section">
            <Col className='colm4'>
                <div className='colm5'>
                    <Image src={logo} alt="QBRAINX" className='logoimage' style={{ height: "40px", width: "150px", background: "white" }} />
                    <br /><br />
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
                    <br /><br />
                </div>
            </Col>
            <Col className='colm6'>
                <Card className="container second_section" style={{ width: "45rem", height: "28rem" }}>
                    <Card.Body>
                        <Card.Title style={{ color: "rgb(0, 67, 133)", fontSize: "23px", padding: "10px" }}>System Compatibility and Permissions</Card.Title>
                        <div className='container heading3'>
                            <div className='row heading4'>
                                <div className='col-12'>
                                    <div className='warning_msg'>
                                        Permissions are required as this is a Proctored Test. Please note that you will be monitored via video/screen feed during the conduct of this session.
                                    </div>
                                </div>
                            </div>
                            <div className='row heading4'>
                                <div className='col-12'>
                                    <div className='row'>
                                        <div className='col-1 spinnertick'>
                                            {isLoading ? (
                                                <div>
                                                    <div className='row'>
                                                        <Spinner className="spinner" animation="border" variant="primary" />
                                                    </div>
                                                    <div className='row' style={{ width: "500px" }}>
                                                        <p style={{ color: "rgb(255, 131, 49)", fontSize: "13px", marginLeft: "28px" }}>Checking for system compatibility...</p>
                                                    </div>
                                                </div>
                                            ) : isSecondLoading ? (
                                                <div>
                                                    <div className='row'>
                                                        <Spinner className="spinner" animation="border" variant="secondary" />
                                                    </div>
                                                    <div className='row' style={{ width: "500px" }}>
                                                        <p style={{ color: "rgb(255, 131, 49)", fontSize: "13px", marginLeft: "28px" }}>Checking additional compatibility...</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <span style={{ fontSize: "20px", color: "green" }}>&#10004;</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className='col-11 para1'>
                                            <p>System Compatibility</p>
                                        </div>
                                    </div>
                                    <p className='paragraph' style={{marginLeft:"30px"}}>Please make sure Grammar or Spell check plugins are not installed in your system, for example Grammarly, LanguageTool, etc. Please disable/uninstall such plugin(s) as your response might not get saved.</p>
                                </div>
                            </div>

                            <div className="row heading4">
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-1 spinnertick">
                                            {loading ? (
                                                <div>
                                                    <div className="row">
                                                        <Spinner className="spinner" animation="border" variant="primary" />
                                                    </div>
                                                    <div className="row" style={{ width: "500px" }}>
                                                        <p style={{ color: "rgb(255, 131, 49)", fontSize: "13px", marginLeft: "28px" }}>Requesting Screen Share Permissions...</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <span style={{ fontSize: "20px", color: "green" }}>&#10004;</span>
                                                    <br />
                                                    <p style={{ marginLeft: "30px", width: "500px" }} className='paragraph'>Screen Share Permissions available.</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-11 para1">
                                            <p>Screen Sharing Permission</p>
                                        </div>
                                    </div>
                                    <p className="paragraph" style={{ marginLeft: "30px" }}>{paragraphText}</p>
                                    {!isSharing && (
                                        <button onClick={startScreenSharing} style={{ marginLeft: "30px", backgroundColor: "rgb(0, 67, 133)", color: "white", border: "none", height: "30px" }}>
                                            Start Screen Capture
                                        </button>
                                    )}
                                </div>
                                {showMessage && (
                                    <div className="col-12">
                                        {/* Display any additional message or content after the delay */}
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default Secondpage;
