import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Time = (props) => {
  const SCID = props.ticketInfo.StartCity.id,
        SCNAME = props.ticketInfo.StartCity.City,
        FCID = props.ticketInfo.FinishCity.id,
        FCNAME = props.ticketInfo.FinishCity.City,
        TICKETNUM = props.ticketInfo.TicketNum
        
  const [showButton, setShowButton] = useState(true);
  const [ticketInfo, setTicketInfo] = useState([]);
  const [TicketList, setTicketList] = useState([]);
  const [table, setTable] = useState([]);
  let keyNum = 0;  

  const generateTicketNumber = () => {
    const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
    return randomNumber.toString();
  };

  const handleSetTicketInfo = () => {
    if(!SCID || !FCID || TICKETNUM === 0) {
      alert('error');
      return;
    }
    setTicketInfo([]);
    for(let i = 0; i < TICKETNUM; i++) {
      let TicketNum = generateTicketNumber();
      let seat = props.ticketInfo.SeatNum[i];

      setTicketInfo( prev => [
        ...prev,
        {
          TicketID : TicketNum,
          StartCity : props.ticketInfo.StartCity,
          FinishCity : props.ticketInfo.FinishCity,
          TicketDate : props.ticketInfo.TicketDate,
          TicketTime : props.ticketInfo.TicketTime,
          SeatNum : seat
        }
      ]
      );
    }
    setShowButton(false);
  };

  const handleButtonClick = (info) => {
    props.setTicketData( prev => [...prev, ...info] );
  }

  useEffect( () => {
    setTable([]);
    table.push(
      <div key={keyNum}>
        {ticketInfo.map((element, index) =>
          <div key={index}> 티켓 번호 : {element.TicketID} 출발지 : {element.StartCity.City} 도착지 : {element.FinishCity.City} 시간 : {element.TicketTime} 좌석 번호 : {element.SeatNum}</div>
        )}
      </div>
    )
    setTicketList(table);
    handleButtonClick(ticketInfo);
    keyNum ++;
  }, [ticketInfo] )

  return (
    <div>
      <div>출발지: {SCNAME ? SCNAME : "error"}</div>
      <div>도착지: {FCNAME ? FCNAME : "error"}</div>
      <div>발권 매수: {TICKETNUM}</div>
      
      {TicketList}
      
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
