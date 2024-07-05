import React, { useEffect, useState } from 'react';
import Image from 'react-bootstrap/esm/Image';
// import logo from './images/qbrainxlogo.png';
import logo from './../images/qbrainxlogo.png';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './../App.css';
import Card from 'react-bootstrap/card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from "react-router-dom";
import BgLayout from '../Components/BgLayout';


function Quizpage() {
    const location = useLocation();
    const { responseData } = location.state || {}
    const [sections, setSections] = useState([])
    //Response Data to sections
    const transformResponseToSections = (data) => {
        const result = [];
        Object.keys(data.questions).forEach((category) => {
            Object.keys(data.questions[category]).forEach((sectionId) => {
                const section = data.questions[category][sectionId];
                result.push({
                    category: category,
                    title: section.section_name,
                    questions: section.section_count,
                    duration: section.section_time > 0 ? `${section.section_time} minutes` : 'Untimed',
                });
            });
        });
        return result;
    };

    useEffect(() => {
        const result = transformResponseToSections(responseData);
        setSections(result)
    },[]);

    // const sections = [
    //     { title: '1', questions: 10, duration : '30 minutes' },
    //     { title: '2', questions: 10, duration : '30 minutes' },
    //     { title: '3', questions: 10, duration : 'Untimed*' },
    //     { title: '4', questions: 10, duration : 'Untimed' }
    //   ];

    const [selectedSection, setSelectedSection] = useState(() => -1);

    const handleRadioChange = (index) => {
        setSelectedSection(index);
    };

    const navigate = useNavigate()

    const handleStartTest = () => {
        if (selectedSection !== null) {
            const selectedSectionInfo = sections[selectedSection];
            console.log(`Start test for Section ${selectedSectionInfo.title}`);
            // Perform further actions based on the selected section
            navigate("/quizproceed");
        }
    };

    return (
        <Row className="third_section">
            <Col className='colm4'>
                <div className='colm5'>
                    <BgLayout details={responseData} />
                </div>
            </Col>
            <Col className='colm6'>
                <Card className="second_section" style={{ width: "45rem", height: "30rem" }}>
                    <Card.Body>
                        <Card.Title style={{ color: "rgb(0, 67, 133)", fontSize: "20px" }}>
                            <p style={{ borderBottom: "1px solid black", paddingTop: "10px", paddingBottom: "10px" }}>You are all done and ready!</p>
                            <h6 style={{ color: "black", fontWeight: "400", fontSize: "15px" }}>Select the section you like to begin the test with and click on “Start Test”
                                button. Or you can navigate within sections once you start the test.</h6>
                        </Card.Title>

                        <Form>
                            {sections.map((section, index) => (
                                <div key={`section-${index}`} style={{ borderBottom: "1px solid black", paddingBottom: "8px", paddingTop: "8px" }}>
                                    <div className='fw-semibold mb-2'>{section.category}</div>
                                    <Form.Check
                                        inline
                                        label={
                                            <div>
                                                <p style={{ fontSize: "16px", margin: "0", lineheight: "1.4" }} className="Title">{`${section.title}`}</p>
                                                <p style={{ fontSize: "13px", margin: "0" }}>{`Questions : ${section.questions}  \u2022  Duration : ${section.duration}`}</p>
                                            </div>
                                        }
                                        name="group1"
                                        type="radio"
                                        id={`inline-radio-${index + 1}`}
                                        onChange={() => handleRadioChange(index)}
                                    />
                                </div>
                            ))}
                        </Form>
                        <div>
                            <Button
                                style={{ width: "300px", marginLeft: "200px", marginTop: "40px" }}
                                variant="primary" onClick={handleStartTest}
                                disabled={selectedSection === -1}>Start Test</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default Quizpage;