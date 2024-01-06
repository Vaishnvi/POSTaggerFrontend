import React from 'react';
import '../styles/signInPage.css';
import Logo from '../layouts/Logo';
import Header from '../layouts/Header';
import '../styles/header.css';
import '../styles/login_signup.css'
import SelectLanguageandModel from '../layouts/SelectLanguageandModel';
import OutputArch from '../layouts/OutputArch';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SignUpScreen from './SignUpScreen';
import UploadDocumentScreen from './UploadDocumentScreen';
export var userId = "";

async function signIn(email, password) {
  const response = await fetch('http://localhost:8000/api/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
    credentials: 'same-origin',
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data.message); // 'User authenticated successfully'
    console.log(data.user_id);
    userId = data.user_id;
    return true;
  } else {
    console.error(`Error: ${response.status}`);
    return false;
  }
}

function SignInScreen({selectedLanguage, selectedModels}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUpScreen, setshowSignUpScreen] = useState(false);
  const [showUploadDocumentScreen, setshowUploadDocumentScreen] = useState(false);
  console.log("signin",selectedLanguage, selectedModels);

  function handleClick3() {
    navigate('/SignUpScreen');
    setshowSignUpScreen(true);
  } 
  
  async function handleClick5() {
    const success = await signIn(email, password);
    if (success) {
      navigate('/UploadDocumentScreen');
      setshowUploadDocumentScreen(true);
    }
  }

  return (
    <div className='SignInScreen'>
      {showSignUpScreen ? (
        <SignUpScreen />
      ) : (
        <>
        {showUploadDocumentScreen ? (
          <UploadDocumentScreen selectedLanguage={selectedLanguage} selectedModels={selectedModels} userId={userId} />
        ) : (
      <>
      <Logo />
      <Header/>
      <SelectLanguageandModel/>
      <OutputArch/>
      <div className='signIn'>
        <div className='signInPageBox'>
          <div className='signInTitle'>Sign In</div>
          <div className='emailBox'><input type='text' placeholder='Email Address' style={{ all: 'unset' }} onChange={e => setEmail(e.target.value)} /></div>
          <div className='emailPasswordLine' style={{top:'16.02vw'}}/>
          <div className='passwordBox'><input type='password' placeholder='Password' style={{ all: 'unset' }} onChange={e => setPassword(e.target.value)} /></div>
          <div className='emailPasswordLine' style={{top:'18.74vw'}}/>
          <div className='signInMainButton' onClick={handleClick5}>
            <div className='signInText'>Sign In</div>
          </div>
          <div className='newAccount' onClick={handleClick3}>Sign Up</div>
        </div>
        </div>      
      </>  
    )}
          </>  
    )}
    </div>
  );
}

export default SignInScreen;