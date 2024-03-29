const [inputValue, setInputValue] = useState('');

const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleItemClick = (item) => {
      setSelectedModel(item);
      setInputValue(''); // clear the input
    };

  const matchingItems = dropDownItems.filter(item =>
      item.toLowerCase().includes(inputValue.toLowerCase())
  );

<div className='modelContainer' style={{ display: 'flex' }}>
{selectedModel && (
    <div className='sampleModel' style={{position:'relative', left:'0.52vw'}}>
    <div className='smTxt'>{selectedModel}</div>
    <svg className='unSelect' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M10 0C4.42857 0 0 4.42857 0 10C0 15.5714 4.42857 20 10 20C15.5714 20 20 15.5714 20 10C20 4.42857 15.5714 0 10 0ZM10 18.5714C5.28571 18.5714 1.42857 14.7143 1.42857 10C1.42857 5.28571 5.28571 1.42857 10 1.42857C14.7143 1.42857 18.5714 5.28571 18.5714 10C18.5714 14.7143 14.7143 18.5714 10 18.5714Z' fill='#FEFEFE' />
        <path d='M13.8571 15L10 11.1429L6.14286 15L5 13.8571L8.85714 10L5 6.14286L6.14286 5L10 8.85714L13.8571 5L15 6.14286L11.1429 10L15 13.8571L13.8571 15Z' fill='#FEFEFE' />
    </svg>
    </div>
)}
<div className="typeHereBox" style={{position:'relative', marginLeft:'0.41vw'}}>
    <input 
    type='text' 
    placeholder='Type here...' 
    style={{ all: 'unset' }} 
    onChange={handleInputChange}
    value={inputValue} 
    />
</div>
</div>
{inputValue && matchingItems.length > 0 && (
    <div className="dropDownModels">
    {matchingItems.map((item, index) => (
        <div 
        className="dropDownModelItems" 
        key={index} 
        onClick={() => handleItemClick(item)}
        >
        {item}
        </div>
    ))}
    </div>
)}