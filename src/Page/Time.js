import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setTicketInfo } from '../ticketActions';

const Time = (props) => {
  const dispatch = useDispatch();

  const generateTicketNumber = () => {
    const ticketNumber = Math.floor(Math.random() * 100000000);
    return ticketNumber.toString().padStart(8, '0');
  };

  const ticketInfo = {
    departureCity: props.start.City,
    destinationCity: props.finish.City,
    ticketCount: props.ticketCount,
    ticketNumber: generateTicketNumber(),
  };

  dispatch(setTicketInfo(ticketInfo));

  return (
    <div>
      <h2>출발지: {props.start.City}</h2>
      <h2>도착지: {props.finish.City}</h2>
      <h2>발권 매수: {props.ticketCount}</h2>
      <h2>티켓 번호: {ticketInfo.ticketNumber}</h2>
      <Link to="/">홈으로</Link>
    </div>
  );
};

export default Time;
