import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import FirstPage from './firstpage';
import SecondPage from './secondpage';



function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<FirstPage />} />
        <Route path="/secondpage" element={<SecondPage />} />   
      </Routes>
    </Router>
   
  );
}

export default App;
