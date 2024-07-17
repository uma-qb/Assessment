import React, { useState, useEffect, useContext } from 'react';
import './../App.css';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/card';
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from "react-router-dom";
import timerImage from './../images/timer.jpg'
import axios from 'axios';
import UserContext from '../UserContext';

function QuizProceed() {
  const location = useLocation();
  const { questions } = useContext(UserContext);
  console.log(questions)
  const { sectionID, group } = location.state
  const navigate = useNavigate();
  console.log(sectionID)

  const [seconds, setSeconds] = useState(5);

  // Effect to update the timer every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds(prevSeconds => prevSeconds - 1);
      }
    }, 1000);

    // Cleanup function to clear the interval on component unmount or when seconds reach 0
    return () => clearInterval(intervalId);
  }, [seconds]); // Re-run effect when seconds change



  // Convert seconds to a readable format (e.g., MM:SS)
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  // Effect to navigate when timer reaches 0
  useEffect(() => {
    if (seconds === 0) {
      handleClick()
    }
  }, [seconds, navigate]);


  const handleClick = () => {

    navigate('/test', { state: { sectionID: sectionID, group: group } });
    // setTimeout(() => {
    //   const element = document.documentElement;
    //   if (element.requestFullscreen) {
    //     element.requestFullscreen();
    //   } else if (element.mozRequestFullScreen) { // Firefox
    //     element.mozRequestFullScreen();
    //   } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
    //     element.webkitRequestFullscreen();
    //   } else if (element.msRequestFullscreen) { // IE/Edge
    //     element.msRequestFullscreen();
    //   }
    // }, 500);
  }


  return (
    <div className="page_section1">
      <Card style={{ margin: "0 auto", marginTop: "60px", paddingLeft: "20px", width: '60rem', height: "350px" }}>
        <Card.Body >
          <div className='row' style={{ borderBottom: "1px solid Black", paddingTop: "10px", paddingBottom: "10px" }}>
            <div className='col-9'>
              <Card.Title style={{ color: "rgb(0, 67, 133)", fontSize: "20px" }}>Monitored Session</Card.Title>
            </div>

            <div className='col-3'>
              <p style={{ color: "black", fontSize: "16px" }}>Time Starts in {formatTime(seconds)} secs </p>
            </div>
          </div>
          <p style={{ marginTop: "15px", fontWeight: "500", fontSize: "18px" }}>QBrainX Test Engine will monitor your session for review.</p>
          <div className='row'>
            <div className='col-8'>
              <Card.Text>
                Please note that from here on you will to be monitored via video/screen feed. This monitoring
                is being undertaken to eliminate any use of unfair means during the conduct of this session.The said
                video/screen feed can be viewed whether on a real time basis and/or accessed
                subsequently by only an authorized person of your employer / proposed employer/ institution
                for monitoring and audit."
              </Card.Text>
            </div>
            <div className='col-4'>
              <Image src={timerImage} style={{ marginLeft: "60px", height: "150px", width: "150px" }} />
            </div>
          </div>
          <div className='row'>
            <Button id="proceed" onClick={handleClick} style={{ width: "200px" }}>Proceed to Test</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}
export default QuizProceed;