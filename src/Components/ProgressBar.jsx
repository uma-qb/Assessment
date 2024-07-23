import React from 'react';

const ProgressBar = ({ attempted, revisit, unattempted, totalQuestions }) => {
  const attemptedPercentage = (attempted / totalQuestions) * 100;
  const revisitPercentage = (revisit / totalQuestions) * 100;
  const unattemptedPercentage = (unattempted / totalQuestions) * 100;

  return (
    <div className="stacked-bar">
      <div
        className="progress-bar-segment attempted"
        style={{ width: `${attemptedPercentage}%` }}
      >{attempted}</div>
      <div
        className="progress-bar-segment revisit"
        style={{ width: `${revisitPercentage}%` }}
      >{revisit}</div>
      <div
        className="progress-bar-segment unattempted"
        style={{ width: `${unattemptedPercentage}%` }}
      >{unattempted}</div>
    </div>
  );
};

export default ProgressBar;
