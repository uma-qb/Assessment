import React, { forwardRef, useContext, useImperativeHandle, useState } from 'react';
import { BsX } from "react-icons/bs";
import './Summary.css'
import { PieChart } from '@mui/x-charts/PieChart';
// import ProgressBar from 'react-bootstrap/ProgressBar';
import { useNavigate } from 'react-router-dom';
import { Accordion, Card, Button } from 'react-bootstrap';
// import ProgressComponent from '../Components/ProgressComponent';
// import StackedBarChart from '../Components/StackedBarChart';
import ProgressBar from '../Components/ProgressBar';
import axios from 'axios';
import UserContext from '../UserContext';
import { Slide, toast } from 'react-toastify';

const SummaryPage = forwardRef(({ attemptedCount, totalQuestions, revisitCount, handleCanvasClose, sectionwiseReport }, ref) => {
  const unattemptedCount = totalQuestions - attemptedCount;
  const [activeKey, setActiveKey] = useState(['0', '1', '2']);
  const { baseUrl } = useContext(UserContext)

  const data = {
    labels: ['Attempted', 'Unattempted', 'Revisit'],
    datasets: [
      {
        data: [attemptedCount, unattemptedCount, revisitCount],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56']
      }
    ]
  };

  const data1 = [
    { label: 'Attempted', value: attemptedCount },
    { label: 'UnAttempted', value: unattemptedCount },
    { label: 'Revisit', value: revisitCount },
  ];
  const navigate = useNavigate();

  const handleBack = () => {

    // navigate('/test', {
    // });
  }

  const handleTest = async () => {
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

  useImperativeHandle(ref, () => ({
    async handleFinishTest() {
      const token = localStorage.getItem("token")
      let end_date = new Date()

      let year = end_date.getFullYear();
      let month = String(end_date.getMonth() + 1).padStart(2, '0'); // getMonth() returns month from 0-11
      let day = String(end_date.getDate()).padStart(2, '0');
      let hours = String(end_date.getHours()).padStart(2, '0');
      let minutes = String(end_date.getMinutes()).padStart(2, '0');
      let seconds = String(end_date.getSeconds()).padStart(2, '0');

      let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      formattedDate = "2024-07-23 16:56:43"

      console.log(formattedDate)

      try {
        const url = `${baseUrl}/final_quiz_submit`;
        const response = await axios.post(url, {
          end_date: formattedDate,
          token: token
        })
        navigate("/feedback")
      } catch (error) {
        console.log(error.response)
      }
    }

  }));

  console.log(sectionwiseReport)
  const keys = Object.keys(sectionwiseReport[0]).map((item, index) => index.toString());

  return (
    <div>
      <div className="heading">
        Test Summary <BsX onClick={handleCanvasClose} style={{ width: "35px", height: "35px", color: "#DD5353", float: "right", marginRight: "15px", cursor: 'pointer' }} />
      </div>
      <hr className='hrLine' />
      <PieChart
        colors={['#7FC97F', '#ff9696', '#FDC086']}

        series={[
          {
            outerRadius: 80,
            innerRadius: 50,
            data: data1,
          },
        ]}
        height={200}
        label={data1.value}
        labelStyle={{
          fontSize: '6px',
          fontColor: 'FFFFFA',
          fontWeight: '800',
        }}
        radius={42}
        labelPosition={112}
      />
      <hr className='hrLine' />
      <div className='scrollit'>
        <Accordion defaultActiveKey={keys} alwaysOpen={true}>
          {Object.keys(sectionwiseReport[0]).map((sectionGroupKey, index) => (
            <Accordion.Item eventKey={`${index}`} key={index}>
              <Accordion.Header key={sectionGroupKey - index}><b>{sectionGroupKey}</b></Accordion.Header>
              <Accordion.Body>

                {Object.values(sectionwiseReport[0][sectionGroupKey]).map((category, idx) => (

                  <div key={category.category_name - idx}>
                    <span className='sectionTitle'>{category.category_name}</span>
                    {/* <ProgressComponent attempted={category.attempted} totalQuestions={category.total_question}/> */}
                    {/* <StackedBarChart attempted={category.attempted} revisit={category.revisit} unattempted={category.unattempted}/> */}
                    <ProgressBar attempted={category.attempted} revisit={category.revisit}
                      unattempted={category.unattempted}
                      totalQuestions={category.total_question} />

                  </div>
                ))}


              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>

      <div className="mt-3" style={{ display: 'flex', width: '100%' }}>
        <div style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button variant="outline-primary" size="md" style={{ width: '80%', marginBottom: "0px" }} onClick={handleCanvasClose}>
            Back to test
          </Button>
        </div>
        <div style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button variant="danger" size="md" style={{ width: '80%', marginBottom: "0px" }} onClick={handleTest}>
            Finish Test
          </Button>
        </div>
      </div>
    </div>
  )
});

export default SummaryPage;
