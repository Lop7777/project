import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState, useMemo, useEffect } from "react";
import "./App.css";
import Menu from "./Page/Menu";
import Check from "./Page/Check";
import Ticket from "./Page/Ticket";
import Schedule from "./Page/Schedule";

const App = () => {
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
        }
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

  useEffect(() => {
    setTicketInfo(prevTicketInfo => ({
      ...prevTicketInfo,
      StartCity: Start,
      FinishCity: Finish,
      TicketNum: ticketCount
    }));
  }, [Start, Finish, ticketCount]);

  return (
    <BrowserRouter>
      <div className="App">

        <Routes>
          <Route path="/check" element={<Check ticketInfo={ticketInfo} />} />
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