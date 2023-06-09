import React, { useState,useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import City from "../Component/City";


const Ticket = (props) => {
  const [pN, setPN] = useState(true);


  const $modalStartFinish = useRef();
  const $modalTicketCount = useRef();
  useEffect(() => {
    $modalStartFinish.current = document.querySelector(".modal-start-finish");
    $modalTicketCount.current = document.querySelector(".modal-ticket-count");
  }, []);



  const handleNext = (event) => {
    if (!props.Start.id || !props.Finish.id || props.ticketCount === 0) {
      alert("출발지, 도착지, 발권 매수를 선택해주세요.");
      event.preventDefault();
    }
  };

  // const [ticketCount, setTicketCount] = useState(0);

  const handleTicketCountChange = (e) => {
    const value = parseInt(e.target.value, 10); // 입력된 값을 정수로 변환

    if (value > 10) {
      // 최대 값인 10를 초과하는 경우 처리
      props.setTicketCount(10); // 값을 최대 값인 10로 설정
    } else {
      props.setTicketCount(value); // 값 설정
    }
  };

 
  return (
    <div>
      <Link to="/">홈버튼</Link>

      <div>출발 일자 및 도착지 선택</div>
      
        <div id="TicketButton" onClick={() => {$modalStartFinish.current.style.display = "block"; setPN(true);}}>
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

      <div  id="TicketButton" onClick={() => { $modalTicketCount.current.style.display = "block"; }}>
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
           
            <input
              type="number"
              min={0}
              max={10}
              // value={ticketCount}
              onChange={handleTicketCountChange}
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



