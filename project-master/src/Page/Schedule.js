import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Schedule = (props) => { // 좌석
  const totalSeats = 10; 
  const seatsPerRow = 2;
  const totalRows = Math.ceil(totalSeats / seatsPerRow);

  const [seats, setSeats] = useState(Array(totalSeats).fill(null));
  const [disableSeats, setDisableSeats] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0); // 선택한 좌석 개수
  
  useEffect(() => {
    axios
      .get('http://localhost:4000/bus') // 백단 sql 버스 데이터
      
      .then((response) => {
        const busData = response.data;
        const { StartCity, FinishCity } = props.ticketInfo;

        const bus = busData.find((bus) => bus.start === StartCity.City && bus.end === FinishCity.City);
        //출발 도착 일치 버스 매칭
        if (bus) {
          setDisableSeats(bus.seat); //!비활성 좌석
        }
      })
      .catch((error) => console.error('Error:', error));
  }, [props.ticketInfo]);

  const toggleSeat = (index) => {
    if (disableSeats.includes(index + 1)) {
      return;
    }

    setSeats((prevSeats) => {
      const updatedSeats = [...prevSeats];
      updatedSeats[index] = updatedSeats[index] === null ? index + 1 : null; // 좌석 선택 or 해제
      return updatedSeats;
    });

    setSelectedCount((prevCount) => {
      const newCount = prevCount + (seats[index] === null ? 1 : -1); // 좌석 선택 또는 선택 해제에 따라 개수 변경
      return newCount;
    });
  };

    const handleReservation = async () => {
    const selectedSeats = seats.filter((seat) => seat !== null); // 선택 좌석 가져옴
    const combinedSeats = [...disableSeats, ...selectedSeats]; // 기존 seat 배열과 새로운 seats 배열을 합침

    axios // 서버4000으로 염
        .post('http://localhost:4000/reservation', {
        seats: combinedSeats, // 선택 좌석 서버 전송
        start: props.ticketInfo.StartCity.City, // 출발 도시 정보
        end: props.ticketInfo.FinishCity.City, // 도착 도시 정보
        })
        .then((response) => {
        console.log('Reservation successful:', response.data);
        
        // 예약 성공 시 필요한 처리를 추가
        })
        .catch((error) => {
        console.error('Error:', error);
        // 예약 실패 시 필요한 처리를 추가
        });
    };

  const renderSeats = () => {
    const seatRows = [];
    for (let row = 0; row < totalRows; row++) {
      const rowSeats = seats.slice(row * seatsPerRow, (row + 1) * seatsPerRow); // 행별로 좌석 배열
      const seatElements = rowSeats.map((seat, index) => (
        <button
          key={row * seatsPerRow + index}
          onClick={() => toggleSeat(row * seatsPerRow + index)}
          style={{ // 버스 디자인
            backgroundColor: seat === null ? (disableSeats.includes(row * seatsPerRow + index + 1) ? 'red' : 'green') : 'gray',
          }}
          // 좌석 번호 또는 선택 좌석 표시
        >
          {seat === null ? row * seatsPerRow + index + 1 : seat} 
        </button>
      ));
      seatRows.push(<div key={row}>{seatElements}</div>); //행을 나타내는 div요소 추가
    }
    return seatRows;
  };

  return (
    <>
      <div>{renderSeats()}</div> {/* 좌석 표시 */}
      <Link to="/">
         <button onClick={handleReservation} disabled={selectedCount !== props.ticketInfo.TicketNum}>
            선택 완료
        </button>
        </Link>
      <Link to="/">돌아가기</Link>
    </>
  );
};

export default Schedule;
