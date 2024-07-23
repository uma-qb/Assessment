import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import FirstPage from './firstpage';
import SecondPage from './secondpage';
import WebcamCapture from './WebcamCapture';
import IdentityCheck from './IdentityCheck'
import ScreenSharingPermission from './ScreenSharingPermission';
import Data from './data';
import Quizpage from './QuizPages/Quizpage';
import QuizProceed from './QuizPages/QuizProceed';
import QuizFirstPage from './QuizPages/QuizFirstPage';
import WebCam from './webcam';
import TestPage from './Test/TestPage';
import SummaryPage from './Summary/SummaryPage';
import Feedback from './Summary/Feedback';
import { UserProvider } from './UserContext';
import { useEffect } from 'react';
import FeedbackForm from './Components/Feedback';

// const usePreventNavigation = () => {
  // useEffect(() => {
    // const handleBeforeUnload = (event) => {
    //   event.preventDefault();
    //   event.returnValue = ''; // Chrome requires returnValue to be set.
    // };

  //   const handlePopState = () => {
  //     if (!window.confirm('Do you really want to leave this page?')) {
  //       window.history.pushState(null, null, window.location.pathname);
  //     }
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);
  //   window.addEventListener('popstate', handlePopState);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //     window.removeEventListener('popstate', handlePopState);
  //   };
  // }, []);
// };

function App() {
  // usePreventNavigation();

  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/:token?" element={<FirstPage />} />
        <Route path="/secondpage" element={<SecondPage />} />   
        <Route path="/webcam" element={<WebcamCapture/>} />
        <Route path="/identitycheck" element={<IdentityCheck/>} />
        <Route path="/screen" element={<ScreenSharingPermission />}/>
        <Route path="/data" element={<Data/>}/>
        <Route path="/quiz" element={<Quizpage/>} />
        <Route path='/quizproceed' element={<QuizProceed/>} />
        <Route path='/quizfirstpage' element={<QuizFirstPage/>}/>
        <Route path='/web' element={<WebCam/>}/>
        <Route path="/test" element={<TestPage/>}/>
        <Route path='summary' element={<SummaryPage/>}/>
        <Route path='feedback' element={<FeedbackForm/>}/>
      </Routes>
    </Router>
    </UserProvider>
   
  );
}

export default App;
