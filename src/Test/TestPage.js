import React, { useState, useEffect, useRef, useContext } from 'react';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import { BsCloudCheck, BsClockHistory, BsBookmarkFill, BsBookmark } from "react-icons/bs";
import logo from './../images/qbrainxlogo.png';
import { BsX } from "react-icons/bs";
import { useLocation, useNavigate } from 'react-router-dom';
import './Test.css';
import UserContext from '../UserContext';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { TbProgress } from "react-icons/tb";
import Offcanvas from 'react-bootstrap/Offcanvas';
import SummaryPage from '../Summary/SummaryPage';
import { Slide, toast } from 'react-toastify';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ReactDOMServer from 'react-dom/server';
import { FcAlarmClock } from "react-icons/fc";

function TestPage() {
  const navigate = useNavigate();
  const { questions, selectedSection: sectionID, selectedGroup: group, baseUrl } = useContext(UserContext)
  const testQuestions = questions;
  const totalTestDuration = testQuestions.total_duration * 60;
  const MySwal = withReactContent(Swal)

  const [sections, setSections] = useState();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(sectionID);
  const [currentSectionQuestionCount, setCurrentSectionQuestionCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedChoices, setSelectedChoices] = useState({});
  const [revisitQuestions, setRevisitQuestions] = useState({});
  const [sectionChoices, setSectionChoices] = useState([]);
  const [attemptedCount, setAttemptedCount] = useState();
  const [finalReportResponse, setFinalReportResponse] = useState({});
  const [showCanvas, setShowCanvas] = useState(false);
  const [sectionwiseReport, setSectionwiseReport] = useState([]);
  const handleCanvasClose = () => setShowCanvas(false);
  const childRef = useRef(null);

  const callHandleTest = async () => {
    // if (childRef.current) {
    //   childRef.current.handleFinishTest(); //call child's method
    // }

    const token = localStorage.getItem("token")
    // let end_date = new Date()

    // let year = end_date.getFullYear();
    // let month = String(end_date.getMonth() + 1).padStart(2, '0'); // getMonth() returns month from 0-11
    // let day = String(end_date.getDate()).padStart(2, '0');
    // let hours = String(end_date.getHours()).padStart(2, '0');
    // let minutes = String(end_date.getMinutes()).padStart(2, '0');
    // let seconds = String(end_date.getSeconds()).padStart(2, '0');

    // let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    // formattedDate = "2024-07-23 16:56:43"

    // console.log(formattedDate)

    try {
      const url = `${baseUrl}/final_quiz_submit`;
      const response = await axios.post(url, {
        // end_date: formattedDate,
        token: token
      })
      navigate("/feedback")
    } catch (error) {
      let errMsg = "Something went wrong!";
      if (error.response.status == 404) {
        errMsg = "404 - Route Not Found";
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

  if (!localStorage.getItem("totalTestTimeTaken")) {
    localStorage.setItem("totalTestTimeTaken", totalTestDuration);
  }


  // Array(questionsData.length).fill({}).map(() => ({}))

  const [savingCompleted, setSavingCompleted] = useState(false);
  const [savingInprogress, setSavingInprogress] = useState(false)
  const [options, setOptions] = useState()
  // const [currentSectionID, setCurrentSectionID] = useState(sectionID)
  const [currentGroup, setCurrentGroup] = useState(group)

  const token = localStorage.getItem("token")

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



  const handleFinishTestClick = async () => {
    try {
      const url = `${baseUrl}/get_final_report/${token}`;
      const response = await axios.get(url);
      let category_group = response.data.counts_by_category_group
      setSectionwiseReport([category_group])
      setShowCanvas(true)
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
    // let reportResponse = {}
    // Object.keys(reportRespond).forEach((category) => {
    // console.log(reportRespond[category])
    // let { attempted, unattempted, revisit } = reportRespond[category]
    // reportResponse[category] = { "attempted": attempted, "unattempted": unattempted, "revisit": revisit }
    // })
    // console.log(reportResponse)

    // navigate('/summary', {
    // });
  };

  // Initialize timers from JSON
  // const totalTestDuration = testQuestions.total_duration * 60; // converting minutes to seconds
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

  const [totalTestTime, setTotalTestTime] = useState(() => {
    const savedTime = localStorage.getItem("totalTestTimeTaken")
    return savedTime !== null ? parseInt(savedTime, 10) : 0;
  });
  const [sectionTimes, setSectionTimes] = useState(sectionDuration);
  // const sectionTimeRef = useRef(sectionDuration[currentSectionID] * 60);
  const sectionTimeRef = useRef(sectionDuration[currentSectionIndex] * 60);
  const prevSectionRef = useRef(sectionDuration[currentSectionIndex]);

  const callAlert = () => {
    MySwal.fire({
      title: 'Time is Up!',
      html: ReactDOMServer.renderToString(<FcAlarmClock size={40} />),
      showCloseButton: false,
      backdrop: false,
      showDenyButton: true,
      denyButtonText: `Submit Quiz`,
      showConfirmButton: false,
      width: '400px',
      timer: 10000,
      timerProgressBar: true,
      willClose: () => {
        callHandleTest()
      },
      customClass: {
        popup: 'custom-swal-box' // Apply your custom CSS class here
      }
    })
  }

  useEffect(() => {
    if (!totalTestDuration) { return }
    let totalTestTimer;
    if (totalTestTime > 0) {
      totalTestTimer = setInterval(() => {
        setTotalTestTime(prevTime => {
          if (prevTime <= 1) {
            clearInterval(totalTestTimer);
          }
          const newTime = prevTime - 1
          if (newTime == 0) {
            callAlert()
          }
          localStorage.setItem('totalTestTimeTaken', newTime);
          // if (newTime <= 0) {
          //   clearInterval(totalTestTimer);
          //   return 0; // Ensure the time does not go below 0
          // }
          return newTime
          // }
          // if (prevTime <= 1) clearInterval(totalTestTimer);
          // return prevTime - 1;
        });

      }, 1000);
    }

    if (totalTestTime == 0) {
      callAlert()
    }

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

    const data = {
      token: token,
      qq_id: currentQuestion.qq_id,
      oid: option,
      timeTaken: timeTaken
    }
    let config = {}
    if (option === null) {
      config = {
        method: "put",
        url: `${baseUrl}/clear_answers`,
        data: data
      }
    } else {
      config = {
        url: `${baseUrl}/save_answers`,
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
    } finally {
      setSavingInprogress(false)
      getFinalReport()
    }
  }

  const getFinalReport = async () => {
    try {

      const response = await axios.get(`${baseUrl}/get_final_report/${token}`);
      setFinalReportResponse(response.data)
      const responseDetails = response.data.counts_by_category_group[currentGroup][currentSectionIndex]
      console.log(response.data)
      setAttemptedCount(responseDetails.attempted)
      const questionsDetails = responseDetails.questions_details
      const revisit = questionsDetails.reduce((acc, question, index) => {
        acc[index + 1] = question.revisit;
        return acc;
      }, {});
      Object.keys(revisit).forEach(index => {
        let key = `${currentSectionIndex}-${index}`
        // revisitQuestions[`${currentSectionIndex}-${i}`]
        setRevisitQuestions((prevRevisitQuestions) => {
          const newRevisitQuestions = { ...prevRevisitQuestions };
          newRevisitQuestions[key] = revisit[index];
          return newRevisitQuestions
        })
      })

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


  useEffect(() => {
    setSavingCompleted(false)
    const currentTime = new Date().toISOString();
    localStorage.setItem('startTime', currentTime)
    getFinalReport()
    // console.log(currentGroup)
    // console.log(currentSectionIndex)
    // console.log(finalReportResponse)

    // console.log(currentSectionIndex) [currentGroup][currentSectionIndex][questions_details]
  }, [currentPage, currentSection])

  useEffect(() => {
    if (Object.keys(selectedChoices).length == 0 && attemptedCount > 0) {
      const fetchQuestions = async () => {
        try {
          const url = `${baseUrl}/get_final_report/${token}`
          const response = await axios.get(url)
          const question_wise_report = response.data.questions_wise_report
          let selectedChoices = {}
          Object.keys(question_wise_report).forEach((category) => {
            const { qq_id, selected_oid } = question_wise_report[category]
            selectedChoices[qq_id] = selected_oid;
          })
          setSelectedChoices(selectedChoices)
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
    }
  }, [attemptedCount])


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
    const key = `${currentSectionIndex}-${questionNumber}`;
    const revisit = async (revisit) => {
      try {
        const url = `${baseUrl}/revisit_question`
        const response = await axios.put(url, { token: token, qq_id: currentQuestion.qq_id, revisit: revisit })
        getFinalReport()
        // console.log(revisit)
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
    console.log(revisitQuestions)
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
      // const serverBookmark = Boolean(revisitValues[i]);
      // const shouldShowBookmark = (revisitQuestions[`${currentSectionIndex}-${i}`] || serverBookmark)
      paginationItems.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {/* {revisitQuestions[`${currentSectionIndex}-${i}`]
            ? <BsBookmarkFill style={{ color: 'orange', width: "10px", height: "10px" }} />
            : revisitValues[i] ? <BsBookmarkFill style={{ color: 'orange', width: "10px", height: "10px" }} />
              : null
          } {i} */}
          {revisitQuestions[`${currentSectionIndex}-${i}`]
            ? <BsBookmarkFill style={{ color: 'orange', width: "10px", height: "10px" }} />
            : null
          } {i}
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
            {sectionTimes[currentSectionIndex] && (<><BsClockHistory className='clockIcon' style={{ marginTop: "28px", color: "white", float: "left" }} />
              <div style={{ float: "right", color: "white", marginTop: "20px" }}>
                {/* <span>Section Time: {formatTime(sectionTimes[currentSectionIndex])}</span> */}
                <span>Section Time: N/A</span>
                <div></div>
                <span>Total Test Time: {totalTestDuration === 0 ? "Infinite" : (totalTestTime) ? `${formatTime(totalTestTime)}` : "00:00:00"}</span>
              </div></>)}
          </div>
        </Col>
        <Col xs={12} md={2} style={{ float: "right", marginRight: "20px" }}>
          <Button className='finishbtn' onClick={handleFinishTestClick}>Finish Test</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="card_section">
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
                    <span style={{ fontWeight: "bold" }}>Question </span>
                    <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleToggleRevisit(currentPage)}>
                      {/* {(revisitQuestions[`${currentSectionIndex}-${currentPage}`]) ? (
                        <BsBookmarkFill style={{ marginRight: '2px', width: "13px", height: "13px", color: 'orange' }} />
                      ) : (revisitValues[currentPage]) ? (
                        <BsBookmarkFill style={{ marginRight: '2px', width: "13px", height: "13px", color: 'red' }} />
                      ) : (
                        <BsBookmark style={{ marginRight: '2px', width: "13px", height: "13px" }} />
                      )} 
                      <span>{revisitQuestions[`${currentSectionIndex}-${currentPage}`] ? 'Remove Revisit' :
                        revisitValues[currentPage] ? 'Remove Revisit' :
                          'Revisit'}</span> */}
                      {(revisitQuestions[`${currentSectionIndex}-${currentPage}`]) ? (
                        <BsBookmarkFill style={{ marginRight: '2px', width: "13px", height: "13px", color: 'orange' }} />
                      ) : <BsBookmark style={{ marginRight: '2px', width: "13px", height: "13px" }} />
                      }
                      <span>{revisitQuestions[`${currentSectionIndex}-${currentPage}`] ? 'Remove Revisit' :
                        'Revisit'}</span>
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
      </Row>
      <Offcanvas show={showCanvas} onHide={handleCanvasClose} placement="end" className="custom-offcanvas">
        <Offcanvas.Body>
          <SummaryPage ref={childRef} sectionwiseReport={sectionwiseReport} handleCanvasClose={handleCanvasClose} attemptedCount={finalReportResponse?.overall_counts?.attempted} revisitCount={finalReportResponse?.overall_counts?.revisit} totalQuestions={finalReportResponse?.overall_counts?.attempted + finalReportResponse?.overall_counts?.unattempted} />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default TestPage;