import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';

function Data() {
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [screenStream, setScreenStream] = useState(null);

    const intialstate= () => ({
        systemCheck:false,
        webCamAndMic:false,
        screenShare:false
    })
    const [systemChecks,setsystemChecks] =useState(intialstate);
    // useEffect(() => {
    //     const delay = 6000;

    //     const timer = setTimeout(() => {
    //         setLoading(false); // Set loading to false after the delay
    //         setShowMessage(true); // Show additional message after the delay
    //     }, delay);

    //     return () => clearTimeout(timer);
    // }, []);

    const startScreenSharing = async () => {
        //setIsLoading(true);

        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            console.log(stream);
           // setScreenStream(stream);
           setsystemChecks((pv)=> ({
            ...pv,
            screenShare:stream.active
           }))
        } catch (err) {
            console.error('Error accessing screen:', err);
        } 
    };

    return (
        <div className="row heading4">
            <div className="col-12">
                <div className="row">
                    <div className="col-1 spinnertick">
                        {!systemChecks.screenShare ? (
                            <div>
                                <div className="row">
                                    <Spinner className="spinner" animation="border" variant="primary" />
                                </div>
                                <div className="row" style={{ width: "500px" }}>
                                    <p style={{ color: "rgb(255, 131, 49)", fontSize: "13px", marginLeft: "28px" }}>Checking for system compatibility...</p>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <span style={{ fontSize: "20px", color: "green" }}>&#10004;</span>
                                <br />
                                <p style={{ marginLeft: "30px", width: "500px" }}>Screen Share Permissions available.</p>
                            </div>
                        )}
                    </div>
                    <div className="col-11 para1">
                        <p>System Compatibility</p>
                    </div>
                </div>
                <p className="paragraph">Please click on Start Screen Capture button below.</p>
                
                {/* Conditionally render Start Screen Sharing button if not loading */}
                { (
                    <button onClick={startScreenSharing} style={{ display: 'block' }}>
                        Start Screen Sharing
                    </button>
                )}
            </div>
            {showMessage && (
                <div className="col-12">
                    <p></p>
                </div>
            )}
        </div>
    );
}

export default Data;
