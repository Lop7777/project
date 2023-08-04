import React, { useState } from "react";
import { Link } from "react-router-dom";

const Check = ({ ticketInfo }) => {
  const [ticketNumber, setTicketNumber] = useState("");
  const [validTicket, setValidTicket] = useState(false);

  const handleSearch = () => {
    if (ticketNumber === "") {
      alert("티켓 번호를 입력해주세요.");
      return;
    }

    if (ticketInfo && ticketNumber === ticketInfo.ticketNumber) {
      setValidTicket(true);
    } else {
      setValidTicket(false);
      alert("잘못된 티켓 번호입니다.");
    }
  };

  return (
    <div>
      <div>
        <h1 style={{ textAlign: "center" }}>발 권 확 인</h1>
      </div>
      <input
        type="text"
        value={ticketNumber}
        onChange={(e) => setTicketNumber(e.target.value)}
      />
      <button onClick={handleSearch}>검색</button>

      {validTicket && (
        <div>
          <h2>출발지: {ticketInfo.departureCity}</h2>
          <h2>도착지: {ticketInfo.destinationCity}</h2>
          <h2>발권 매수: {ticketInfo.ticketCount}</h2>
          <h2>티켓 번호: {ticketInfo.ticketNumber}</h2>
          <Link to="/">홈으로</Link>
        </div>
      )}

      {!validTicket && (
        <div>
          <p>{ticketNumber === "" ? "티켓 번호를 입력하세요." : "잘못된 티켓 번호입니다."}</p>
        </div>
      )}
    </div>
  );
};

export default Check;

