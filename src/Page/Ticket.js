import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import City from "../Component/City";
import SpeechCtrl from '../Component/SpeechCtrl';
import { useSpeechRecognition } from 'react-speech-recognition';

const Ticket = (props) => {
  const [pN, setPN] = useState(true);
  const [transcript, setTranscript] = useState('');
  const [spokenNumber, setSpokenNumber] = useState('');

  const $modalStartFinish = useRef();
  const $modalTicketCount = useRef();

  useEffect(() => {
    $modalStartFinish.current = document.querySelector(".modal-start-finish");
    $modalTicketCount.current = document.querySelector(".modal-ticket-count");
  }, []);

  const commands = [
    {
      command: ['출발지 선택'],
      callback: () => {
        setTimeout(() => {
          $modalStartFinish.current.style.display = "block";
          setPN(true);
        }, 2000);
      },
      matchInterim: true,
    },
    {
      command: ['도착지 선택'],
      callback: () => {
        setTimeout(() => {
          $modalStartFinish.current.style.display = "block";
          setPN(false);
        }, 2000);
      },
      matchInterim: true,
    },
    {
      command: ['발권 매수 선택'],
      callback: () => {
        setTimeout(() => {
          $modalTicketCount.current.style.display = "block";
        }, 2000);
      },
      matchInterim: true,
    },
    {
      command: ['일', '하나', '한개'],
      callback: () => {
        setSpokenNumber('1');
        props.setTicketCount(1);
      },
      matchInterim: true,
    },
    {
      command: ['이', '둘', '두개'],
      callback: () => {
        setSpokenNumber('2');
        props.setTicketCount(2);
      },
      matchInterim: true,
    },
    {
      command: ['삼', '세개'],
      callback: () => {
        setSpokenNumber('3');
        props.setTicketCount(3);
      },
      matchInterim: true,
    },
    {
      command: ['사', '네개'],
      callback: () => {
        setSpokenNumber('4');
        props.setTicketCount(4);
      },
      matchInterim: true,
    },
    {
      command: ['오', '다섯개'],
      callback: () => {
        setSpokenNumber('5');
        props.setTicketCount(5);
      },
      matchInterim: true,
    },
  ];

  const { transcript: spokenTranscript } = useSpeechRecognition({ commands });

  useEffect(() => {
    setTranscript(spokenTranscript);

    if (spokenTranscript.includes('일') || spokenTranscript.includes('하나') || spokenTranscript.includes('한개')) {
      setSpokenNumber('1');
      props.setTicketCount(1);
    } else if (spokenTranscript.includes('이') || spokenTranscript.includes('둘') || spokenTranscript.includes('두개')) {
      setSpokenNumber('2');
      props.setTicketCount(2);
    } else if (spokenTranscript.includes('삼') || spokenTranscript.includes('셋') || spokenTranscript.includes('세개')) {
      setSpokenNumber('3');
      props.setTicketCount(3);
    } else if (spokenTranscript.includes('사') || spokenTranscript.includes('넷') || spokenTranscript.includes('네개')) {
      setSpokenNumber('4');
      props.setTicketCount(4);
    } else if (spokenTranscript.includes('오') || spokenTranscript.includes('다섯') || spokenTranscript.includes('다섯개')) {
      setSpokenNumber('5');
      props.setTicketCount(5);
    }
  }, [spokenTranscript]);

  const handleTranscriptChange = (newTranscript) => {
    setTranscript(newTranscript);
  };

  const handleSpokenNumberChange = (event) => {
    const spokenValue = event.target.value;
    const parsedValue = parseInt(spokenValue);

    if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 5) {
      setSpokenNumber(spokenValue);
      props.setTicketCount(parsedValue);
    }
  };

  const handleNext = (event) => {
    if (!props.Start.id || !props.Finish.id || props.ticketCount === 0) {
      alert("출발지, 도착지, 발권 매수를 선택해주세요.");
      event.preventDefault();
    }
  };

  return (
    <div>
      <SpeechCtrl onTranscriptChange={handleTranscriptChange} />
      <Link to="/">홈버튼</Link>

      <div>출발 일자 및 도착지 선택</div>

      <div id="TicketButton" onClick={() => { $modalStartFinish.current.style.display = "block"; setPN(true); }}>
        <div>출발지 선택</div>
        <div style={{ textAlign: "right" }}>
          {props.Start.City}
        </div>
      </div>

      <div id="TicketButton" onClick={() => { $modalStartFinish.current.style.display = "block"; setPN(false); }}>
        <div>도착지 선택</div>
        <div style={{ textAlign: "right" }}>
          {props.Finish.City}
        </div>
      </div>

      <div id="TicketButton" onClick={() => { $modalTicketCount.current.style.display = "block"; }}>
        <div>발권 매수 선택</div>
        <div style={{ textAlign: "right" }}>{props.ticketCount}</div>
      </div>

      <Link to="/ticketing/Schedule" onClick={handleNext}>다음</Link>

      {/* 출발지/도착지 선택 모달 */}
      <div className="modal modal-start-finish">
        <div className="modal_body">
          <button
            id="close"
            onClick={() => {
              $modalStartFinish.current.style.display = "none";
            }}
          >
            X
          </button>

          원하는 {pN ? "출발" : "도착"}지 선택
          <div>
            {pN ? props.Start.City : props.Finish.City}
          </div>
          <City
            cityList={props.cityList}
            setStart={props.setStart}
            setFinish={props.setFinish}
            pN={pN}
          />
        </div>
      </div>

      {/* 발권 매수 선택 모달 */}
      <div className="modal modal-ticket-count">
        <div className="modal_body">
          <button
            id="close"
            onClick={() => {
              $modalTicketCount.current.style.display = "none";
            }}
          >
            X
          </button>

          <div>
            <p>발권 매수 선택</p>
            <SpeechCtrl onTranscriptChange={handleTranscriptChange} />
            <input
              type="number"
              min={0}
              max={5}
              value={spokenNumber}
              onChange={handleSpokenNumberChange}
            />
          </div>
          <button
            onClick={() => {
              $modalTicketCount.current.style.display = "none";
            }}
          >
            선택
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ticket;