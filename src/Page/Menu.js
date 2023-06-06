import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Link } from 'react-router-dom';

const Dictaphone = () => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    const pattern = /발권\s*확인|현장\s*발권/g;
    const match = transcript.match(pattern);

    if (match && match.some((m) => m === '발권 확인')) { /*정규표현식*/ 
      setTimeout(() => {
        window.location.href = '/check';
      }, 2000);
    } else if (match && match.some((m) => m === '현장 발권')) {
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
        <div>
          <Link to="/check" id="check-link">
            발권 확인
          </Link>
        </div>
        <div>
          <Link to="/ticketing" id="ticketing-link">
            현장 발권
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dictaphone;