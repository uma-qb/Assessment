import React, { useState, useEffect, useRef, useContext } from 'react';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import { BsCloudCheck, BsClockHistory, BsBookmarkFill, BsBookmark } from "react-icons/bs";
// import questionsData from './questions.json';
import logo from './../images/qbrainxlogo.png';
import { BsX } from "react-icons/bs";
import { useLocation, useNavigate } from 'react-router-dom';
import './Test.css';
import UserContext from '../UserContext';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import Toastify from '../Components/Toastify';
import { TbProgress } from "react-icons/tb";

function TestPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { questions } = useContext(UserContext)
  const { sectionID, group } = location.state
  const testQuestions = questions;
  // console.log(testQuestions.questions)

  // const data = testQuestions.questions;
  // const result = [];
  // for (let i = 0; i < categories.length; i++) {
  //   const category = categories[i];
  //   const sectionIds = Object.keys(data[category]);

  //   for (let j = 0; j < sectionIds.length; j++) {
  //     const cid = sectionIds[j];
  //     const prevSection = sectionIds[j - 1] || null;
  //     const prevSectionGroup = sectionIds[j - 1] ? category : null;

  //     let nextSection = sectionIds[j + 1] || null;
  //     let nextSectionGroup = sectionIds[j + 1] ? category : null;

  //     // If no next section in the current category, check the next category
  //     if (!nextSection && i < categories.length - 1) {
  //       const nextCategory = categories[i + 1];
  //       const nextCategorySectionIds = Object.keys(data[nextCategory]);
  //       nextSection = nextCategorySectionIds[0];
  //       nextSectionGroup = nextCategory;
  //     }

  //     result[cid] = {
  //       prevSection,
  //       prevSectionGroup,
  //       nextSection,
  //       nextSectionGroup
  //     };
  //   }
  // }

  // console.log(result);
  // return


  // console.log(testQuestions?.questions[group][sectionID]['section_questions'])
  const questionsData = testQuestions?.questions;
  // console.log(questionsData)
  const [sections, setSections] = useState();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(sectionID);
  const [currentSectionQuestionCount, setCurrentSectionQuestionCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedChoices, setSelectedChoices] = useState({});
  const [revisitQuestions, setRevisitQuestions] = useState({});
  const [sectionChoices, setSectionChoices] = useState([]);
  const [attemptedCount, setAttemptedCount] = useState();

  // Array(questionsData.length).fill({}).map(() => ({}))

  // console.log(sectionChoices);

  const [savingCompleted, setSavingCompleted] = useState(false);
  const [savingInprogress, setSavingInprogress] = useState(false)
  const [options, setOptions] = useState()
  // const [currentSectionID, setCurrentSectionID] = useState(sectionID)
  const [currentGroup, setCurrentGroup] = useState(group)
  const [showToast, setShowToast] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)


  const transformResponseToSections = (data) => {
    const sections = data?.questions;
    if (sections) {
      return Object.keys(sections).map(category => ({
        category,
        sections: Object.values(sections[category])
      }));
    }
  };

  const optgroup = (data) => {
    const questions = data?.questions;
    if (questions) {
      return Object.keys(questions).map(sectionName => ({
        label: sectionName,
        options:
          Object.values(questions[sectionName]).map(sect => ({
            value: sect.cid, label: sect.section_name, group: sect.section_group
          }))


      }))
    }
    return [];
  }

  // Code to get the previous section and next section

  const sectionsArray = [];
  let previousCid = null;
  let previousGroup = null;
  const sectionsData = testQuestions.questions;
  const categories = Object.keys(sectionsData);
  Object.keys(sectionsData).forEach((category, i) => {
    const sectionIds = Object.keys(sectionsData[category]);

    sectionIds.forEach((currentCid, index) => {
      let nextCid = sectionIds[index + 1] ? sectionIds[index + 1] : null;
      let nextGroup = nextCid ? category : null;

      if (!nextCid && i < categories.length - 1) {
        nextGroup = categories[i + 1];
        nextCid = Object.keys(sectionsData[nextGroup])[0]
      }

      // if (!nextCid && i == categories.length - 1) {
      //   nextGroup = categories[0];
      //   nextCid = Object.keys(sectionsData[nextGroup])[0]
      // }

      // if (!nextCid) {
      //   if (i < categories.length - 1) { nextGroup = categories[i + 1]; }
      //   if (i == categories.length - 1) { nextGroup = categories[0]; }
      //   nextCid = Object.keys(sectionsData[nextGroup])[0]
      // }

      // if (!previousCid) {
      //   previousGroup = categories[categories.length - 1];
      //   previousCid = Object.keys(sectionsData[previousGroup])[0];
      // }

      sectionsArray[currentCid] = {
        prevSection: previousCid,
        prevSectionGroup: previousGroup,
        nextSection: nextCid,
        nextSectionGroup: nextGroup
      };

      previousCid = currentCid;
      previousGroup = category;
    });
  });
  // console.log(testQuestions.questions)
  // console.log(sectionsArray);
  const currentSectionData = sectionsArray[currentSectionIndex];

  useEffect(() => {
    const result = transformResponseToSections(questions);
    const opt = optgroup(questions);
    const currentTime = new Date().toISOString();
    setSections(result);
    setOptions(opt);
    localStorage.setItem('startTime', currentTime)


    /*
    const handleFullscreenChange = (e) => {

      console.log(e.key)
      if (document.fullscreenElement) {
        // Re-enter fullscreen if user tries to exit
        document.documentElement.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
      }
    };

    // Add event listener for fullscreen change
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    // Enter fullscreen when the component mounts
    document.documentElement.requestFullscreen().catch(err => {
      console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    });

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
    */

  }, []);

  const calculateTimeDifference = () => {
    const savedStartTime = localStorage.getItem('startTime');
    if (savedStartTime) {
      const startTimeDate = new Date(savedStartTime);
      const currentTimeDate = new Date();
      const differenceInmiliSeconds = currentTimeDate - startTimeDate;
      const differenceInSeconds = Math.floor(differenceInmiliSeconds / 1000);
      const differenceInMinutes = Math.floor(differenceInSeconds / 60);
      const differenceInHour = Math.floor(differenceInMinutes / 60);
      return differenceInSeconds;
    }

  }

  const handleFinishTestClick = () => {
    navigate('/summary', {
    });
  };

  // Initialize timers from JSON
  const totalTestDuration = testQuestions.total_duration * 60; // converting minutes to seconds
  // const sectionDurations = questionsData.sections.map(section => section.sectionTime);

  const getSectionDuration = (sections) => {

    if (!Array.isArray(sections)) {
      return [];
    }

    return sections.reduce((acc, category) => {
      category.sections.forEach(section => {
        acc[section.cid] = { "duration": section.section_time, "questions": section.section_questions };

      });
      return acc;
    }, {})
  }
  const sectionDurations = getSectionDuration(sections)

  // console.log(sectionDurations[currentSectionIndex].questions.length);
  const sectionDuration = { 6: 40, 5: 80, 7: 25 }
  // console.log(sectionDuration[currentSectionID]);

  const [totalTestTime, setTotalTestTime] = useState(totalTestDuration);
  const [sectionTimes, setSectionTimes] = useState(sectionDuration);
  // const sectionTimeRef = useRef(sectionDuration[currentSectionID] * 60);
  const sectionTimeRef = useRef(sectionDuration[currentSectionIndex] * 60);
  const prevSectionRef = useRef(sectionDuration[currentSectionIndex]);

  useEffect(() => {
    const totalTestTimer = setInterval(() => {
      setTotalTestTime(prevTime => {
        if (prevTime <= 1) clearInterval(totalTestTimer);
        return prevTime - 1;
      });
    }, 1000);

    const sectionTimer = setInterval(() => {
      setSectionTimes(prevTimes => {
        const newTimes = { ...prevTimes };
        if (newTimes[currentSectionIndex] <= 1) {
          clearInterval(sectionTimer);
          handleSectionTimeExpiry();
        } else {
          newTimes[currentSectionIndex] -= 1;
          sectionTimeRef.current = newTimes[currentSectionIndex];
        }
        localStorage.setItem('sectionTime-' + currentSectionIndex, sectionTimes[currentSectionIndex]);
        return newTimes;
      });
    }, 1000);

    return () => {
      clearInterval(totalTestTimer);
      clearInterval(sectionTimer);
    };
  }, [currentSectionIndex]);

  const handleSectionTimeExpiry = () => {
    // if (currentSectionIndex < questionsData.sections.length - 1) {
    //   setCurrentSectionIndex(currentSectionIndex + 1);
    //   setCurrentPage(1);
    // } else {
    //   alert("Test is over!");
    // }
  };

  // const currentSection = questionsData.sections[currentSectionIndex];
  // const currentQuestion = currentSection.questions[currentPage - 1];
  // console.log(currentSection)
  // const currentSection = testQuestions?.questions[group][sectionID]['section_questions']
  // console.log(testQuestions?.questions[group][sectionID]['section_questions'])
  const currentSection = testQuestions?.questions[currentGroup][currentSectionIndex]['section_questions'];
  const currentQuestion = currentSection[currentPage - 1];

  const handleSectionChange = (e) => {
    setCurrentGroup(e.target.selectedOptions[0].getAttribute('data-group'))
    setSectionChoices(prevChoices => {
      const newChoices = [...prevChoices];
      newChoices[currentSectionIndex] = selectedChoices[currentSectionIndex];
      return newChoices;
    });
    setCurrentSectionIndex(e.target.value);
    setCurrentPage(1);
  };

  const sendAnswers = async (option) => {
    setSavingCompleted(false)
    setSavingInprogress(true)
    const timeTaken = await calculateTimeDifference()
    console.log(timeTaken)
    const data = {
      token: "wE08op8SzWKPJsblZWif54pi8VR9L6fFP9eDCKhB",
      qq_id: currentQuestion.qq_id,
      oid: option,
      time: timeTaken
    }
    let config = {}
    if (option === null) {
      config = {
        method: "put",
        url: "http://127.0.0.1:8000/api/clear_answers",
        data: data
      }
    } else {
      config = {
        url: "http://127.0.0.1:8000/api/save_answers",
        method: "post",
        data: data
      }
    }
    try {
      const response = await axios(config)
      setSavingCompleted(true)
      const currentTime = new Date().toISOString();
      localStorage.setItem('startTime', currentTime)
    } catch (error) {
      console.log(error.response)
      if (error.response) {
        setErrorMessage(error.response.data.message);
        setShowToast(true);
      }
    } finally {
      setSavingInprogress(false)
      getAttemptedCount()
    }
  }

  const getAttemptedCount = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/get_final_report/wE08op8SzWKPJsblZWif54pi8VR9L6fFP9eDCKhB");
      console.log(response.data.counts_by_category_group[currentGroup][currentSectionIndex].attempted)
      setAttemptedCount(response.data.counts_by_category_group[currentGroup][currentSectionIndex].attempted)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    setSavingCompleted(false)
    const currentTime = new Date().toISOString();
    localStorage.setItem('startTime', currentTime)
    getAttemptedCount()
  }, [currentPage, currentSection])


  const handleChoiceChange = (questionNumber, choice) => {
    sendAnswers(choice)
    setSelectedChoices((prevChoices) => {
      const newChoices = {
        ...prevChoices,
        // [currentSectionIndex]: {
        //   ...prevChoices[currentSectionIndex],
        [questionNumber]: choice,
        // }
      };


      //   setSelectedChoices(prevChoices => ({
      //     const newChoices = {
      //       ...prevChoices,
      //       [currentSectionIndex]: {
      //         ...prevChoices[currentSectionIndex],
      //         [questionNumber]: choice
      //       }
      //     }
      // }));

      // Automatically remove revisit bookmark when a response is given
      const bookmarkKey = `${currentSectionIndex}-${currentPage}`;
      if (revisitQuestions[bookmarkKey]) {
        const newRevisitQuestions = { ...revisitQuestions };
        delete newRevisitQuestions[bookmarkKey];
        setRevisitQuestions(newRevisitQuestions);
      }
      return newChoices;
    })
  };

  // console.log(selectedChoices)

  const handleClearResponse = (questionNumber) => {
    sendAnswers(null)
    setSelectedChoices((prevChoices) => {
      const newChoices = { ...prevChoices };
      delete newChoices[questionNumber];
      return newChoices;
    });
  };

  const handlePageChange = (pageNumber, navigation) => {
    setCurrentPage(pageNumber);


    // if (pageNumber == currentPage && (totalPages > currentPage || totalPages === 1)) { // previous section
    if (navigation === "Previous" && pageNumber == currentPage && (totalPages > currentPage || totalPages === 1)) {
      setCurrentSectionIndex(currentSectionData['prevSection'])
      setCurrentPage(1)
      setCurrentGroup(currentSectionData['prevSectionGroup'])
    }

    // else if (pageNumber == currentPage && totalPages == currentPage) { // Next Section
    if (navigation === "Next" && pageNumber == currentPage && totalPages == currentPage) { // Next Section
      setCurrentSectionIndex(currentSectionData['nextSection'])
      setCurrentPage(1)
      setCurrentGroup(currentSectionData['nextSectionGroup'])
    }

  };

  const handleToggleRevisit = (questionNumber) => {
    const revisit = async (revisit) => {
      try {
        const response = await axios.put("http://127.0.0.1:8000/api/revisit_question", { token: "wE08op8SzWKPJsblZWif54pi8VR9L6fFP9eDCKhB", qq_id: currentQuestion.qq_id, revisit: revisit })
        console.log(revisit)
      } catch (error) {
        console.log(error.response)
      }
    }
    setRevisitQuestions((prevRevisitQuestions) => {
      const key = `${currentSectionIndex}-${questionNumber}`;
      const newRevisitQuestions = { ...prevRevisitQuestions };
      if (newRevisitQuestions[key]) {
        delete newRevisitQuestions[key];
        revisit(0)
      } else {
        newRevisitQuestions[key] = true;
        revisit(1)
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

  const totalPages = currentSection.length;

  const renderPaginationItems = () => {
    const paginationItems = [];
    const maxVisiblePages = 5;
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
  // console.log(selectedChoices);
  // console.log(sectionChoices);

  // const attemptedCount = Object.keys(selectedChoices).length;


  return (
    <div>
      <Row className="cardtest_section">
        <Col xs={12} md={2}>
          <div className='testLogo'>
            <Image src={logo} alt="QBRAINX" className='logoimage' style={{ width: "120px" }} />
          </div>
        </Col>
        <Col xs="auto" className="vertical-line"></Col>
        <Col xs={12} md={4}>
          <div style={{ marginTop: '20px' }}>
            <span style={{ color: "#F1FEC6" }}>{questions.user_name}</span><br />
            <span className="name">{questions.quiz_name}</span>

            {savingCompleted && (<><BsCloudCheck className='cloudIcon' /><span style={{ color: "#EDECF2" }}>Saved</span></>)}
            {savingInprogress && (<><TbProgress className='cloudIcon' /><span style={{ color: "#EDECF2" }}>Saving...</span></>)}
          </div>
        </Col>
        <Col xs={12} md={3}>
          <div style={{ float: "right", color: "white" }}>
            {totalTestTime && sectionTimes[currentSectionIndex] && (<><BsClockHistory className='clockIcon' style={{ marginTop: "28px", color: "white", float: "left" }} />
              <div style={{ float: "right", color: "white", marginTop: "20px" }}>
                {/* <span>Section Time: {formatTime(sectionTimes[currentSectionIndex])}</span> */}
                <span>Section Time: N/A</span>
                <div></div>
                <span>Total Test Time: {formatTime(totalTestTime)}</span>
              </div></>)}
          </div>
        </Col>
        <Col xs={12} md={2} style={{ float: "right", marginRight: "20px" }}>
          <Button className='finishbtn' onClick={handleFinishTestClick}>Finish Test</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="card_section" style={{ width: "73rem", height: "30rem" }}>
            <Card.Body>
              <Card.Title style={{ marginBottom: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Form.Group controlId="exampleForm.SelectCustom">

                      {/* <Form.Control as="select" value={currentSectionIndex} onChange={(e) => setCurrentSectionID(e.target.value)}> */}
                      <Form.Control as="select" value={currentSectionIndex} onChange={handleSectionChange}>
                        {options?.map(group => (
                          <optgroup key={group.label} label={group.label}>
                            {group.options.map(option => (
                              <option key={option.value} value={option.value} data-group={option.group}>
                                {option.label}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </div>
                  <div className="pagination-container" style={{ marginTop: '10px' }}>
                    <Pagination>
                      <Pagination.Prev
                        onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)} />
                      {renderPaginationItems()}
                      <Pagination.Next
                        onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)} />
                    </Pagination>
                  </div>
                  <div>
                    <span style={{ fontSize: "18px" }}>Attempted: {attemptedCount}/{currentSection.length}</span>
                  </div>
                  <div className='d-flex col-3 justify-content-end'>
                    <Button className='prevButton btn-' disabled={!sectionsArray[currentSectionIndex]["prevSection"]}
                      onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1, "Previous")}> &#129168; {currentPage == 1 ? "Prev Section" : "Previous"}</Button>
                    <Button className='prevButton' disabled={(!sectionsArray[currentSectionIndex]["nextSection"] && totalPages === currentPage)}
                      onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages, "Next")}>{totalPages === currentPage ? "Next Section" : "Next"} &#129170;</Button>
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
                  <p>{currentQuestion.question}</p>
                  <div>{currentQuestion.description}</div>
                </Col>
                <Col xs="auto" className="verticalLine"></Col>
                <Col style={{ marginTop: "20px" }}>
                  <span style={{ fontWeight: "bold" }}>Choose an option:</span>
                  {currentQuestion.quesOptions.map((option, index) => (
                    <label key={index} className="choice-box" style={{ border: '1px solid #ccc', padding: '5px', marginBottom: '5px', display: 'block' }}>
                      <input
                        type="radio"
                        className='radiobtn'
                        value={option.oid}
                        checked={selectedChoices[currentQuestion.qq_id] === option.oid}
                        onChange={() => handleChoiceChange(currentQuestion.qq_id, option.oid)}
                      /> {option.q_option}
                    </label>
                  ))}
                  {selectedChoices[currentQuestion.qq_id] && (
                    <span
                      style={{ fontSize: "15px", color: "red", cursor: "pointer" }}
                      onClick={() => handleClearResponse(currentQuestion.qq_id)}
                    >
                      <BsX style={{ width: "25px", height: "23px", marginTop: "-5px" }} /> Clear Response
                    </span>)}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Toastify message={errorMessage} showToast={showToast} />
      </Row>
    </div>
  );
}

export default TestPage;