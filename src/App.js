import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState, useMemo, useEffect } from "react";
import "./App.css";
import Menu from "./Page/Menu";
import Check from "./Page/Check";
import Ticket from "./Page/Ticket";
import Schedule from "./Page/Schedule";
import Time from "./Page/Time";

const App = () => {
  const [cityList] = useState(
    useMemo(() => {
      return [
        {
          id: 100,
          City: "고양종합터미널",
        },
        {
          id: 200,
          City: "광명종합터미널",
        },
        {
          id: 300,
          City: "구리시외버스정류장",
        },
        {
          id: 400,
          City: "나주시외버스터미널",
        },
        {
          id: 500,
          City: "대림동산정류소",
        },
        {
          id: 600,
          City: "대림동산정류소",
        },
        {
          id: 700,
          City: "보령종합터미널",
        },
        {
          id: 800,
          City: "세종고속시외버스터미널",
        },
        {
          id: 900,
          City: "원주고속버스터미널",
        },
        {
          id: 1000,
          City: "안중버스터미널",
        },
        {
          id: 1100,
          City: "이천종합터미널",
        },
        {
          id: 1200,
          City: "인천종합터미널",
        },
        {
          id: 1300,
          City: "천안고속버스터미널",
        },
        {
          id: 1400,
          City: "평택고속버스터미널",
        },
        {
          id: 1500,
          City: "포천시외버스터미널",
        },
      ];
    }, [])
  );

  const [ticketInfo, setTicketInfo] = useState([]);


  const [Start, setStart] = useState({ id: 0, City: "선택하지 않음" });
  const [Finish, setFinish] = useState({ id: 0, City: "선택하지 않음" });
  const [ticketCount, setTicketCount] = useState(0);
  const [tDate, setTDate] = useState('0000-00-00');
  const [tTime, setTTime] = useState(0);
  const [SeatNum, setSeatNum] = useState([]);
  const [TicketData, setTicketData] = useState([]);


  useEffect(() => {
    setTicketInfo({StartCity : Start, FinishCity : Finish, TicketNum : ticketCount, TicketDate : tDate, TicketTime : tTime, SeatNum : SeatNum});
  }, [Start, Finish, ticketCount, tDate, tTime, SeatNum])

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          
          <Route
            path="/ticketing/Time"
            element={
              <Time
                ticketInfo={ticketInfo}
                TicketData={TicketData}
                setTicketData={setTicketData}
              />
            }
          />

          <Route path="/check" element={<Check TicketData={TicketData} />} />
          <Route path="/ticketing/Schedule" element={<Schedule TicketData={TicketData} ticketInfo={ticketInfo} setTTime = {setTTime} SeatNum = {SeatNum} setSeatNum = {setSeatNum}/>}/>

          <Route
            path="/ticketing"
            element={
              <Ticket
                Start={Start}
                setStart={setStart}
                Finish={Finish}
                setFinish={setFinish}
                cityList={cityList}
                ticketCount={ticketCount}
                setTicketCount={setTicketCount}
                tDate={tDate}
                setTDate={setTDate}
              />
            }
          />

          <Route path="/" element={<Menu />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;