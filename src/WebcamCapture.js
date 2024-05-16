import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import Image from 'react-bootstrap/Image';
import logo from './images/qbrainxlogo.png';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { BsInfoCircleFill } from "react-icons/bs";
import studentFace from './images/studentFace.png';
import idCard from './images/IdCard.jpg';
import './App.css'

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [idCardSrc, setIdCardSrc] = useState(null);
  const [isCapturingFace, setIsCapturingFace] = useState(true);
  const [faceBox, setFaceBox] = useState(null);
  

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      console.log('Face detection models loaded');
    };
    loadModels();

    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => console.log('Camera permission granted'))
      .catch(err => console.error('Camera permission denied', err));
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      detectFace();
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  const detectFace = async () => {
    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
      const video = webcamRef.current.video;
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());

      if (detections.length > 0) {
        const detection = detections[0].box;
        setFaceBox({
          x: detection.x,
          y: detection.y,
          width: detection.width,
          height: detection.height
        });
      } else {
        setFaceBox(null);
      }
    }
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImageSrc(imageSrc);
    }
  };


  const captureIdCard = () => {
    const idCardSrc = webcamRef.current?.getScreenshot();
    if (idCardSrc) {
      setIdCardSrc(idCardSrc);
    }
  };

  const resetCapture = () => {
    setImageSrc(null);
    setIdCardSrc(null);
  };

  return (
    <Row className="third_section">
      <Col className='colm4'>
        <div className='colm5logo'>
          <Image src={logo} alt="QBRAINX" className='logoimage' style={{ height: "40px", width: "150px", background: "white" }} />
          <br></br>
          <br></br>
          <Card style={{ width: "25rem", height: "24rem" }}>
            <Card.Body>
              <Card.Title style={{ color: "#878888", fontSize: "13px", display: 'flex', alignItems: 'center' }}>
                <BsInfoCircleFill style={{ fontSize: '1rem', color: "#878888", marginRight: '7px' }} />
                Instructions to take photograph
              </Card.Title>
              <hr />
              <ul style={{ paddingLeft: '20px', marginLeft: 0 }}>
                <li style={{ paddingLeft: '0', marginBottom: '0' }}><span style={{ fontSize: '15px' }}>Photo needs to be taken clearly and straight</span></li>
                <li style={{ paddingLeft: 0 }} ><span style={{ fontSize: '15px' }}>Lighting should be proper for good visible face</span></li>
              </ul>
              
              {isCapturingFace ? (
          <>
              <span style={{ fontSize: '10px', color: 'green', alignSelf: 'flex-start' }}>GOOD SCENARIOS</span><br></br>
              <Image src={studentFace} className='stdFace' />
              <span style={{ marginLeft: '5px', fontSize: "12px" }}>Face straight</span> <br></br>
              <span style={{ fontSize: '10px', color: 'red', alignSelf: 'flex-start' }}>BAD SCENARIOS</span><br></br>
              <Image src={studentFace} className='stdFace' />
              <span style={{ marginLeft: '10px', marginRight: '15px', fontSize: "12px" }}>Blurred Image</span>
              <Image src={studentFace} className='stdFace' />
              <span style={{ marginLeft: '10px', fontSize: "12px" }}>Face Cut</span><br></br>
              <Image src={studentFace} className='stdFace' />
              <span style={{ marginLeft: '10px', fontSize: "12px" }}>No Proper Light</span>
           </>
           ):(
            <>
            <span style={{ fontSize: '10px', color: 'green', alignSelf: 'flex-start' }}>GOOD SCENARIOS</span><br />
            <Image src={idCard} className='stdFace' />
            <span style={{ marginLeft: '5px', fontSize: "12px" }}>Id Card straight</span> <br />
            <span style={{ fontSize: '10px', color: 'red', alignSelf: 'flex-start' }}>BAD SCENARIOS</span><br />
            <Image src={idCard} className='stdFace' />
            <span style={{ marginLeft: '10px', marginRight: '15px', fontSize: "12px" }}>Blurred Image</span>
            <Image src={idCard} className='stdFace' />
            <span style={{ marginLeft: '10px', fontSize: "12px" }}>Id Card not Cut</span><br />
            <Image src={idCard} className='stdFace' />
            <span style={{ marginLeft: '10px', fontSize: "12px" }}>Keep Id card Straight</span>
          </>
        )}
           
            </Card.Body>
          </Card>
          <br></br>
          <br></br>
        </div>
      </Col>

      <Col className='colm6'>
        <Card className="second_section" style={{ width: "45rem", height: "28rem" }}>
          <Card.Body>
            <Card.Title style={{ color: "rgb(0, 67, 133)", fontSize: "23px" }}>Identity Check</Card.Title>
            <div className="menu">
              <a
                className={isCapturingFace ? 'active' : ''}
                onClick={() => setIsCapturingFace(true)}
                style={{ cursor: 'pointer' }}
              >
                Capture Face
              </a>
              <a
                className={!isCapturingFace ? 'active' : ''}
                onClick={() => setIsCapturingFace(false)}
                style={{ cursor: 'pointer', marginLeft: '10px' }}
              >
                Capture ID Card
              </a>
            </div>

            { isCapturingFace ? (
              <span style={{ color: 'grey' }}>Please align yourself to the center of the screen and press "Capture Face" button.</span>
            ):(
              <span style={{ color: 'grey' }}>Please align your Id Card to the center of the screen and press "Capture Your Id Card" button.</span>
            )}
            <br></br>

            {imageSrc && isCapturingFace ? (
              <div>
                <img style={{ width: 280, height: 200, borderRadius:'8px', margin:'15px'}} 
                src={imageSrc} alt="Captured Face" className="image" />
                <div className="action-buttons">
                  <button onClick={() => setIsCapturingFace(false)} 
                  style={{ backgroundColor: '#004385', color: '#FFFFFF',marginLeft:"20px" }}>Proceed</button>
                  <button onClick={resetCapture}
                    style={{ outlineColor: '#1E5994', backgroundColor: '#F5FAFF', color: ' #1E5994' }}>Re-Capture Face</button>
                </div>
              </div>
            )

              :
              idCardSrc && !isCapturingFace ? (
                <div>
                  <img style={{ width: 280, height: 200, borderRadius:'8px', margin:'15px'}} src={idCardSrc} alt="Captured ID Card" className="image" />
                  <div className="action-buttons">
                    <button onClick={() => alert('Submit clicked')}
                      style={{ backgroundColor: '#004385', color: '#FFFFFF',marginLeft:"10px" }}>
                      Submit
                    </button>
                    <button onClick={resetCapture}
                      style={{ outlineColor: '#1E5994', backgroundColor: '#F5FAFF', color: ' #1E5994' }}>
                      Re-Capture ID Card
                    </button>
                  </div>
                </div>
              ) :
                <>
                  <div className="webcam-container" style={{ position: 'relative' }}>
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      width={280}
                      height={200}
                      style={{ borderRadius: '8px', margin: '15px' }}
                      videoConstraints={{
                        width: 280,
                        height: 200,
                        facingMode: "user"
                      }}
                      onUserMedia={() => console.log('Webcam started')}
                      onUserMediaError={err => console.error('Webcam error:', err)}
                    />
                    {faceBox && isCapturingFace && (
                      <div
                        className="face-box"
                        style={{
                          left: `${faceBox.x}px`,
                          top: `${faceBox.y}px`,
                          width: `${faceBox.width}px`,
                          height: `${faceBox.height}px`,
                          border: '2px solid red',
                          position: 'absolute',
                        }}
                      ></div>
                    )}
                  </div> <br></br>
                  {isCapturingFace && !imageSrc && (
                    <button className="capture-button" onClick={capturePhoto}>
                      Capture Face
                    </button>
                  )}
                  {!isCapturingFace && !idCardSrc && (
                    <button className="capture-button" onClick={captureIdCard}>
                      Capture ID Card
                    </button>
                  )}
                </>}


          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default WebcamCapture;



