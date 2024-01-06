import React from "react";
import '../styles/selectLanguageandModel.css';
import '../styles/txtUploadDoc.css';
import {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import SignInScreen from "../pages/SignInScreen";
import LanguageScreen from "../pages/LanguageScreen";
import OutputArch from "./OutputArch";

function SelectLanguageandModel({selectedLanguage, onButtonClick, onSelection}) {
    const [isVisible, setIsVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const languages = ['Marathi', 'Hindi', 'Urdu', 'Telugu', 'Tamil', 'Malyalam', 'Bengali', 'Kannada', 'Punjabi'];
    const [selectedLang, setSelectedLang] = useState(selectedLanguage ? selectedLanguage.selectedLanguage:null);
    const [inputText, setInputText] = useState('');
    const [newInputText, setNewInputText] = useState('');
    const [selectedModels, setSelectedModels] = useState([]);
    const [clicked, setClicked] = useState(false);
    const navigate = useNavigate();
    const [showSignInScreen, setshowSignInScreen] = useState(false);
    const [showLanguageScreen, setshowLanguageScreen] = useState(false);
    const [clickedOnSubmit, setClickedOnSubmit] = useState(false);
    const [text, setText] = useState('');
    const [pdfUrl, setPdfUrl] = useState('');
    console.log("here", selectedLang, selectedModels)
    //const[dropDownModels, setDropDownModels] = useState([]);
    const [matchingItems, setMatchingItems] = useState([]);
    const [newMatchingItems, setNewMatchingItems] = useState([]);
    let dropDownModels = [];
    const divRef = useRef();

    const handleTextChange = (e) => {
        if (e.target.innerText.length <= 200) {
            setText(e.target.innerText);
        } else {
            e.target.innerText = text;
        }
      };

    useEffect(() => {
        if(divRef.current){
            if (text !== divRef.current.innerText) {
                divRef.current.innerText = text;
            }
            // Move the caret to the end of the div
            const range = document.createRange();
            const sel = window.getSelection();
            range.selectNodeContents(divRef.current);
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }, [text]);

    useEffect(() => {
        if (clickedOnSubmit) {
            setClickedOnSubmit(false);
        }
        if (selectedLang && selectedModels) {
            onSelection({selectedLanguage:selectedLang}, selectedModels);
        }
    }, [selectedLang, selectedModels]);

    useEffect(() => {
        fetch('http://localhost:8000/api/models')
        .then(response => response.json())
        .then(data =>  {
            console.log("data",data)
            // Map over the data and extract only the modelName property
            dropDownModels = data.map(model => model.modelName);
            console.log("dropdownmodels",dropDownModels)
            setMatchingItems(dropDownModels.filter(item =>
                item.toLowerCase().includes(inputText.toLowerCase()) && !selectedModels.includes(item) 
            ));
        
            setNewMatchingItems(dropDownModels.filter(item =>
                item.toLowerCase().includes(newInputText.toLowerCase()) && !selectedModels.includes(item)
            ));
        })
        .catch(error => console.error('Error:', error));
    
        console.log(dropDownModels);
    },[dropDownModels, inputText, newInputText, selectedModels]) // Empty dependency array means this effect runs once on mount

    if (!selectedLanguage) {
        // Handle the case when selectedLanguage is undefined
        return null; // Or return a loading spinner, an error message, etc.
    }

    const handleBackClick = () => {
        navigate('/LanguageScreen');
        setshowLanguageScreen(true);
    }
  
    const uploadText = (data) => {       
          return fetch('http://localhost:8000/api/upload-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'same-origin',
        })
        .then(response => response.text()) // Change this line
        .then(text => {
          const url = window.URL.createObjectURL(new Blob([text], {type: 'text/plain'})); // And this line
          console.log("url", url)
          setPdfUrl(url); // Assuming you have a setTextUrl function
        })
        .catch(error => {
          console.error(error);
        });
    }

    const displayOutput = () => {
        setClickedOnSubmit(true);
        console.log("text", text, "language", selectedLang);
  
        const data = {
            text: text,
            language: selectedLang
        };

        uploadText(data)
        .then(() => {
            console.log('Text uploaded successfully');
        })
        .catch((error) => {
            console.error(error);
        });
    }
    
    const handleUploadButtonClick = () => {
      console.log("In selectlanguageandmodels",selectedLanguage);
      setClicked(true);
      navigate('/SignInScreen', { state: { selectedLanguage } });
      setshowSignInScreen(true);
      onButtonClick();
    };

    const langStyle = {
        top: isOpen ? '13.43vw' : '13.8vw',
        height: isOpen ? '4.1vw' : '2.9vw',
    };

    const handleLanguageClick = (language) => {
        setSelectedLang(language);
        setIsOpen(false);
    }

    const handleInputChange = (event) => {
        setInputText(event.target.value);
      };
    
      const handleModelSelect = (model, isNewInput) => {
        setSelectedModels(prevModels => [...prevModels, model]);
        if (isNewInput) {
          setNewInputText('');
        } else {
          setInputText('');
        }
      };

    const handleNewInputChange = (event) => {
        setNewInputText(event.target.value);
      };

      const handleModelUnselect = (model) => {
        setSelectedModels(prevModels => prevModels.filter(m => m !== model));
      };

    return(
        <div className="selectLanguageAndModel">
            {showLanguageScreen ? (
                <LanguageScreen/>
            ) : (
                <>
            {showSignInScreen ? (
            <SignInScreen selectedLanguage={{selectedLanguage:selectedLang}} selectedModels={selectedModels} setSelectedModels={setSelectedModels} />
                ) : (
                <>
            <div className="selectLanguageandModel">Select Language</div>
            <div className="selectLanguageandModel" style={{ marginLeft: '11.87vw' }}>Select Model</div>
            <svg
                className='backArrow' onClick={handleBackClick}
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                style={{
                position: 'absolute',
                top: '14.63vw',
                left: '6.97vw',
                }}
            >
                <path d='M5.25 11.25H20.25C20.4489 11.25 20.6397 11.329 20.7803 11.4697C20.921 11.6103 21 11.8011 21 12C21 12.1989 20.921 12.3897 20.7803 12.5303C20.6397 12.671 20.4489 12.75 20.25 12.75H5.25C5.05109 12.75 4.86032 12.671 4.71967 12.5303C4.57902 12.3897 4.5 12.1989 4.5 12C4.5 11.8011 4.57902 11.6103 4.71967 11.4697C4.86032 11.329 5.05109 11.25 5.25 11.25Z' fill='#0F2749' />
                <path d='M5.56038 12.0009L11.7809 18.2199C11.9217 18.3608 12.0008 18.5518 12.0008 18.7509C12.0008 18.9501 11.9217 19.1411 11.7809 19.2819C11.64 19.4228 11.449 19.5019 11.2499 19.5019C11.0507 19.5019 10.8597 19.4228 10.7189 19.2819L3.96888 12.5319C3.89903 12.4623 3.84362 12.3795 3.80581 12.2884C3.768 12.1973 3.74854 12.0996 3.74854 12.0009C3.74854 11.9023 3.768 11.8046 3.80581 11.7135C3.84362 11.6224 3.89903 11.5396 3.96888 11.4699L10.7189 4.71995C10.8597 4.57912 11.0507 4.5 11.2499 4.5C11.449 4.5 11.64 4.57912 11.7809 4.71995C11.9217 4.86078 12.0008 5.05178 12.0008 5.25095C12.0008 5.45011 11.9217 5.64112 11.7809 5.78195L5.56038 12.0009Z' fill='#0F2749' />
            </svg>
            <div className="uploadDoc" style={{ left:'8.29vw', backgroundColor: '#0F2749' }}>
                <svg className="uploadDocPic" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 18" fill="none">
                    <path d="M9.9 1.8H1.8V16.2H12.6V4.5H9.9V1.8ZM1.8 0H10.8L14.4 3.6V16.2C14.4 16.6774 14.2104 17.1352 13.8728 17.4728C13.5352 17.8104 13.0774 18 12.6 18H1.8C1.32261 18 0.864773 17.8104 0.527208 17.4728C0.189642 17.1352 0 16.6774 0 16.2V1.8C0 1.32261 0.189642 0.864773 0.527208 0.527208C0.864773 0.189642 1.32261 0 1.8 0ZM3.6 8.1H10.8V9.9H3.6V8.1ZM3.6 11.7H10.8V13.5H3.6V11.7Z" fill={'white'}/>
                </svg>
                <div className="uploadTxt" style={{left:'2.48vw', width:'2.86vw', height:'1.25vw', color: '#FFF'}}>Enter</div>
                <div className="uploadTxt" style={{left:'4.5vw', width:'4.11vw', height:'1.25vw', color: '#FFF'}}>Text</div>
            </div>
            <div className="orTxt">Or</div>
            <div className="uploadDoc" style={{ backgroundColor: clicked ? '#0F2749' : '' }} onClick={handleUploadButtonClick}>
                <svg className="uploadDocPic" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 18" fill="none">
                    <path d="M9.9 1.8H1.8V16.2H12.6V4.5H9.9V1.8ZM1.8 0H10.8L14.4 3.6V16.2C14.4 16.6774 14.2104 17.1352 13.8728 17.4728C13.5352 17.8104 13.0774 18 12.6 18H1.8C1.32261 18 0.864773 17.8104 0.527208 17.4728C0.189642 17.1352 0 16.6774 0 16.2V1.8C0 1.32261 0.189642 0.864773 0.527208 0.527208C0.864773 0.189642 1.32261 0 1.8 0ZM3.6 8.1H10.8V9.9H3.6V8.1ZM3.6 11.7H10.8V13.5H3.6V11.7Z" fill={clicked ? 'white' : '#0B5E97'}/>
                </svg>
                <div className="uploadTxt" style={{left:'2.08vw', width:'2.86vw', height:'1.25vw', color: clicked ? '#FFF' : ''}}>Upload</div>
                <div className="uploadTxt" style={{left:'5.31vw', width:'4.11vw', height:'1.25vw', color: clicked ? '#FFF' : ''}}>Document</div>
            </div>
            <div className="textToAnnotateBox" contentEditable="true"  onInput={handleTextChange} ref={divRef} />
            <div className="submitButton" onClick={displayOutput}>
                <div className="submitText">Submit</div>
            </div>
            {clickedOnSubmit &&
                <div>
                    <OutputArch selectedModels={selectedModels} pdfUrl={pdfUrl}/>
                </div>
            }
            <div className='lang' style={langStyle} onClick={() => setIsOpen(!isOpen)}>
                <div className='langTxt'>{selectedLang}</div>
                <svg className='dropDown' viewBox='0 0 50 50' fill='none' xmlns='http://www.w3.org/2000/svg' onClick={() => setIsVisible(!isVisible)}>
                    <path d='M14.5835 20.834L25.0002 31.2507L35.4168 20.834H14.5835Z' fill='white' />
                </svg>
            </div>
            {isOpen && (
                <div className="dropDownLanguages">
                    {languages.filter(language => language !== selectedLang).map((language, index) => (
                        <div key={index} className="dropDownItems" onClick={() => handleLanguageClick(language)}>
                            {language}
                        </div>
                    ))}
                </div>
            )}
            <div className='modelContainer'>
            {selectedModels.map((model, index) => (
                <div key={index} className='sampleModel' style={{left:'0.52vw'}}>
                <div className='smTxt'>{model}</div>
                <svg className='unSelect' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg' onClick={() => handleModelUnselect(model)}>
                    <path d='M10 0C4.42857 0 0 4.42857 0 10C0 15.5714 4.42857 20 10 20C15.5714 20 20 15.5714 20 10C20 4.42857 15.5714 0 10 0ZM10 18.5714C5.28571 18.5714 1.42857 14.7143 1.42857 10C1.42857 5.28571 5.28571 1.42857 10 1.42857C14.7143 1.42857 18.5714 5.28571 18.5714 10C18.5714 14.7143 14.7143 18.5714 10 18.5714Z' fill='#FEFEFE' />
                    <path d='M13.8571 15L10 11.1429L6.14286 15L5 13.8571L8.85714 10L5 6.14286L6.14286 5L10 8.85714L13.8571 5L15 6.14286L11.1429 10L15 13.8571L13.8571 15Z' fill='#FEFEFE' />
                </svg>
                </div>
            ))}
            {selectedModels.length === 0 ? (
                <div className="typeHereBox" style={{position:'relative'}}>
                <input 
                    type='textArea' 
                    placeholder='Type here...' 
                    style={{ all: 'unset' }} 
                    value={inputText}
                    onChange={handleInputChange}
                />
                </div>
            ) : (
                <div className="typeHereBox" style={{position:'relative'}}>
                <input 
                    type='textArea' 
                    placeholder='Type here...' 
                    style={{ all: 'unset' }} 
                    value={newInputText}
                    onChange={handleNewInputChange}
                />
                </div>
            )}
            {inputText && matchingItems.length > 0 && selectedModels.length === 0 && (
                <div className='dropDownModels'>
                {matchingItems.map((item) => (
                    <div 
                    className='dropDownModelItems' 
                    onClick={() => handleModelSelect(item, false)}
                    >
                    {item}
                    </div>
                ))}
                </div>
            )}
            {newInputText && newMatchingItems.length > 0 && selectedModels.length > 0 && (
                <div className='dropDownModels'>
                {newMatchingItems.map((item) => (
                    <div 
                    className='dropDownModelItems' 
                    onClick={() => handleModelSelect(item, true)}
                    >
                    {item}
                    </div>
                ))}
                </div>
            )}
            </div>
            </>
            )}
          </>
        )}
        </div>
    )
}

export default SelectLanguageandModel;