import React, { useContext, useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './../App.css';
import Card from 'react-bootstrap/card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from "react-router-dom";
import BgLayout from '../Components/BgLayout';
import { Accordion } from 'react-bootstrap';
import axios from 'axios';
import UserContext from '../UserContext';
import { toast, Slide } from 'react-toastify';

function Quizpage() {
    const { userData, selectedSection, selectedGroup, setQuestions, setSelectedGroup, setSelectedSection, baseUrl } = useContext(UserContext);
    const [sections, setSections] = useState([])
    const navigate = useNavigate()
    const transformResponseToSections = (data) => {
        const sections = data?.questions;
        if (sections) {
            return Object.keys(sections).map((category, index) => ({
                category,
                sections: Object.values(sections[category])
            }));
        }
    };

    useEffect(() => {
        const result = transformResponseToSections(userData);
        console.log(result)
        setSections(result)
    }, []);

    const handleRadioChange = (index, group) => {
        setSelectedSection(index);
        setSelectedGroup(group);
    };

    const handleStartTest = () => {
        if (selectedSection !== null) {

            const fetchQuestions = async () => {
                try {
                    const token = localStorage.getItem("token")
                    const url = `${baseUrl}/quiz_attempt/${token}`;
                    const responseQuestions = await axios.post(url);
                    setQuestions(responseQuestions.data)
                    // setResStatus(responseQuestions.status)
                    navigate("/quizproceed", { state: { sectionID: selectedSection, group: selectedGroup } });
                } catch (error) {
                    
                    let errMsg = "Something went wrong!"
                    if (error.response.status == 404) {
                        errMsg = "404 - Route Not Found"
                    } else if (error.response) {
                        let msg = error.response.data.message
                        errMsg = msg.replace(/^Error: /, '')
                    }
                    toast.error(errMsg, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Slide
                    })
                }
            }
            fetchQuestions()

            // if (resStatus === 200) {
            // Perform further actions based on the selected section
            // navigate("/quizproceed", { state: { sectionID: selectedSection } });
            // }
        } else {
            const errMsg = "Please Select Any One Section"
            toast.error(errMsg, {
                position: "top-right",
                /* autoClose: 5000, */
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide
            })
        }
    };

    return (
        <>
            <Row className="third_section">
                <Col className='colm4'>
                    <div className='colm5'>
                        <BgLayout details={userData} />
                    </div>
                </Col>
                {/* <Toastify message={errorMessage} showToast={showToast} /> */}
                <Col className='colm6'>
                    <Card className="second_section" style={{ width: "45rem", height: "30rem" }}>
                        <Card.Body>
                            <Card.Title style={{ color: "rgb(0, 67, 133)", fontSize: "20px" }}>
                                <p style={{ borderBottom: "1px solid black", paddingTop: "10px", paddingBottom: "10px" }}>You are all done and ready!</p>
                                <h6 style={{ color: "black", fontWeight: "400", fontSize: "15px" }}>Select the section you like to begin the test with and click on “Start Test”
                                    button. Or you can navigate within sections once you start the test.</h6>
                            </Card.Title>
                            {<div className='mt-4' style={{ minHeight: "18rem" }}>
                                <Form>
                                    <Accordion defaultActiveKey="0" flush>
                                        {sections?.map((sectionGroup, index) => (
                                            <Accordion.Item eventKey={`${index}`} key={index}>
                                                <Accordion.Header><b>{sectionGroup.category}</b></Accordion.Header>
                                                <Accordion.Body>
                                                    {sectionGroup.sections.map((section, idx) => (
                                                        <div className='w-100 m-2' key={`${section.cid}-${idx}`}>
                                                            <label htmlFor={`inline-radio-${section.cid}`} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                                                <Form.Check
                                                                    inline
                                                                    name="group1"
                                                                    type="radio"
                                                                    value={section.cid}
                                                                    checked={section.cid === selectedSection}
                                                                    key={`${section.cid - idx}`}
                                                                    id={`inline-radio-${section.cid}`}
                                                                    onChange={() => handleRadioChange(section.cid, section.section_group)}
                                                                />
                                                                <div>
                                                                    <p style={{ fontSize: "16px", margin: "0", lineheight: "1.4" }} className="Title">{`${section.section_name}`}</p>
                                                                    <p style={{ fontSize: "13px", margin: "0" }}>{`Questions : ${section.section_count}  \u2022  Duration : ${section.section_time === 0 ? 'Untimed' : section.section_time}`}</p>
                                                                </div>
                                                            </label>
                                                        </div>
                                                    ))}
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        ))}
                                    </Accordion>
                                </Form>
                            </div>}

                            <div>
                                <Button
                                    style={{ width: "300px", marginLeft: "200px" }}
                                    variant="primary" onClick={handleStartTest}
                                    disabled={selectedSection === -1}>Start Test</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </>
    )
}

export default Quizpage;