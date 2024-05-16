import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import FirstPage from './firstpage';
import SecondPage from './secondpage';
import WebcamCapture from './WebcamCapture';
import IdentityCheck from './IdentityCheck'



function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<FirstPage />} />
        <Route path="/secondpage" element={<SecondPage />} />   
        <Route path="/webcam" element={<WebcamCapture/>} />
        <Route path="/identitycheck" element={<IdentityCheck/>} />
      </Routes>
    </Router>
   
  );
}

export default App;
