import React from 'react';
import Logo from '../layouts/Logo';
import Header from '../layouts/Header';
import '../styles/header.css';
import Frame2 from '../layouts/Frame2';
import '../styles/frame2.css'
import StartButton from '../components/StartButton';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageScreen2 from './LanguageScreen2';

const languageScreenSize = {
  width: 100, 
  height: 67.03,
};

function LanguageScreen({selectedLanguage, setSelectedLanguage}) {
  const navigate = useNavigate();
  //const [showLanguageScreen, setShowLanguageScreen] = useState(true);
  const [showLanguageScreen2, setShowLanguageScreen2] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  //const [selectedLanguage, setSelectedLanguage] = useState(null);
  console.log("Language screen",selectedLanguage)

  function handleClick() {
    navigate('/LanguageScreen2');
    //setShowLanguageScreen(false);
    setShowLanguageScreen2(true);
  }

  useEffect(() => {
    setLanguageScreenSize();
  }, []);

  function setLanguageScreenSize() {
    const languageScreen = document.querySelector('.language-screen');
    languageScreen.style.width = `${languageScreenSize.width}vw`;
    languageScreen.style.height = `${languageScreenSize.height}vw`;
  }

  window.addEventListener('load', function() {
    console.log("loaded");
    var elements = document.querySelectorAll('.frame2, .tb1, .tb2, .rect');
    elements.forEach(function(element) {
        element.addEventListener('click', function(event) {
            //event.stopPropagation();
            setIsDisabled(false);
            console.log('Element with .tb1 was clicked', selectedLanguage);
        });
    });

    document.addEventListener('click', function() {
        setIsDisabled(true);
    });
  });


  return (
    <div className='language-screen'>
      {showLanguageScreen2 ? (
        <LanguageScreen2 selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage}/>
      ) : (
        <>
          <Logo />
          <Header/>
          <Frame2 setSelectedLanguage={setSelectedLanguage} /> 
          <StartButton onClick={handleClick} disabled={isDisabled} />
        </>
      )}
    </div>
  );
}

export default LanguageScreen;
