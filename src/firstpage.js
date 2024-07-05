import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import modemimage from './images/modemimage.webp';
import refreshimage from './images/refreshimage.jpg';
import autosaveimage from './images/autosaveimages.png';
import './App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import BgLayout from './Components/BgLayout';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import UserContext from './UserContext';

const Firstpage = () => {
    const {setUserData} = useContext(UserContext)
    const navigate = useNavigate();
    const [responseData, setResponseData] = useState({})


    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://127.0.0.1:8000/api/quiz_details/s6FyVfpfXhGjZDaSI23x3f2eiXNGsNEMwVtm7PFv');
            setResponseData(response.data);
            setUserData(response.data);
        };

        fetchData();
    }, []);
    console.log(responseData)

    const handleClick = () => {
        if (responseData.system_check == 1) {
            navigate("/secondpage");
        } else if (responseData.identity_check == 1) {
            navigate("/webcam");
        } else {
            navigate("/quiz");
        }
    }
    return (
        <div style={{ minHeight: "100vh" }}>
            <Row className="first_section">
                <Col className='colm1'>
                    <div className='colm2'>
                        <BgLayout details={responseData} />
                        <Button className="mt-4" onClick={handleClick} style={{ width: "400px", backgroundColor: "rgb(8, 168, 249)" }}>{responseData.system_check ? 'Proceed to System Check' : responseData.identity_check ? 'Proceed to Identity Check' : 'Proceed to Quiz'}</Button>
                    </div>
                </Col>
                <Col className='colm3'>
                    <Card className="container second_section" style={{ width: "45rem", height: "28rem" }}>
                        <Card.Body>
                            <Card.Title style={{ padding: "30px", textAlign: "left" }}>Important Note</Card.Title>
                            <div className='container heading3'>
                                <div className='row heading4'>
                                    <div className='col-2'>
                                        <Image src={modemimage} className='logo1' alt="warning" />
                                    </div>
                                    <div className='col-9'>
                                        <h6 className='para' style={{ textAlign: "left" }}>Internet Connectivity</h6>
                                        <p className='paragraph' style={{ textAlign: "left" }}>Ensure that you have a stable internet conection with a minimum speed of 512 kbps</p>
                                    </div>
                                </div>
                                <div className='row heading4'>
                                    <div className='col-2'>
                                        <Image src={refreshimage} className='logo1' alt="warning" />
                                    </div>
                                    <div className='col-9'>
                                        <h6 className='para' style={{ textAlign: "left" }}>Don't Refresh</h6>
                                        <p className='paragraph' style={{ textAlign: "left" }}>Don't refresh the webpage during the assessment. This will lead to immediate submission of your responses.</p>
                                    </div>
                                </div>
                                <div className='row heading4'>
                                    <div className='col-2'>
                                        <Image src={autosaveimage} className='logo1' alt="warning" />
                                    </div>
                                    <div className='col-9'>
                                        <h6 className='para' style={{ textAlign: "left" }}>Auto Save</h6>
                                        <p className='paragraph' style={{ textAlign: "left" }}>All your responses are saved automatically. In case of disconnection or shutdown,you will still be able to resume easily.</p>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Firstpage;