import './App.css';

import LanguageScreen from './pages/LanguageScreen';
import { BrowserRouter } from 'react-router-dom';
import {useState} from 'react';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState({selectedLanguage:null});
  return (
    <div className="App">
      <BrowserRouter>
        <LanguageScreen selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
