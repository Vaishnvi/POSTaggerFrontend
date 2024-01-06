import React from 'react';
import Logo from '../layouts/Logo';
import Header from '../layouts/Header';
import '../styles/header.css';
import SelectLanguageandModelUploadDocPage from '../layouts/SelectLanguageandModelUploadDocPage';
import OutputArch from '../layouts/OutputArch';
import '../styles/uploadDocPage.css';
import {useEffect, useState} from 'react';

const uploadDocumentScreenSize = {
  width: 100, 
  height: 67.03,
};

function UploadDocumentScreen({selectedLanguage, selectedModels, userId}) {

  const [clickedOnProfile, setClickedOnProfile] = useState(false);

  const handleClick7 = () => {
    setClickedOnProfile(true);
  };

  console.log("uploadDoc",selectedLanguage, selectedModels)

  useEffect(() => {
    setUploadDocumentScreenSize();
  }, []);

  function setUploadDocumentScreenSize() {
    const docScreen = document.querySelector('.language-screen');
    docScreen.style.width = `${uploadDocumentScreenSize.width}vw`;
    docScreen.style.height = `${uploadDocumentScreenSize.height}vw`;
  }      

  return (
    <div className="UploadDocumentScreen">
      <Logo />
      <Header/>
      <SelectLanguageandModelUploadDocPage selectedLanguage={selectedLanguage} selectedModels={selectedModels} userId={userId} />
      <svg className='profilePic' onClick={handleClick7} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M25.0003 8.33268C22.0853 8.33215 19.221 9.0962 16.6935 10.5486C14.166 12.0009 12.0636 14.0908 10.5962 16.6097C9.12882 19.1285 8.34773 21.9881 8.3309 24.9032C8.31408 27.8182 9.06212 30.6867 10.5003 33.2223C11.4725 31.9589 12.7221 30.936 14.1526 30.2326C15.5831 29.5293 17.1563 29.1643 18.7503 29.166H31.2503C32.8444 29.1643 34.4176 29.5293 35.8481 30.2326C37.2786 30.936 38.5282 31.9589 39.5003 33.2223C40.9386 30.6867 41.6866 27.8182 41.6698 24.9032C41.653 21.9881 40.8719 19.1285 39.4045 16.6097C37.9371 14.0908 35.8347 12.0009 33.3072 10.5486C30.7797 9.0962 27.9154 8.33215 25.0003 8.33268ZM41.5483 37.6577C44.3337 34.0264 45.8404 29.576 45.8337 24.9993C45.8337 13.4931 36.5066 4.16602 25.0003 4.16602C13.4941 4.16602 4.16702 13.4931 4.16702 24.9993C4.16014 29.576 5.66682 34.0264 8.45243 37.6577L8.44202 37.6952L9.1816 38.5556C11.1355 40.84 13.5616 42.6735 16.2925 43.9298C19.0234 45.1862 21.9943 45.8353 25.0003 45.8327C29.224 45.8405 33.3491 44.5575 36.8233 42.1556C38.3044 41.1323 39.6474 39.9223 40.8191 38.5556L41.5587 37.6952L41.5483 37.6577ZM25.0003 12.4993C23.3427 12.4993 21.753 13.1578 20.5809 14.3299C19.4088 15.502 18.7503 17.0917 18.7503 18.7493C18.7503 20.407 19.4088 21.9967 20.5809 23.1688C21.753 24.3409 23.3427 24.9993 25.0003 24.9993C26.658 24.9993 28.2477 24.3409 29.4198 23.1688C30.5919 21.9967 31.2503 20.407 31.2503 18.7493C31.2503 17.0917 30.5919 15.502 29.4198 14.3299C28.2477 13.1578 26.658 12.4993 25.0003 12.4993Z" fill="black"/>
      </svg>
      {clickedOnProfile ? (
        <div className='profileTitle'>
          <svg className='profileClose' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
            <path d="M12 0C5.31429 0 0 5.31429 0 12C0 18.6857 5.31429 24 12 24C18.6857 24 24 18.6857 24 12C24 5.31429 18.6857 0 12 0ZM16.6286 18L12 13.3714L7.37143 18L6 16.6286L10.6286 12L6 7.37143L7.37143 6L12 10.6286L16.6286 6L18 7.37143L13.3714 12L18 16.6286L16.6286 18Z" fill="#222683"/>
          </svg>
          <div className='profileBox'/>
            <div className='profileDetailsMenuItem'>
              <div className='profileDetailsMenuItemSmallIcon'/>
              <svg className='profilePicInMenu' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 119 119" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M59.5004 19.8327C52.5625 19.8314 45.7456 21.6499 39.7301 25.1065C33.7146 28.5632 28.711 33.5371 25.2185 39.5319C21.7261 45.5267 19.8671 52.3327 19.8271 59.2704C19.7871 66.2082 21.5674 73.0352 24.9904 79.0699C27.304 76.063 30.2781 73.6285 33.6828 71.9546C37.0874 70.2806 40.8315 69.412 44.6254 69.416H74.3754C78.1693 69.412 81.9133 70.2806 85.318 71.9546C88.7227 73.6285 91.6968 76.063 94.0104 79.0699C97.4334 73.0352 99.2137 66.2082 99.1737 59.2704C99.1336 52.3327 97.2746 45.5267 93.7822 39.5319C90.2898 33.5371 85.2862 28.5632 79.2707 25.1065C73.2552 21.6499 66.4383 19.8314 59.5004 19.8327ZM98.8844 89.6262C105.514 80.9836 109.1 70.3917 109.084 59.4993C109.084 32.1145 86.8853 9.91602 59.5004 9.91602C32.1155 9.91602 9.91705 32.1145 9.91705 59.4993C9.90068 70.3917 13.4866 80.9838 20.1163 89.6262L20.0915 89.7154L21.8518 91.7632C26.5021 97.2001 32.2761 101.564 38.7757 104.554C45.2753 107.544 52.346 109.089 59.5004 109.083C69.5526 109.101 79.3704 106.048 87.6389 100.331C91.1639 97.8957 94.3603 95.016 97.149 91.7632L98.9092 89.7154L98.8844 89.6262ZM59.5004 29.7493C55.5553 29.7493 51.7718 31.3165 48.9822 34.1061C46.1926 36.8957 44.6254 40.6793 44.6254 44.6243C44.6254 48.5694 46.1926 52.353 48.9822 55.1426C51.7718 57.9322 55.5553 59.4993 59.5004 59.4993C63.4455 59.4993 67.229 57.9322 70.0186 55.1426C72.8082 52.353 74.3754 48.5694 74.3754 44.6243C74.3754 40.6793 72.8082 36.8957 70.0186 34.1061C67.229 31.3165 63.4455 29.7493 59.5004 29.7493Z" fill="#999999"/>
              </svg>
              <div className='profileName'>Vaishnavi Khindkar</div>
              <div className='profileEmail'>vkhindkar@gmail.com</div>
              <div className='profileDivider'/>
              <div className='itemsMenu' style={{top:'15.62vw'}}>Profile</div>
              <div className='divider2' style={{top:'16.92vw'}}/>
              <div className='itemsMenu' style={{top:'17.7vw'}}>History</div>
              <div className='divider2' style={{top:'19.01vw'}}/>
              <div className='itemsMenu' style={{top:'19.79vw'}}>Downloads</div>
              <div className='divider2' style={{top:'21.09vw'}}/>
              <div className='itemsMenu' style={{top:'21.87vw'}}>Draft</div>
              <div className='divider2' style={{top:'23.17vw'}}/>
              <div className='itemsMenu' style={{top:'23.95vw'}}>LogOut</div>
              <div className='divider2' style={{top:'25.26vw'}}/>
              <div className='logoutPic'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                  <path d="M5 21C4.45 21 3.979 20.804 3.587 20.412C3.195 20.02 2.99934 19.5493 3 19V5C3 4.45 3.196 3.979 3.588 3.587C3.98 3.195 4.45067 2.99934 5 3H12V5H5V19H12V21H5ZM16 17L14.625 15.55L17.175 13H9V11H17.175L14.625 8.45L16 7L21 12L16 17Z" fill="#323232"/>
                </svg>
              </div>
            </div>
        </div>
      ) : (
        <div className='userId'>vkhindkar@gmail.com</div>
      )}
    </div>
  );
}

export default UploadDocumentScreen;
;
