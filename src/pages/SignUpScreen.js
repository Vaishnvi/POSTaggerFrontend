import React from 'react';
import '../styles/signUpPage.css';
import Logo from '../layouts/Logo';
import Header from '../layouts/Header';
import '../styles/header.css';
import SelectLanguageandModel from '../layouts/SelectLanguageandModel';
import OutputArch from '../layouts/OutputArch';
import { useNavigate } from 'react-router-dom';
import SignInScreen from './SignInScreen';
import {useState} from 'react';

async function signUp(fullName, email, password) {
  const response = await fetch('http://localhost:8000/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ fullName, email, password })
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data.message); // 'User registered successfully'
    return true;
  } else {
    console.error(`Error: ${response.status}`);
    return false;
  }
}

function SignUpScreen() {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSignInScreen, setshowSignInScreen] = useState(false);

    async function handleClick4() {
      const success = await signUp(fullName, email, password);
      if (success) {
        navigate('/SignInScreen');
        setshowSignInScreen(true);
      }
    }

    return (
      <div className='SignUpScreen'>
        {showSignInScreen ? (
          <SignInScreen />
        ) : (
        <>
          <Logo />
          <Header/>
          <SelectLanguageandModel/>
          <OutputArch/>
          <div className='signUp'>
            <div className='signUpPageBox'>
              <div className='signUpTitle'>Sign Up</div>
              <div className='fullNameBox'><input type='text' placeholder='Full Name' style={{ all: 'unset' }} onChange={e => setFullName(e.target.value)} /></div>
              <div className='emailPasswordNameLine' style={{top:'13.28vw'}}/>
              <div className='emailBox'><input type='text' placeholder='Email Address' style={{ all: 'unset' }} onChange={e => setEmail(e.target.value)} /></div>
              <div className='emailPasswordNameLine' style={{top:'16.02vw'}}/>
              <div className='passwordBox'><input type='password' placeholder='Password' style={{ all: 'unset' }} onChange={e => setPassword(e.target.value)} /></div>
              <div className='emailPasswordNameLine' style={{top:'18.74vw'}}/>
              <div className='signUpMainButton'>
                <div className='signUpText'>Sign Up</div>
              </div>
              <div className='existingUser' onClick={handleClick4}>Sign In</div>
            </div>
          </div>
          </>
        )}
      </div>
      );
}

export default SignUpScreen;
