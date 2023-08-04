import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import SpeechCtrl from "../Component/SpeechCtrl";

const Schedule = (props) => {
  const SCNAME = props.ticketInfo.StartCity.City,
    FCNAME = props.ticketInfo.FinishCity.City,
    TICKETNUM = props.ticketInfo.TicketNum;

  const [transcript, setTranscript] = useState("");
  const handleTranscriptChange = (newTranscript) => {
    setTranscript(newTranscript);
  };

  const TimeData = [];
  const tdElements = document.querySelectorAll("td");

  const $Modal = useRef();
  useEffect(() => {
    $Modal.current = document.querySelector(".modal-start-finish");
  }, []);

  useEffect(() => {
    let updatedTranscript = transcript;

    switch (transcript) {
      case "일":
        updatedTranscript = "1";
        break;
      case "이":
        updatedTranscript = "2";
        break;
      case "삼":
        updatedTranscript = "3";
        break;
      case "사":
        updatedTranscript = "4";
        break;
      case "오":
        updatedTranscript = "5";
        break;
      case "육":
        updatedTranscript = "6";
        break;
      case "칠":
        updatedTranscript = "7";
        break;
      case "팔":
        updatedTranscript = "8";
        break;
      case "구":
        updatedTranscript = "9";
        break;
      case "십":
        updatedTranscript = "10";
        break;
      case "십일":
        updatedTranscript = "11";
        break;
      default:
        break;
    }

    const scheduleIndex = parseInt(updatedTranscript);

    if (scheduleIndex >= 1 && scheduleIndex <= 12) {
      $Modal.current.style.display = "block";
      props.setTTime(scheduleIndex);
      props.setSeatNum([]);
      tdElements.forEach((element) => {
        element.style.backgroundColor = "white";
      });
    }
  }, [transcript]);

  for (let i = 9; i < 20; i++) {
    const scheduleIndex = i - 8;
    TimeData.push(
      <div
        key={i}
        id="ScheduleList"
        onClick={() => {
          $Modal.current.style.display = "block";
          props.setTTime(i);
          props.setSeatNum([]);
          tdElements.forEach((element) => {
            element.style.backgroundColor = "white";
          });
        }}
      >
        {scheduleIndex} 출발지 : {SCNAME} 도착지 : {FCNAME} <br /> 출발 시간 :{" "}
        {i}시
      </div>
    );
  }

  const renderTable = () => {
    const table = [];
    const reservation = [];

    props.TicketData.forEach((element) => {
      if (element.StartCity.id === props.ticketInfo.StartCity.id) {
        if (element.FinishCity.id === props.ticketInfo.FinishCity.id) {
          if (element.TicketTime === props.ticketInfo.TicketTime) {
            reservation.push(element.SeatNum);
          }
        }
      }
    });

    for (let i = 1; i <= 10; i++) {
      const cells = [];

      for (let j = 1; j <= 4; j++) {
        const cellValue = (i - 1) * 4 + j;
        if (reservation.includes(cellValue)) {
          cells.push(
            <td
              key={cellValue}
              style={{ backgroundColor: "red" }}
              onClick={() => alert("이미 예약되었습니다")}
            >
              {cellValue}
            </td>
          );
          continue;
        }
        cells.push(
          <td
            key={cellValue}
            onClick={(e) => {
              if (!props.SeatNum.includes(cellValue)) {
                if (props.SeatNum.length >= TICKETNUM) {
                  alert(`${TICKETNUM} 장 이상 선택할 수 없습니다`);
                  return;
                }
                props.setSeatNum((prev) => [...prev, cellValue]);
              } else {
                props.setSeatNum((prev) =>
                  prev.filter((num) => num !== cellValue)
                );
              }

              if (e.target.style.backgroundColor !== "grey") {
                e.target.style.backgroundColor = "grey";
              } else {
                e.target.style.backgroundColor = "white";
              }
            }}
          >
            {cellValue}
          </td>
        );
      }

      table.push(<tr key={i}>{cells}</tr>);
    }

    return table;
  };

  return (
    <>
      <div>
        <SpeechCtrl onTranscriptChange={handleTranscriptChange} />
        {TimeData}
      </div>

      <div className="modal modal-start-finish">
        <div className="modal_body">
          <button
            id="close"
            onClick={() => {
              $Modal.current.style.display = "none";
            }}
          >
            X
          </button>

          <div>
            <table id="SeatTable">
              <thead id="SeatElement">
                <tr>
                  <th colSpan={2}>왼쪽</th>
                  <th colSpan={2}>오른쪽</th>
                </tr>
              </thead>
              <tbody id="SeatElement">{renderTable()}</tbody>
            </table>
          </div>
          <Link to={"/ticketing/Time"}>
            <button
              onClick={(e) => {
                if (props.SeatNum.length < TICKETNUM) {
                  alert(`${TICKETNUM} 장을 선택해야 합니다.`);
                  e.preventDefault();
                }
              }}
            >
              선택 완료
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Schedule;
