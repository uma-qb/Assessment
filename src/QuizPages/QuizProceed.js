import React, { useState, useEffect } from 'react';
import './../App.css';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import timerImage from './../images/timer.jpg'

 function QuizProceed() {

    const navigate = useNavigate();

    const [seconds, setSeconds] = useState(60);

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
        navigate('/quizfirstpage');
    }
  }, [seconds, navigate]);


    const handleClick=()=>{
        navigate("/quizfirstpage");
  }
  

  return (
    <div className="page_section1">
        <Card  style={{ margin:"0 auto",marginTop:"60px",paddingLeft:"20px",width:'60rem',height:"350px"}}>
            <Card.Body >
                <div className='row' style={{borderBottom:"1px solid Black",paddingTop:"10px",paddingBottom:"10px"}}>
                    <div className='col-9'>
                        <Card.Title style={{color:"rgb(0, 67, 133)",fontSize:"20px"}}>Monitored Session</Card.Title>
                    </div>
                    
                    <div className='col-3'>
                        <p style={{color:"black",fontSize:"16px"}}>Time Starts in {formatTime(seconds)} secs </p>
                    </div>
                </div>
                <p style={{marginTop:"15px",fontWeight:"500",fontSize:"18px"}}>QBrainX Test Engine will monitor your session for review.</p>
                <div className='row'>
                    <div className='col-8'>
                        <Card.Text>
                            Please note that from here on you will to be monitored via video/screen feed. This monitoring 
                            is being undertaken to eliminate any use of unfair means during the conduct of this session.The said 
                            video/screen feed can be viewed whether on a real time basis and/or accessed 
                            subsequently by only an authorized person of your employer / proposed employer/ institution 
                            for monitoring and audit.
                        </Card.Text>
                    </div>
                    <div className='col-4'>
                        <Image src={timerImage} style={{marginLeft:"60px",height:"150px",width:"150px"}}/>
                    </div>
                </div>
                <div className='row'>
                    <Button onClick={handleClick} style={{width:"200px"}}>Proceed to Test</Button>
                </div>
            </Card.Body>
        </Card>
    </div>
  )
}
export default QuizProceed;