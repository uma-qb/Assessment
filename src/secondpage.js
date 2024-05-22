import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import logo from './images/qbrainxlogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './App.css';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function Secondpage() {
    
    const intialstate= () => ({
        checkStart:0,
        browserversion:false,
        webCamAndMic:false,
        screenShare:false
    })
    const [systemChecks,setsystemChecks] =useState(intialstate);


    async function checkInternetSpeed() {
        if (navigator.connection && navigator.connection.downlink) {
          const downlinkSpeedMbps = navigator.connection.downlink;
          
          if (downlinkSpeedMbps >= 1) {
            console.log('Internet speed is sufficient.');
            return true;
          } else {
            console.log('Internet speed is insufficient.');
            return false;
          }
        } else {
          console.error('Network information not available.');
          return false;
        }
      }
    async function getLatestBrowserVersions() {
      
      
          const latestVersions = {
            'Chrome': 113,
            'Firefox': 112,
            'Safari': 16,
            'Edge': 113
          };
      
          return latestVersions;
        
      }
      
      function getBrowserInfo() {
        const userAgent = navigator.userAgent;
        let match = userAgent.match(/(Chrome|Firefox|Safari|Edg)\/(\d+)/);
        if (!match) {
          return null;
        }
    
        return {
            name: match[1],
            version: parseInt(match[2], 10)
          };
      }
      
      async function isWithinLastThreeVersions() {
        const latestVersions = await getLatestBrowserVersions();
        if (!latestVersions) {
          return false;
        }
      
        const browserInfo = getBrowserInfo();
        if (!browserInfo || !latestVersions[browserInfo.name]) {
          return false;
        }
      
        const currentVersion = latestVersions[browserInfo.name];
        return browserInfo.version >= currentVersion - 2;
      }
      
      async function browserCheck() {
        const speedIsSufficient = await checkInternetSpeed();

        if (speedIsSufficient) {
           const isUpToDate = await isWithinLastThreeVersions();
          if (isUpToDate) {
            console.log('Your browser is up-to-date.');
            return true;
          } else {
            console.log('Your browser is not within the last three versions.');
            return false;
          }
        } 
        return false;
      }
     

    useEffect(() => {
      
      setTimeout(async() => {
         
        const browserChecks= await browserCheck();
        console.log(browserChecks);
        setsystemChecks((pv)=> ({
            ...pv,
            checkStart:1,
            browserversion:browserChecks
           }))
             }, 5000);
       
    }, []);
 
    useEffect(() => {
        if (systemChecks.browserversion) {
            setTimeout(async() => {
                setsystemChecks((pv)=> ({
                    ...pv,
                    checkStart:2,
                    webCamAndMic:true
                   }))
                     }, 0);
        }
    }, [systemChecks.browserversion]);

    useEffect(() => {
        if (systemChecks.webCamAndMic) {
            setTimeout(async() => {
         
                const browserChecks= await browserCheck();
                console.log(browserChecks);
                setsystemChecks((pv)=> ({
                    ...pv,
                    checkStart:3,
                    screenShare:true
                   }))
                     }, 5000);
        }
    }, [systemChecks.webCamAndMic]);

    const [loading, setLoading] = useState(true);
    const [isSharing, setIsSharing] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [screenStream, setScreenStream] = useState(null);
    const [paragraphText, setParagraphText] = useState('Please click on Start Screen Capture button below.');

    // useEffect(() => {
    //     const delay = 6000;
    //     const timer = setTimeout(() => {
    //         setLoading(false);
    //         setShowMessage(true);
    //     }, delay);

    //     return () => clearTimeout(timer);
    // }, []);

    const startScreenSharing = async () => {
        setIsSharing(true);
        setParagraphText('Click on the ‘Hide’ Button shown below for better visibility.');
 
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            console.log(stream);
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

 useEffect(() => {
    console.log("hi");
    console.log(screenStream);
        return () => {
            if (screenStream) {
                screenStream.getTracks().forEach(track => track.stop());

            }
        };

      
    }, [screenStream]);

    function disabled()
    {
       return systemChecks.checkStart===3&&
       systemChecks.browserversion&&
       systemChecks.webCamAndMic&&
       systemChecks.screenShare
    }

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/webcam");
    };

    return (
        <Row className="third_section">
            <Col className='colm4'>
                <div className='colm5'>
                    <Image src={logo} alt="QBRAINX" className='logoimage' style={{ height: "40px", width: "150px" }} />
                    <br /><br />
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
                    <br /><br />
                </div>
            </Col>
            <Col className='colm6'>
                <Card className="second_section" style={{ width: "45rem", height: "28rem" }}>
                    <Card.Body>
                        <Card.Title style={{ color: "rgb(0, 67, 133)", fontSize: "23px",marginLeft:"15px" }}>System Compatibility and Permissions</Card.Title>
                        <div className='heading3'>
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
                                            {systemChecks.checkStart==0 && !systemChecks.browserversion? (
                                                <div>
                                                    <div className='row'>
                                                        <Spinner className="custom-spinner-secondpage-border" animation="border" variant="primary" />
                                                    </div>
                                                    <div className='row' style={{ width: "500px" }}>
                                                        <p style={{ color: "rgb(255, 131, 49)", fontSize: "13px"}}>Checking for system compatibility...</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <span style={{ fontSize: "20px", color: "green" }}>&#10004;</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className='col-11' style={{ textAlign: "left" }}>
                                            <p>System Compatibility</p>
                                        </div>
                                    </div>
                                    <p className='paragraph' style={{ marginLeft: "30px", textAlign: "left" }}>Please make sure Grammar or Spell check plugins are not installed in your system, for example Grammarly, LanguageTool, etc. Please disable/uninstall such plugin(s) as your response might not get saved.</p>
                                </div>
                            </div>
 
                            <div className="row heading4">
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-1 spinnertick">
                                            { systemChecks.checkStart===2 && !systemChecks.screenShare? (
                                                <div>
                                                    <div className="row">
                                                        <Spinner className="custom-spinner-secondpage-border" animation="border" variant="primary" />
                                                    </div>
                                                    <div className="row" style={{ width: "500px" }}>
                                                        <p style={{ color: "rgb(255, 131, 49)", fontSize: "13px", marginLeft: "28px", textAlign: "left" }}>Requesting Screen Share Permissions...</p>
                                                    </div>
                                                </div>
                                            ) : systemChecks.checkStart===3 && systemChecks.screenShare?(
                                                <div>
                                                    <span style={{ fontSize: "20px", color: "green" }}>&#10004;</span>
                                                    <FontAwesomeIcon icon="fa-solid fa-check" />
                                                    <br />
                                                    <p style={{ marginLeft: "30px", width: "500px", textAlign: "left" }} className='paragraph'>Screen Share Permissions available.</p>
                                                </div>
                                            ):null}
                                        </div>
                                        <div className="col-11" style={{ textAlign: "left" }}>
                                            <p>Screen Sharing Permission</p>
                                        </div>
                                    </div>
                                    <p className="paragraph" style={{ marginLeft: "30px", textAlign: "left" }}>{paragraphText}</p>
                                    {systemChecks.screenShare && (
                                        <Button onClick={startScreenSharing} style={{backgroundColor: "rgb(0, 67, 133)", color: "white", border: "none", height: "30px",marginRight:'410px'}}>
                                            Start Screen Capture
                                        </Button>
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
                    <Button style={{ width: "280px", marginLeft: "200px" }} disabled={!disabled()} onClick={handleClick}>Proceed to Identity Check</Button>
                </Card>
            </Col>
        </Row>
    );
}
 
export default Secondpage;