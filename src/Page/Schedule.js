import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Schedule = (props) => {
    
    const SCID = props.ticketInfo.StartCity.id,
        SCNAME = props.ticketInfo.StartCity.City,
        FCID = props.ticketInfo.FinishCity.id,
        FCNAME = props.ticketInfo.FinishCity.City,
        TICKETNUM = props.ticketInfo.TicketNum,
        TICKETDATE = props.ticketInfo.TicketDate

    const TimeData = [];
    const tdElements = document.querySelectorAll('td');

    const $Modal = useRef();
    useEffect(() => {
        $Modal.current = document.querySelector(".modal-start-finish");
    }, []);

    for(let i = 9; i < 20; i++) {
        TimeData.push(
            <div key={i} id='ScheduleList' onClick={() => {
                $Modal.current.style.display = "block"; 
                props.setTTime(i); 
                props.setSeatNum([]); 
                tdElements.forEach((element) => {
                    element.style.backgroundColor = 'white';
                })
            }}>
                출발지 : {SCNAME} 도착지 : {FCNAME} <br/> 출발 시간 : {i}시 
            </div>
        )
    }


    const renderTable = () => {
        const table = [];

        for (let i = 1; i <= 10; i++) {
            const cells = [];

            for (let j = 1; j <= 4; j++) {
                const cellValue = (i - 1) * 4 + j;
                cells.push(<td key={cellValue} onClick={
                    (e) => {
                        if(!props.SeatNum.includes(cellValue)) {
                            if(props.SeatNum.length >= TICKETNUM) {
                                alert(`${TICKETNUM} 장 이상 선택할 수 없습니다`)
                                return;
                            }
                            props.setSeatNum(prev => [...prev, cellValue]);
                        } else {
                            props.setSeatNum(prev => prev.filter(num => num !== cellValue));
                        }

                        if(e.target.style.backgroundColor !== 'grey') {
                            e.target.style.backgroundColor = 'grey';
                        } else {
                            e.target.style.backgroundColor = 'white';
                        }

                        console.log(props.ticketInfo);
                    }}
                >{cellValue}</td>);
            }

            table.push(<tr key={i}>{cells}</tr>);
        }

        return table;
    };

    return (
        <>
            <div>
             {TimeData}
            </div>

            {/* 좌석 선택 모달 */}
            <div className="modal modal-start-finish">
                <div className="modal_body">
                    <button
                    id="close"
                    onClick={() => {
                        $Modal.current.style.display = "none";
                    }} >
                    X
                    </button>

                    <div>
                        <table id='SeatTable'>
                            <thead id='SeatElement'>
                                <tr>
                                    <th colSpan={2}>왼쪽</th><th colSpan={2}>오른쪽</th>
                                </tr>
                            </thead>
                            <tbody id='SeatElement'>{renderTable()}</tbody>
                        </table>
                    </div>
                    <Link to={'/ticketing/Time'}><button>선택 완료</button></Link>
                </div>
            </div>
        </>
        
    );
};

export default Schedule;