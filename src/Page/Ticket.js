import React, { useState,useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import City from "../Component/City";
import Time from "./Time";

const Ticket = (props) => {
  const [pN, setPN] = useState(true);
  const [ticketCount, setTicketCount] = useState(0);
  const $modalStartFinish = useRef();
  const $modalTicketCount = useRef();
  useEffect(() => {
    $modalStartFinish.current = document.querySelector(".modal-start-finish");
    $modalTicketCount.current = document.querySelector(".modal-ticket-count");
  }, []);

  const handleTicketCount = (value) => {
    if (value < 0) {
      value = 0;
    }
    setTicketCount(value);
  };

  const [showTime, setShowTime] = useState(false);

  const handleNext = () => {
    if (!props.Start || !props.Finish || ticketCount === 0) {
      alert("출발지, 도착지, 발권 매수를 선택해주세요.");
      return;
    }

    setShowTime(true);
  };

  if (showTime) {
    return (
      <Time
        start={props.Start}
        finish={props.Finish}
        ticketCount={ticketCount}
        onSetTicketInfo={props.onSetTicketInfo}
      />
    );
  }

  return (
    <div>
      <Link to="/">홈버튼</Link>

      <div>출발 일자 및 도착지 선택</div>

      <div
        onClick={() => {
          $modalStartFinish.current.style.display = "block";
          setPN(true);
        }}
        id="StartPointButton"
      >
        <div>출발지 선택</div>
        <div style={{ textAlign: "right" }}>
          {props.Start ? props.Start.City : ""}
        </div>
      </div>

      <div
        onClick={() => {
          $modalStartFinish.current.style.display = "block";
          setPN(false);
        }}
        id="StartPointButton"
      >
        <div>도착지 선택</div>
        <div style={{ textAlign: "right" }}>
          {props.Finish ? props.Finish.City : ""}
        </div>
      </div>

      <div
        onClick={() => {
          $modalTicketCount.current.style.display = "block";
        }}
        id="StartPointButton"
      >
        <div>발권 매수 선택</div>
        <div style={{ textAlign: "right" }}>{ticketCount}</div>
      </div>

      <button onClick={handleNext}>다음</button>


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
            {pN
              ? props.Start
                ? props.Start.City
                : ""
              : props.Finish
              ? props.Finish.City
              : ""}
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
              max={5}
              value={ticketCount}
              onChange={(e) => handleTicketCount(e.target.value)}
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



