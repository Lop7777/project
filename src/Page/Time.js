import React, { useState } from "react";
import { Link } from "react-router-dom";

const Time = (props) => {
  const SCID = props.ticketInfo.StartCity.id,
        SCNAME = props.ticketInfo.StartCity.City,
        FCID = props.ticketInfo.FinishCity.id,
        FCNAME = props.ticketInfo.FinishCity.City,
        TICKETNUM = props.ticketInfo.TicketNum,
        TICKETDATE = props.ticketInfo.TicketDate
        
  const [ticketNumber, setTicketNumber] = useState("");
  const [showButton, setShowButton] = useState(true);
  const [ticketInfo, setTicketInfo] = useState([]);

  const generateTicketNumber = () => {
    const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
    return randomNumber.toString();
  };

  const handleSetTicketInfo = () => {
    if(!SCID || !FCID || TICKETNUM === 0 || TICKETDATE === '0000-00-00') {
      alert('error');
      return;
    }
    

    for(let i = 0; i < TICKETNUM; i++) {
      setTicketNumber(generateTicketNumber());
      setShowButton(false);
      let seat = props.ticketInfo.SeatNum[i];

      setTicketInfo( (prev) => [...prev,
        {
          TicketID : ticketNumber,
          StartCity : props.ticketInfo.StartCity,
          FinishCity : props.ticketInfo.FinishCity,
          TicketDate : props.ticketInfo.TicketDate,
          TicketTime : props.ticketInfo.TicketTime,
          SeatNum : seat
        }
      ]
      );
    }
    props.setTicketData( (prev) => [...prev, ...ticketInfo] )
  };

  return (
    <div>
      <div>출발지: {SCNAME ? SCNAME : "error"}</div>
      <div>도착지: {FCNAME ? FCNAME : "error"}</div>
      <div>발권 매수: {TICKETNUM}</div>
      
      {!showButton && (
        <div>티켓 번호: {ticketNumber}</div>
      )}
      
      {showButton && (
        <button onClick={handleSetTicketInfo}>정보가 맞다면 버튼을 눌러 티켓 번호를 확인하세요</button>
      )}

      <div>
        <Link to="/">홈으로 이동</Link>
      </div>
    </div>
  );
};

export default Time;

