import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function WebCam() {
    const location = useLocation();
    const {responseData} = location.state || {}
    const [isCameraEnabled, setIsCameraEnabled] = useState(false);
    const [isAudioEnabled, setIsAudioEnabled] = useState(false);
    const [error, setError] = useState(null);
    const [stream, setStream] = useState(null);

    useEffect(() => {
        return () => {
            // Clean up the stream when the component unmounts
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [stream]);

    const requestPermissions = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(mediaStream);
            setIsCameraEnabled(true);
            setIsAudioEnabled(true);
            setError(null);

            // Attach the media stream to a video element to show the webcam feed
            const videoElement = document.querySelector('video');
            if (videoElement) {
                videoElement.srcObject = mediaStream;
                videoElement.play();
            }
        } catch (err) {
            setError('Failed to access camera and microphone: ' + err.message);
            setIsCameraEnabled(false);
            setIsAudioEnabled(false);
        }
    };

    const stopMedia = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
            setIsCameraEnabled(false);
            setIsAudioEnabled(false);
        }
    };

    return (
        <div>
            <h1>Webcam and Audio Permissions</h1>
            <button onClick={requestPermissions} disabled={isCameraEnabled && isAudioEnabled}>
                Start Camera and Microphone
            </button>
            <button onClick={stopMedia} disabled={!isCameraEnabled && !isAudioEnabled}>
                Stop Camera and Microphone
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <video autoPlay style={{ width: '500px', height: 'auto', marginTop: '20px' }}></video>
        </div>
    );
}

export default WebCam;
