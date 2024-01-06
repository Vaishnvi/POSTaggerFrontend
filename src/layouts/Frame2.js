import React from 'react';

function Frame2({setSelectedLanguage}) {
  const data = [
    {
      language: 'Marathi',
      content: 'Spoken predominantly in Maharashtra state',
      //image: 'https://www.bing.com/th?id=OIP.kizzid8Mg7PqVSFNhAyWGAHaHa&w=110&h=100&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2',
      image: 'https://www.bing.com/th?id=OIP.9XoZgNtuCsjpTe7MInT4XgHaHa&w=110&h=100&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2',
    },
    {
        language: 'Hindi',
        content: 'Third most widely spoken language',
        image: 'https://www.bing.com/th?id=OSK.HEROwXiPFTm6cVaq500z1qhO5YkaXE9D6FRgH4Ez-G9GVOc&pid=cdx&w=320&h=189&c=7',
    },
    {
        language: 'Urdu',
        content: 'Indo-Aryan language, spoken in South Asia',
        image: 'https://www.bing.com/th?id=OSK.531510c56a63ce8bbcbb662c0063d9aa&pid=cdx&w=188&h=189&c=7',
      },
      {
          language: 'Tamil',
          content: 'A Dravidian language spoken in India',
          image: 'https://www.bing.com/th?id=OIP.BNrcIHCxnkUPAr_AA0lUQgHaEw&w=143&h=92&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2',
      },
      {
        language: 'Telugu',
        content: ' It originated from the Proto-Dravidian',
        image: 'https://www.bing.com/th?id=OIP.DK47C7FA8uVMtRE9uu-CywHaFj&w=129&h=100&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2',
      },
      {
          language: 'Malayalam',
          content: 'Spoken primarily in Kerala',
          image: 'https://www.bing.com/th?id=OIP.5k9oUmY6y3EIcTfdwRrSGQHaFb&w=134&h=100&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2',
      },
      {
        language: 'Kannada',
        content: 'Dravidian language spoken in Karnataka',
        image: 'https://th.bing.com/th/id/OIP.JHJ7rBoMO_KJdpUI9mss9QHaEL?w=307&h=180&c=7&r=0&o=5&dpr=2&pid=1.7',
      },
      {
          language: 'Punjabi',
          content: 'Indo-Aryan language spoken in South Asia',
          image: 'https://media.istockphoto.com/photos/word-punjabi-language-printed-on-paper-macro-picture-id1028343118?k=6&m=1028343118&s=170667a&w=0&h=NQIeTeSLfMCGUqjX3E2ctIgTZVk6vsFgokCsIlpKpRk=',
      },
      {
          language: 'Bengali',
          content: 'Spoken mainly in India and Bangladesh',
          image: 'https://www.bing.com/th?id=OIP.VTTIjeXKSbcpk-7uyct9jwHaEK&w=200&h=98&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2',
      }
  ];

  function removeBorders() {
    let frames = document.querySelectorAll('.frame2');
    frames.forEach(frame => {
        frame.style.borderRadius = '';
        frame.style.border = '';
        frame.style.background = '';
    });
  }

  React.useEffect(() => {
    const handleClickOutside = (event) => {
        if (!event.target.closest('.frame2')) {
            removeBorders();
        }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
        document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  return (
    <>
    <div className='Frames'>
      {data.map((item, index) => (
            <div key={index} className="frame2"  onClick={(e) => {
               //console.log(e.target.classList);
                e.stopPropagation(); // Prevent the event from bubbling up to the document
                let frame2 = e.target.closest('.frame2');
                if (frame2.querySelector('.tb1').textContent === item.language) {
                    removeBorders();
                    frame2.style.borderRadius = '0.41vw';
                    frame2.style.border = '0.20vw solid #0F2749';
                    frame2.style.background = '#EDF5FF';
                }
                if(frame2.querySelector('.tb1').textContent!==null){
                  setSelectedLanguage({'selectedLanguage':item.language});
                }
            }}>
                <div className="rect" style={{ backgroundImage: `url(${item.image})`, background: "lightgray 50% / cover no-repeat, #D9D9D9", }}>
                    <img src={item.image} alt="" className="img" />
                </div>
                <div className="tb1">{item.language}</div>
                <div className="tb2">{item.content}</div>
            </div>
      ))}
    </div>
      </>
  );
          
}

export default Frame2;

