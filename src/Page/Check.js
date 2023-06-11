import React, { useState } from "react";
import { Link } from "react-router-dom";

const Check = ({ TicketData }) => {
  const [ticketNumber, setTicketNumber] = useState("");
  const [validTicket, setValidTicket] = useState(false);
  const [findTicket, setFindTicket] = useState({});

  const handleSearch = () => {
    setValidTicket(false);
    if (ticketNumber === "") {
      alert("티켓 번호를 입력해주세요.");
      return;
    }
    TicketData.forEach(element => {
      if(ticketNumber === element.TicketID) {
        setValidTicket(true);
        setFindTicket(element);
        return;
      }
    });
  };

  return (
    <div>
      <div>
        <h4 style={{ textAlign: "center" }}>발권 확인</h4>
      </div>
      <input
        type="text"
        value={ticketNumber}
        onChange={(e) => setTicketNumber(e.target.value)}
      />
      <button onClick={handleSearch}>검색</button>

      {validTicket && (
        <div>
          <h2>출발지: {findTicket.StartCity.City}</h2>
          <h2>도착지: {findTicket.FinishCity.City}</h2>
          <h2>출발 시간: {findTicket.TicketTime} 시</h2>
          <h2>티켓 번호: {findTicket.TicketID}</h2>
          <h2>좌석 번호: {findTicket.SeatNum}</h2>
          <Link to="/">홈으로</Link>
        </div>
      )}

      {!validTicket && (
        <div>
          <p>{"티켓 번호를 입력하세요."}</p>
        </div>
      )}
    </div>
  );
};

export default Check;

