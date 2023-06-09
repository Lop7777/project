import React, { useState } from "react";
import { Link } from "react-router-dom";

const Time = ({ start, finish, ticketCount = 0, onSetTicketInfo }) => {
  const [ticketNumber, setTicketNumber] = useState("");
  const [showButton, setShowButton] = useState(true);

  const generateTicketNumber = () => {
    const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
    return randomNumber.toString();
  };

  const handleSetTicketInfo = () => {
    const newTicketNumber = generateTicketNumber();
    setTicketNumber(newTicketNumber);
    setShowButton(false);

    const info = {
      departureCity: start ? start.City : "",
      destinationCity: finish ? finish.City : "",
      ticketCount: ticketCount,
      ticketNumber: newTicketNumber,
    };

    if (typeof onSetTicketInfo === "function") {
      onSetTicketInfo(info);
    }
  };

  return (
    <div>
      <div>출발지: {start ? start.City : ""}</div>
      <div>도착지: {finish ? finish.City : ""}</div>
      <div>발권 매수: {ticketCount}</div>
      
      {ticketNumber && (
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

