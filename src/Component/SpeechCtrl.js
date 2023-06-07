import React, { useEffect } from 'react';
import  SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechCtrl = ({ onTranscriptChange }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const handleStartListening = () => {
    SpeechRecognition.stopListening();
    SpeechRecognition.startListening({ language: 'ko-KR' });
  };

  useEffect(() => {
    onTranscriptChange(transcript);
  }, [transcript, onTranscriptChange]);

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
    </div>
  );
};

export default SpeechCtrl;