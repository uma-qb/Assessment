import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

const ProgressComponent = ({ attempted, totalQuestions }) => {
  // Calculate the percentage of completion
  const percentage = Math.round((attempted / totalQuestions) * 100);

  return (
    <div>
    <ProgressBar variant="success" className='sectionTitle' style={{ height: "18px", marginBottom: "20px", marginRight: "90px" }} 
    now={ percentage } label={`${percentage}%`} />
  </div>
  );
};

export default ProgressComponent