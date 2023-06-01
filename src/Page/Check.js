import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Check = () => {
  const [ticketNumber, setTicketNumber] = useState('');
  const ticketInfo = useSelector((state) => state.ticket);
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = () => {
    if (ticketNumber === '') {
      alert('티켓 번호를 입력해주세요.');
      return;
    }
  
    if (ticketNumber === ticketInfo.ticketNumber) {
      setSearchResult(ticketInfo);
    } else {
      setSearchResult(null);
      alert('잘못된 티켓 번호입니다.');
    }
  };
  

  return (
    <div>
        <div>
            <h4 style={{textAlign:'center',}}>발권 확인</h4>
        </div>
      <input
        type="text"
        value={ticketNumber}
        onChange={(e) => setTicketNumber(e.target.value)}
      />
      <button onClick={handleSearch}>검색</button>

      {searchResult && (
        <div>
          <h2>출발지: {searchResult.departureCity}</h2>
          <h2>도착지: {searchResult.destinationCity}</h2>
          <h2>발권 매수: {searchResult.ticketCount}</h2>
          <Link to="/">홈으로</Link>
        </div>
      )}

      {searchResult === null && (
        <div>
          <p>티켓 번호를 입력하세요.</p>
        </div>
      )}
    </div>
  );
};

export default Check;