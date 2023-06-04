import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Link } from 'react-router-dom';

/*수정할 부분
 발권 확인. && 현장 구매. 일 때만 페이지 넘어가짐
 발권 확인이나 현장구매라고 말했을 때 글씨 event
*/ 

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [checkClicked, setCheckClicked] = useState(false);
  const [ticketingClicked, setTicketingClicked] = useState(false);

  useEffect(() => {
    if (transcript.includes('발권 확인')) {
      setTimeout(() => {
        window.location.href = '/check';
      }, 2000);
    } else if (transcript.includes('현장 발권')) {
      setTicketingClicked(true);
      setCheckClicked(false);
      setTimeout(() => {
        window.location.href = '/ticketing';
      }, 2000);
    }
  }, [transcript]);

  const handleStartListening = () => {
    SpeechRecognition.stopListening();
    SpeechRecognition.startListening({ language: 'ko-KR' });
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>브라우저가 음성인식을 지원하지 않습니다</span>;
  }

  return (
    <div>
      <div>
        <p id='text'>마이크: {listening ? '마이크 켜짐' : '마이크 꺼짐'}</p>
        <button onClick={handleStartListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p id='ipText'>{transcript}</p>
      </div>

      <div id="menu">
        <div style={{ color: checkClicked ? 'red' : 'black' }} 
            onClick={() => {
            setCheckClicked(true);
            setTicketingClicked(false);}}
        >
          <Link to="/check" id="check-link">
            발권 확인
          </Link>
        </div>
        <div style={{ color: ticketingClicked ? 'red' : 'black' }}>
          <Link to="/ticketing" id="ticketing-link">
            현장 발권
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dictaphone;
