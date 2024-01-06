import React from "react";
import {useState, useEffect} from 'react';
import '../styles/uploadDocPage.css';
import '../styles/selectLanguageandModel.css';
import '../styles/txtUploadDoc.css';
import OutputArch from "./OutputArch";
import axios from 'axios';

function SelectLanguageandModelUploadDocPage({selectedLanguage, selectedModels, userId}) {
    const [clicked, setClicked] = useState(false);
    const [clickedEnterTxt, setClickedEnterTxt] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const languages = ['Marathi', 'Hindi', 'Urdu', 'Telugu', 'Tamil', 'Malyalam', 'Bengali', 'Kannada', 'Punjabi'];
    const [selectedLang, setSelectedLang] = useState(selectedLanguage ? selectedLanguage.selectedLanguage:null);
    const [inputText, setInputText] = useState('');
    const dropDownModels = ["POS Tagger"];
    const [newInputText, setNewInputText] = useState('');
    const [previouslySelectedModels, setSelectedModels] = useState(selectedModels);
    const [isVisible, setIsVisible] = useState(false);
    const [clickedOnSubmit, setClickedOnSubmit] = useState(false);
    const [file, setFile] = useState(null);
    const [text, setText] = useState('');
    const [pdfUrl, setPdfUrl] = useState('');
    //console.log(typeof previouslySelectedModels);
    console.log(selectedLanguage, selectedLang);

    useEffect(() => {
        if (clickedOnSubmit) {
            setClickedOnSubmit(false);
        }
    }, [previouslySelectedModels]);
  
    const handleFileChange = (event) => {
        console.log("file",event.target.files[0])
      setFile(event.target.files[0]);
    };
  
    const handleTextChange = (event) => {
      setText(event.target.value);
    };

    const uploadFile = (formData) => {
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
          }          
        console.log(formData.get('language'));
        return fetch('http://localhost:8000/api/upload-file', {
          method: 'POST',
          body: formData,
          credentials: 'same-origin',
        })
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          console.log("url", url)
          setPdfUrl(url);
        })
        .catch(error => {
          console.error(error);
        });
      }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setClickedOnSubmit(true);

      console.log("text", text, "file", file, "language", selectedLang);
  
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
      } else {
        formData.append('text', text);
      }
      
      formData.append('language', selectedLang);
      formData.append('userId',userId);

      console.log("here",formData, setClickedOnSubmit)

      console.log(formData.get('file')); // Prints the value of the 'file' field
      console.log(formData.get('text')); // Prints the value of the 'text' field
      console.log(formData.get('language')); // Prints the value of the 'language' field
      console.log(formData.get('userId')); // Prints the value of the 'userId' field

      uploadFile(formData)
      .then(() => {
        console.log('File uploaded successfully');
      })
      .catch((error) => {
        console.error(error);
      });
      
  /*
      axios.post('http://localhost:8000/api/upload-file', formData, { responseType: 'blob' })
      .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          console.log("url", url)
          setPdfUrl(url);
      })
      .catch((error) => {
          console.error(error);
      });

      axios.post('/api/upload-file', formData, { responseType: 'blob' })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'output.pdf');
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => {
          console.error(error);
        });*/
    };

    const displayOutput = () => {
        setClickedOnSubmit(true);
    }

    const langStyle = {
        top: isOpen ? '13.43vw' : '13.8vw',
        height: isOpen ? '4.1vw' : '2.9vw',
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setFile(event.dataTransfer.files[0]);
      };
    
      const handleDragOver = (event) => {
        event.preventDefault();
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
      

    const matchingItems = dropDownModels.filter(item =>
        item.toLowerCase().includes(inputText.toLowerCase()) && !previouslySelectedModels.includes(item) 
    );

    const newMatchingItems = dropDownModels.filter(item =>
        item.toLowerCase().includes(newInputText.toLowerCase()) && !previouslySelectedModels.includes(item)
    );

    const handleNewInputChange = (event) => {
        setNewInputText(event.target.value);
      };

      const handleModelUnselect = (model) => {
        setSelectedModels(prevModels => prevModels.filter(m => m !== model));
      };

    
    const handleClick = () => {
      setClicked(true);
      setClickedEnterTxt(false);
    };

    const handleClickEnterTxt = () => {
        setClicked(false);
        setClickedEnterTxt(true);
      };

    return(
        <div className="selectLanguageAndModelUploadDocPage">
            <div className="selectLanguageandModelUploadDocPage">Select Language</div>
            <div className="selectLanguageandModelUploadDocPage" style={{ marginLeft: '11.87vw' }}>Select Model</div>
            <svg
                className='backArrowUDP'
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
            <div className="enterTxtUDP" style={{ color: clickedEnterTxt ? '#2B71D5' : '' }} onClick={handleClickEnterTxt}>Enter Text to Annotate</div>
            <div className="orTxtUDP">Or</div>
            <div className="uploadDocUDP" style={{ backgroundColor: clicked ? '#0F2749' : '' }} onClick={handleClick}>
                <svg className="uploadDocPicUDP" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 18" fill="none">
                    <path d="M9.9 1.8H1.8V16.2H12.6V4.5H9.9V1.8ZM1.8 0H10.8L14.4 3.6V16.2C14.4 16.6774 14.2104 17.1352 13.8728 17.4728C13.5352 17.8104 13.0774 18 12.6 18H1.8C1.32261 18 0.864773 17.8104 0.527208 17.4728C0.189642 17.1352 0 16.6774 0 16.2V1.8C0 1.32261 0.189642 0.864773 0.527208 0.527208C0.864773 0.189642 1.32261 0 1.8 0ZM3.6 8.1H10.8V9.9H3.6V8.1ZM3.6 11.7H10.8V13.5H3.6V11.7Z" fill={clicked ? 'white' : '#0B5E97'}/>
                </svg>
                <div className="uploadTxtUDP" style={{left:'2.08vw', width:'2.86vw', height:'1.25vw', color: clicked ? '#FFF' : ''}}>Upload</div>
                <div className="uploadTxtUDP" style={{left:'5.31vw', width:'4.11vw', height:'1.25vw', color: clicked ? '#FFF' : ''}}>Document</div>
            </div>
            {clickedEnterTxt ? (
                <div className="textToAnnotateBoxUDP">
                    <div className="typeHereBoxUDP"><input type='text' placeholder='Type here...' style={{ all: 'unset' }} value={text} onChange={handleTextChange} /></div>
                </div>
            ) : (
                <div className="textToAnnotateBoxUDP"  onDrop={handleDrop} onDragOver={handleDragOver} >
                        <svg className="dragIconUDP" xmlns="http://www.w3.org/2000/svg" width="69" height="60" viewBox="0 0 69 60" fill="none">
                            <path d="M36.028 14.7458L36.1203 14.7733L36.1243 14.7688C36.5619 14.8481 36.9961 14.586 37.1247 14.1519C38.2963 10.2152 41.9874 7.46504 46.0998 7.46504C46.5867 7.46504 46.9816 7.07016 46.9816 6.5833C46.9816 6.09643 46.5867 5.70156 46.0998 5.70156C41.0457 5.70156 36.7985 9.06665 35.4348 13.6493C35.2956 14.1162 35.5615 14.6067 36.028 14.7458Z" fill="#483EA8" stroke="#F9FFF9" stroke-width="0.3"/>
                            <path d="M56.3438 42.4384H51.9534C51.5494 42.4384 51.2217 42.1107 51.2217 41.7067C51.2217 41.3027 51.5494 40.9749 51.9534 40.9749H56.3438C62.3956 40.9749 67.3197 36.0509 67.3197 29.999C67.3197 23.9471 62.3956 19.023 56.3438 19.023H56.2382C56.026 19.023 55.8242 18.9311 55.6852 18.7706C55.5462 18.6101 55.4834 18.3974 55.5138 18.1873C55.5791 17.7315 55.612 17.2737 55.612 16.8279C55.612 11.5829 51.3444 7.31531 46.0995 7.31531C44.059 7.31531 42.1131 7.95296 40.4719 9.15978C40.1112 9.42478 39.599 9.30718 39.3905 8.91047C34.7425 0.0596993 22.6023 -1.12887 16.3082 6.57053C13.6568 9.81417 12.615 14.0336 13.4498 18.146C13.5418 18.6002 13.1942 19.0236 12.7327 19.0236H12.4395C6.3876 19.0236 1.46353 23.9477 1.46353 29.9996C1.46353 36.0514 6.3876 40.9755 12.4395 40.9755H16.8298C17.2338 40.9755 17.5615 41.3032 17.5615 41.7072C17.5615 42.1113 17.2338 42.439 16.8298 42.439H12.4395C5.5805 42.439 0 36.8585 0 29.9995C0 23.3329 5.27155 17.8742 11.8651 17.5731C11.2457 13.3066 12.4301 9.00295 15.1751 5.64437C21.9138 -2.5996 34.828 -1.67556 40.2871 7.51707C42.0287 6.42522 44.0215 5.85244 46.0992 5.85244C52.4538 5.85244 57.4892 11.261 57.0486 17.58C63.5813 17.9463 68.7829 23.3763 68.7829 29.999C68.7829 36.8585 63.2024 42.4384 56.3434 42.4384L56.3438 42.4384Z" fill="#483EA8"/>
                            <path d="M15.85 41.2935C15.85 51.4634 24.1237 59.737 34.2935 59.737C44.4634 59.737 52.737 51.4633 52.737 41.2935C52.737 31.1235 44.4634 22.85 34.2935 22.85C24.1235 22.85 15.85 31.1237 15.85 41.2935ZM17.6138 41.2935C17.6138 32.0966 25.0964 24.6138 34.2935 24.6138C43.4904 24.6138 50.9732 32.0964 50.9732 41.2935C50.9732 50.4904 43.4904 57.9732 34.2935 57.9732C25.0966 57.9732 17.6138 50.4905 17.6138 41.2935Z" fill="#483EA8" stroke="#F9FFF9" stroke-width="0.3"/>
                            <path d="M33.9428 48.6577C33.9428 49.0363 34.2499 49.3434 34.6285 49.3434C35.0071 49.3434 35.3142 49.0367 35.3142 48.6577V34.7291C35.3142 34.3504 35.0071 34.0434 34.6285 34.0434C34.2498 34.0434 33.9428 34.3504 33.9428 34.7291V48.6577Z" fill="#483EA8" stroke="#483EA8" stroke-width="0.3"/>
                            <path d="M34.6281 35.7009L30.8274 39.5015L34.6281 35.7009ZM34.6281 35.7009L38.4289 39.5016C38.5626 39.6354 38.7386 39.7025 38.9137 39.7025L34.6281 35.7009ZM29.8576 39.5016C30.1254 39.7694 30.5597 39.7696 30.8273 39.5016L38.9138 39.7025C39.0886 39.7025 39.2647 39.6359 39.3987 39.5016C39.6665 39.2337 39.6665 38.7997 39.3986 38.5319L35.113 34.2462C34.8452 33.9784 34.4108 33.9783 34.1432 34.2462C34.1432 34.2463 34.1431 34.2463 34.1431 34.2463L29.8576 38.5319C29.5897 38.7998 29.5897 39.2338 29.8576 39.5016Z" fill="#483EA8" stroke="#483EA8" stroke-width="0.3"/>
                        </svg>
                    <div className="dragTextUDP"> 
                    <label>
                        <input type="file" accept=".pdf, .txt" onChange={handleFileChange} style={{ display: 'none' }}/>
                        <span style={{marginRight:'1vw', textDecorationLine:'underline'}}>Browse</span>
                        {file ? <span style={{color: 'green'}} className="file-name">{file.name+" uploaded successfully!"}</span> : ''}
                    </label>                    
                    </div>
                    <div className="supportedFormatUDP">Supported formates: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT</div>
                </div>
            )}
            <div className="submitButtonUDP" onClick={handleSubmit}>
                <div className="submitTextUDP">Submit</div>
            </div>
            {clickedOnSubmit &&
                <div>
                    <OutputArch selectedModels={previouslySelectedModels} pdfUrl={pdfUrl}/>
                </div>
            }
            <div className='langUDP' style={langStyle} onClick={() => setIsOpen(!isOpen)}>
                <div className='langTxtUDP'>{selectedLang}</div>
                <svg className='dropDownUDP' viewBox='0 0 50 50' fill='none' xmlns='http://www.w3.org/2000/svg' onClick={() => setIsVisible(!isVisible)}>
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
            <div className='modelContainerUDP'>
            {previouslySelectedModels.map((model, index) => (
                <div key={index} className='sampleModelUDP' style={{left:'0.52vw'}}>
                <div className='smTxtUDP'>{model}</div>
                <svg className='unSelectUDP' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg' onClick={() => handleModelUnselect(model)}>
                    <path d='M10 0C4.42857 0 0 4.42857 0 10C0 15.5714 4.42857 20 10 20C15.5714 20 20 15.5714 20 10C20 4.42857 15.5714 0 10 0ZM10 18.5714C5.28571 18.5714 1.42857 14.7143 1.42857 10C1.42857 5.28571 5.28571 1.42857 10 1.42857C14.7143 1.42857 18.5714 5.28571 18.5714 10C18.5714 14.7143 14.7143 18.5714 10 18.5714Z' fill='#FEFEFE' />
                    <path d='M13.8571 15L10 11.1429L6.14286 15L5 13.8571L8.85714 10L5 6.14286L6.14286 5L10 8.85714L13.8571 5L15 6.14286L11.1429 10L15 13.8571L13.8571 15Z' fill='#FEFEFE' />
                </svg>
                </div>
            ))}
            {previouslySelectedModels.length === 0 ? (
                <div className="typeHereBox" style={{position:'relative'}}>
                <input 
                    type='text' 
                    placeholder='Type here...' 
                    style={{ all: 'unset' }} 
                    value={inputText}
                    onChange={handleInputChange}
                />
                </div>
            ) : (
                <div className="typeHereBox" style={{position:'relative'}}>
                <input 
                    type='text' 
                    placeholder='Type here...' 
                    style={{ all: 'unset' }} 
                    value={newInputText}
                    onChange={handleNewInputChange}
                />
                </div>
            )}
            {inputText && matchingItems.length > 0 && previouslySelectedModels.length === 0 && (
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
            {newInputText && newMatchingItems.length > 0 && previouslySelectedModels.length > 0 && (
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
        </div>
    );
}


export default SelectLanguageandModelUploadDocPage;