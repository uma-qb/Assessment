import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';

function ScreenSharingPermission() {
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
    );
}

export default ScreenSharingPermission;
