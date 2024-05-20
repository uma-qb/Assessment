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

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<FirstPage />} />
        <Route path="/secondpage" element={<SecondPage />} />   
        <Route path="/webcam" element={<WebcamCapture/>} />
        <Route path="/identitycheck" element={<IdentityCheck/>} />
        <Route path="/screen" element={<ScreenSharingPermission />}/>
        <Route path="/data" element={<Data/>}/>
        <Route path="/quiz" element={<Quizpage/>} />
        <Route path='/quizproceed' element={<QuizProceed/>} />
        <Route path='/quizfirstpage' element={<QuizFirstPage/>}/>
        <Route path='/web' element={<WebCam/>}/>
      </Routes>
    </Router>
   
  );
}

export default App;
