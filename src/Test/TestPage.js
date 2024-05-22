import React, { useState, useEffect, useRef } from 'react';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import { BsCloudCheck, BsClockHistory, BsBookmarkFill, BsBookmark } from "react-icons/bs";
import questionsData from './questions.json';
import logo from './../images/qbrainxlogo.png';
import { BsX } from "react-icons/bs";
import './Test.css';

function TestPage() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedChoices, setSelectedChoices] = useState({});
  const [revisitQuestions, setRevisitQuestions] = useState({});
  const [sectionChoices, setSectionChoices] = useState(
    Array(questionsData.sections.length).fill({}).map(() => ({}))
  );

  // Initialize timers from JSON
  const totalTestDuration = questionsData.timers.totalTestTime;
  const sectionDurations = questionsData.sections.map(section => section.sectionTime);

  const [totalTestTime, setTotalTestTime] = useState(totalTestDuration);
  const [sectionTimes, setSectionTimes] = useState(sectionDurations);
  const sectionTimeRef = useRef(sectionDurations[0]);

  useEffect(() => {
    const totalTestTimer = setInterval(() => {
      setTotalTestTime(prevTime => {
        if (prevTime <= 1) clearInterval(totalTestTimer);
        return prevTime - 1;
      });
    }, 1000);

    const sectionTimer = setInterval(() => {
      setSectionTimes(prevTimes => {
        const newTimes = [...prevTimes];
        if (newTimes[currentSectionIndex] <= 1) {
          clearInterval(sectionTimer);
          handleSectionTimeExpiry();
        } else {
          newTimes[currentSectionIndex] -= 1;
          sectionTimeRef.current = newTimes[currentSectionIndex];
        }
        return newTimes;
      });
    }, 1000);

    return () => {
      clearInterval(totalTestTimer);
      clearInterval(sectionTimer);
    };
  }, [currentSectionIndex]);

  const handleSectionTimeExpiry = () => {
    if (currentSectionIndex < questionsData.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentPage(1);
    } else {
      alert("Test is over!");
    }
  };

  const currentSection = questionsData.sections[currentSectionIndex];
  const currentQuestion = currentSection.questions[currentPage - 1];

  const handleSectionChange = (sectionIndex) => {
    setSectionChoices(prevChoices => {
      const newChoices = [...prevChoices];
      newChoices[currentSectionIndex] = selectedChoices;
      return newChoices;
    });
    setSelectedChoices(sectionChoices[sectionIndex] || {});
    setCurrentSectionIndex(sectionIndex);
    setCurrentPage(1);
  };

  const handleChoiceChange = (questionNumber, choice) => {
    setSelectedChoices((prevChoices) => {
      const newChoices = {
        ...prevChoices,
        [questionNumber]: choice
      };
      // Automatically remove revisit bookmark when a response is given
      const bookmarkKey = `${currentSectionIndex}-${questionNumber}`;
      if (revisitQuestions[bookmarkKey]) {
        const newRevisitQuestions = { ...revisitQuestions };
        delete newRevisitQuestions[bookmarkKey];
        setRevisitQuestions(newRevisitQuestions);
      }
      return newChoices;
    });
  };

  const handleClearResponse = (questionNumber) => {
    setSelectedChoices((prevChoices) => {
      const newChoices = { ...prevChoices };
      delete newChoices[questionNumber];
      return newChoices;
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleToggleRevisit = (questionNumber) => {
    setRevisitQuestions((prevRevisitQuestions) => {
      const key = `${currentSectionIndex}-${questionNumber}`;
      const newRevisitQuestions = { ...prevRevisitQuestions };
      if (newRevisitQuestions[key]) {
        delete newRevisitQuestions[key];
      } else {
        newRevisitQuestions[key] = true;
      }
      return newRevisitQuestions;
    });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const totalPages = currentSection.questions.length;

  const renderPaginationItems = () => {
    const paginationItems = [];
    const maxVisiblePages = 4;
    const startPage = Math.max(1, Math.min(currentPage - Math.floor(maxVisiblePages / 2), totalPages - maxVisiblePages + 1));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {revisitQuestions[`${currentSectionIndex}-${i}`] && <BsBookmarkFill style={{ color: 'orange', width: "10px", height: "10px" }} />} {i}
        </Pagination.Item>
      );
    }

    return paginationItems;
  };

  const attemptedCount = Object.keys(selectedChoices).length;

  return (
    <div>
      <Row className="cardtest_section">
        <Col xs={12} md={2}>
          <div className='testLogo'>
            <Image src={logo} alt="QBRAINX" className='logoimage' style={{ height: "30px", width: "120px" }} />
          </div>
        </Col>
        <Col xs="auto" className="vertical-line"></Col>
        <Col xs={12} md={4}>
          <div style={{ marginTop: '20px' }}>
            <span style={{ color: "#F1FEC6" }}>{questionsData.users[0].userName}</span><br />
            <span className="name">LTI_Assessment Preliminary</span>
            <BsCloudCheck className='cloudIcon' />
            <span style={{ color: "#EDECF2" }}>Saved</span>
          </div>
        </Col>
        <Col xs={12} md={3}>
          <div style={{ float: "right", color: "white" }}>
            <BsClockHistory className='clockIcon' style={{ marginTop: "28px", marginLeft: "75px", color: "white" }} />
            <div style={{ float: "right", color: "white", marginTop: "20px" }}>
              <span>Section Time: {formatTime(sectionTimes[currentSectionIndex])}</span>
              <div></div>
              <span>Total Test Time: {formatTime(totalTestTime)}</span>
            </div>
          </div>
        </Col>
        <Col xs={12} md={2} style={{ float: "right", marginRight: "20px" }}>
          <Button className='finishbtn'>Finish Test</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="card_section" style={{ width: "73rem", height: "30rem" }}>
            <Card.Body>
              <Card.Title style={{ marginBottom: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Dropdown>
                      <Dropdown.Toggle className="custom-dropdown-toggle">
                        {currentSection.name}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="custom-dropdown-menu">
                        {questionsData.sections.map((section, index) => (
                          <Dropdown.Item key={index} onClick={() => handleSectionChange(index)}>
                            {section.name}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="pagination-container" style={{ marginTop: '10px' }}>
                    <Pagination>
                      <Pagination.Prev onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)} />
                      {renderPaginationItems()}
                      <Pagination.Next onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)} />
                    </Pagination>
                  </div>
                  <div>
                    <span style={{fontSize:"18px"}}>Attempted: {attemptedCount}/{currentSection.questions.length}</span>
                  </div>
                  <div className='col-2' style={{ display: 'flex' }}>
                    <Button className='prevButton' onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}> &#129168; Previous</Button>
                    <Button className='prevButton' onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}>Next &#129170;</Button>
                  </div>
                </div>
              </Card.Title>
              <hr className="full-width-hr" style={{ position: 'absolute', left: 0, right: 0 }} />
              <Row>
                <Col xs={12} md={6} style={{ marginTop: "20px" }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "20px" }}>
                    <span style={{ fontWeight: "bold" }}>Question {currentQuestion.number}</span>
                    <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleToggleRevisit(currentPage)}>
                      {revisitQuestions[`${currentSectionIndex}-${currentPage}`] ? (
                        <BsBookmarkFill style={{ marginRight: '2px', width: "13px", height: "13px", color: 'orange' }} />
                      ) : (
                        <BsBookmark style={{ marginRight: '2px', width: "13px", height: "13px" }} />
                      )}
                      <span>{revisitQuestions[`${currentSectionIndex}-${currentPage}`] ? 'Remove Revisit' : 'Revisit'}</span>
                    </div>
                  </div>
                  <p>{currentQuestion.text}</p>
                </Col>
                <Col xs="auto" className="verticalLine"></Col>
                <Col style={{ marginTop: "20px" }}>
                  <span style={{ fontWeight: "bold" }}>Choose an option</span>
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="choice-box" style={{ border: '1px solid #ccc', padding: '5px', marginBottom: '5px' }}>
                      <input
                        type="radio"
                        className='radiobtn'
                        value={option}
                        checked={selectedChoices[currentQuestion.number] === option}
                        onChange={() => handleChoiceChange(currentQuestion.number, option)}
                      /> {option}
                    </div>
                  ))}
                  <span
                    style={{ fontSize: "15px", color: "red", cursor: "pointer" }}
                    onClick={() => handleClearResponse(currentQuestion.number)}
                  >
                    <BsX style={{width:"25px", height:"23px",marginTop:"-5px"}}/> Clear Response
                  </span>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default TestPage;




