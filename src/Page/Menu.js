import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SpeechCtrl from '../Component/SpeechCtrl';

const Menu = () => {
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    const pattern = /발권\s*확인|현장\s*발권/g;
    const match = transcript.match(pattern);

    if (match && match.some((m) => m === '발권 확인')) {
      setTimeout(() => {
        window.location.href = '/check';
      }, 2000);
    } else if (match && match.some((m) => m === '현장 발권')) {
      setTimeout(() => {
        window.location.href = '/ticketing';
      }, 2000);
    }
  }, [transcript]);

  const handleTranscriptChange = (newTranscript) => {
    setTranscript(newTranscript);
  };

  return (
    <div>
      <SpeechCtrl onTranscriptChange={handleTranscriptChange} />

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

export default Menu;