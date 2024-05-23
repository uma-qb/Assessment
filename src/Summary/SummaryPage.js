import React, {  } from 'react';
import { BsX } from "react-icons/bs";
import './Summary.css'
import { PieChart } from '@mui/x-charts/PieChart';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const SummaryPage = ({ attemptedCount, totalQuestions, revisitCount }) => {
  const unattemptedCount = totalQuestions - attemptedCount;

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
    { label: 'Attempted', value: 800 },
    { label: 'UnAttempted', value: 100 },
    { label: 'Revisit', value: 100 },
  ];
  const navigate = useNavigate();

   const handleBack = () =>{
    navigate('/test', {
    });
   }
   
   const handleTest = () =>{
    navigate('/feedback', {
    });
   }
   
       
    return (
        <div>
            <div className="heading">
            Test Summary <BsX onClick={handleBack}style={{width:"35px",height:"35px",color:"#DD5353",float:"right",marginRight:"15px"}}/>
            </div>
            <hr className='hrLine' />
      <PieChart
      colors={['#7FC97F', '#BEAED4', '#FDC086']}
      series={[
        {
          outerRadius: 80,
          innerRadius: 50,
          data: data1,
        },
      ]}
      height={200}
    />
      <hr className='hrLine'/>
      <div>
        <span className='sectionTitle'>Section Title 1</span>
      <ProgressBar variant="success" now={100} className='sectionTitle'
      style={{height:"8px",marginBottom:"20px",marginRight:"90px"}}/>
        <hr className='hrLine'/>
      </div>
      <div>
        <span className='sectionTitle'>Section Title 2</span>
        <ProgressBar variant="success" now={90} className='sectionTitle'
      style={{height:"8px",marginBottom:"20px",marginRight:"90px"}}/>
        <hr className='hrLine'/>
      </div>
      <div>
        <span className='sectionTitle'>Section Title 3</span>
        <ProgressBar variant="success" now={90} className='sectionTitle'
      style={{height:"8px",marginBottom:"20px",marginRight:"90px"}}/>
        <hr className='hrLine'/>
      </div>
      <div>
        <span className='sectionTitle'>Section Title 4</span>
        <ProgressBar variant="success" now={90} className='sectionTitle'
      style={{height:"8px",marginBottom:"20px",marginRight:"90px"}}/>
        <hr className='hrLine'/>
      </div>
      <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button variant="primary" size="md" style={{ width: '80%' ,marginBottom:"20px"}} onClick={handleBack}>
          Back to test
        </Button>
      </div>
      <div style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button variant="danger" size="md" style={{ width: '80%',marginBottom:"20px" }} onClick={handleTest}>
          Finish Test
        </Button>
      </div>
    </div>
        </div>
    )
}

export default SummaryPage;
