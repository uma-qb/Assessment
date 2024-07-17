import React, { useState, useEffect, useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import logo from './images/qbrainxlogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './App.css';
import { useLocation, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import BgLayout from './Components/BgLayout';
import UserContext from './UserContext';

const Secondpage = () => {
    const location = useLocation();
    const { userData } = useContext(UserContext)
    const responseData = userData;
    console.log(responseData)

    const intialstate = () => ({
        checkStart: 0,
        browserversion: false,
        webCamAndMic: false,
        screenShare: false,
        InternetSpeed: false,

    })
    const [systemChecks, setsystemChecks] = useState(intialstate);

    const updateSystemChecks = (key, value) => {
        setsystemChecks((prevState) => ({
          ...prevState,
          [key]: value,
        }));
      };

    async function checkInternetSpeed() {
        if (navigator.connection && navigator.connection.downlink) {
            const downlinkSpeedMbps = navigator.connection.downlink;
            console.log(downlinkSpeedMbps)
            if (downlinkSpeedMbps >= 1) {
                console.log('Internet speed is sufficient.');
                updateSystemChecks('InternetSpeed', true);
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
            'Chrome': 113, // 130
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
        console.log(browserInfo)
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
                updateSystemChecks('browserversion', true);
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

        setTimeout(async () => {
            const browserChecks = await browserCheck();
            updateSystemChecks('checkStart', 1);
        }, 5000);

    }, []);

    useEffect(() => {
        if (systemChecks.browserversion) {
            setTimeout(async () => {
                setsystemChecks((pv) => ({
                    ...pv,
                    checkStart: 2,
                    webCamAndMic: true
                }))
            }, 0);
        }
    }, [systemChecks.browserversion]);

    useEffect(() => {
        if (systemChecks.webCamAndMic) {
            setTimeout(async () => {

                const browserChecks = await browserCheck();
                console.log(browserChecks);
                setsystemChecks((pv) => ({
                    ...pv,
                    checkStart: 3,
                    screenShare: true
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

    function disabled() {
        return systemChecks.checkStart === 3 &&
            systemChecks.browserversion &&
            systemChecks.webCamAndMic &&
            systemChecks.screenShare
    }

    const navigate = useNavigate();

    const handleClick = () => {
        if (responseData.identity_check == 1) {
            navigate("/webcam", { state: { responseData } });
        } else {
            navigate("/quiz", { state: { responseData } });
        }
        // navigate("/webcam");
    };

    return (
        <Row className="third_section">
            <Col className='colm4'>
                <div className='colm5'>
                    <BgLayout details={responseData} />
                    <Button className="mt-4" style={{ width: "280px" }} disabled={!disabled()} onClick={handleClick}>{responseData.identity_check ? 'Proceed to Identity Check' : 'Proceed to Quiz'}</Button>
                </div>
            </Col>
            <Col className='colm6'>
                <Card className="second_section" style={{ width: "45rem", height: "28rem" }}>
                    <Card.Body>
                        <Card.Title style={{ color: "rgb(0, 67, 133)", fontSize: "23px", marginLeft: "15px" }}>System Compatibility and Permissions</Card.Title>
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
                                            {systemChecks.checkStart === 0 && !systemChecks.browserversion ? (
                                                <div>
                                                    <div className='row'>
                                                        <Spinner className="custom-spinner-secondpage-border" animation="border" variant="primary" />
                                                    </div>
                                                    <div className='row' style={{ width: "500px" }}>
                                                        <p style={{ color: "rgb(255, 131, 49)", fontSize: "13px" }}>Checking for system compatibility...</p>
                                                    </div>
                                                </div>
                                            ) : systemChecks.checkStart === 1 && !systemChecks.browserversion ? (
                                                <div>
                                                    <span style={{ fontSize: "20px", color: "red" }}>❌</span>
                                                </div>
                                            ) : (
                                                <div>
                                                    <span style={{ fontSize: "20px", color: "red" }}>&#10004;</span>
                                                </div>
                                            )}

                                        </div>
                                        <div className='col-11' style={{ textAlign: "left" }}>
                                            <p>System Compatibility</p>
                                        </div>
                                    </div>
                                    <p className='paragraph' style={{ marginLeft: "30px", textAlign: "left" }}>Please make sure Grammar or Spell check plugins are not installed in your system, for example Grammarly, LanguageTool, etc. Please disable/uninstall such plugin(s) as your response might not get saved.</p>
                                    {(systemChecks.checkStart === 1 && !systemChecks.InternetSpeed) && (<small className='text-danger d-sm-block fw-medium px-4'>Internet Speed is Insufficient!.</small>)}
                                    {(systemChecks.checkStart === 1 && !systemChecks.browserversion) && (<small className='text-danger d-sm-block fw-medium px-4'>Incompatible Browser Version. Please Upgrade Your Browser.</small>)}
                                </div>
                            </div>

                            <div className="row heading4">
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-1 spinnertick">
                                            {systemChecks.checkStart === 2 && !systemChecks.screenShare ? (
                                                <div>
                                                    <div className="row">
                                                        <Spinner className="custom-spinner-secondpage-border" animation="border" variant="primary" />
                                                    </div>
                                                    <div className="row" style={{ width: "500px" }}>
                                                        <p style={{ color: "rgb(255, 131, 49)", fontSize: "13px", marginLeft: "28px", textAlign: "left" }}>Requesting Screen Share Permissions...</p>
                                                    </div>
                                                </div>
                                            ) : systemChecks.checkStart === 3 && systemChecks.screenShare ? (
                                                <div>
                                                    <span style={{ fontSize: "20px", color: "green" }}>&#10004;</span>
                                                    <FontAwesomeIcon icon="fa-solid fa-check" />
                                                    <br />
                                                    <p style={{ marginLeft: "30px", width: "500px", textAlign: "left" }} className='paragraph'>Screen Share Permissions available.</p>
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className="col-11" style={{ textAlign: "left" }}>
                                            <p>Screen Sharing Permission</p>
                                        </div>
                                    </div>
                                    <p className="paragraph" style={{ marginLeft: "30px", textAlign: "left" }}>{paragraphText}</p>
                                    {systemChecks.screenShare && (
                                        <Button onClick={startScreenSharing} style={{ backgroundColor: "rgb(0, 67, 133)", color: "white", border: "none", height: "30px", marginRight: '410px' }}>
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

                </Card>
            </Col>
        </Row>
    );
}

export default Secondpage;