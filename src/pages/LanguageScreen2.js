import React from "react";
import Logo from '../layouts/Logo';
import Header from '../layouts/Header';
import '../styles/header.css';
import SignIn from "../components/SignIn";
import SelectLanguageandModel from "../layouts/SelectLanguageandModel";
import { useEffect, useState } from 'react';
import '../styles/signInPage.css'
import { useNavigate } from 'react-router-dom';
import SignInScreen from "./SignInScreen";

const languageScreen2Size = {
    width: 100, 
    height: 67.03,
  };

function LanguageScreen2({selectedLanguage, setSelectedLanguage}){
    console.log("Languagescreen2",selectedLanguage)
    const navigate = useNavigate();
    const [showSignInScreen, setshowSignInScreen] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [selectedModels, setSelectedModels] = useState(false);

    const handleButtonClick = () => {
        setIsButtonClicked(true);
      };

    useEffect(() => {
        setLanguageScreen2Size();
    }, []);

    function handleClick2() {
        navigate('/SignInScreen');
        setshowSignInScreen(true);
    }    

    function setLanguageScreen2Size() {
        const languageScreen2 = document.querySelector('.language-screen');
        languageScreen2.style.width = `${languageScreen2Size.width}vw`;
        languageScreen2.style.height = `${languageScreen2Size.height}vw`;
    }  
    
    // Callback function to handle language and model selection
    const handleSelection = (language, models) => {
        setSelectedLanguage(language);
        setSelectedModels(models);
    }

    return (
        <div className='LanguageScreen2'>
        {showSignInScreen ? (
          <SignInScreen selectedLanguage={selectedLanguage} selectedModels={selectedModels}/>
        ) : (
          <>
          <Logo />
          <Header/>
          {!isButtonClicked && <SignIn onClick={handleClick2}/>}          
          <SelectLanguageandModel selectedLanguage={selectedLanguage} onButtonClick={handleButtonClick} onSelection={handleSelection}/>
          </>
        )}
      </div>
    );
}

export default LanguageScreen2;
