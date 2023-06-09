import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState, useMemo, useEffect } from "react";
import "./App.css";
import Menu from "./Page/Menu";
import Check from "./Page/Check";
import Ticket from "./Page/Ticket";
import Schedule from "./Page/Schedule";

// import Time from "./Page/Time";

const App = () => {
  //데이터베이스로 묶을 예정
  //중복 호출 방지를 위해 메모이징으로 최적화
  const [cityList] = useState(
    useMemo(() => {
      return [
        {
          id: 100,
          City: "A시",
        },
        {
          id: 200,
          City: "B시",
        },
        {
          id: 300,
          City: "C시",
        },
        {
          id: 400,
          City: "D시",
        },
        {
          id: 500,
          City: "E시",
        },
        {
          id: 600,
          City: "F시",
        },
        {
          id: 700,
          City: "G시",
        },
        {
          id: 800,
          City: "H시",
        },
        {
          id: 900,
          City: "I시",
        },
        {
          id: 1000,
          City: "J시",
        },
        {
          id: 1100,
          City: "K시",
        },
        {
          id: 1200,
          City: "L시",
        },
        {
          id: 1300,
          City: "M시",
        },
        {
          id: 1400,
          City: "N시",
        },
        {
          id: 1500,
          City: "O시",
        },
        {
          id: 1600,
          City: "P시",
        },
        {
          id: 1700,
          City: "Q시",
        },
        {
          id: 1800,
          City: "R시",
        },
      ];
    }, [])
  );

  const [ticketInfo, setTicketInfo] = useState([]);
  const [Start, setStart] = useState({ id: 0, City: "선택하지 않음" });
  const [Finish, setFinish] = useState({ id: 0, City: "선택하지 않음" });
  const [ticketCount, setTicketCount] = useState(0);


  useEffect(() => {
    setTicketInfo({StartCity : Start, FinishCity : Finish, TicketNum : ticketCount});
  }, [Start, Finish, ticketCount])


  // const handleSetTicketInfo = (info) => {
  //   setTicketInfo(info);
  //   console.log("setTicketInfo(App) 호출됨:", info);
  // };

  return (
    <BrowserRouter>
      <div className="App">

        <Routes>
          <Route path="/check" element={<Check ticketInfo={ticketInfo} />} />

          {/* <Route
            path="/ticketing/Time"
            element={
              <Time
                start={Start}
                finish={Finish}
                ticketCount={ticketInfo? ticketInfo.ticketCount : 0}
                setTicketInfo={handleSetTicketInfo} // Info 값을 setTicketInfo로 전달합니다.
              />
            }
          /> */}

          <Route path="/ticketing/Schedule" element={<Schedule ticketInfo={ticketInfo}/>}/>

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