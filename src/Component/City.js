import React, { useState, useEffect } from 'react';
import SpeechCtrl from '../Component/SpeechCtrl';

const City = (props) => {
  const [transcript, setTranscript] = useState('');

  const handleCitySelection = (city) => {
    if (props.pN) {
      props.setStart(city);
    } else {
      props.setFinish(city);
    }
  };

  const handleTranscriptChange = (newTranscript) => {
    setTranscript(newTranscript);

    // 선택된 도시 정보 처리
    const selectedCity = props.cityList.find((city) =>
      newTranscript.includes(city.City)
    );
    if (selectedCity) {
      handleCitySelection(selectedCity);
    }
  };


  const { cityList } = props;
  const tables = [];
  const tableCount = Math.ceil(cityList.length / 16);

  for (let tableIndex = 0; tableIndex < tableCount; tableIndex++) {
    const startIndex = tableIndex * 16;
    const cities = cityList.slice(startIndex, startIndex + 16);
    const tableRows = [];

    for (let i = 0; i < 4; i++) {
      const tableCells = [];

      for (let j = 0; j < 4; j++) {
        const cityIndex = i * 4 + j;
        if (cities[cityIndex] === undefined) {
          break;
        }
        tableCells.push(
          <td
            key={j}
            id='CityTd'
            onClick={() => {
              handleCitySelection(cities[cityIndex]);
            }}
          >
            {cities[cityIndex].City}
          </td>
        );
      }

      tableRows.push(<tr key={i}>{tableCells}</tr>);
    }

    tables.push(
      <table key={tableIndex}>
        <tbody>{tableRows}</tbody>
      </table>
    );
  }

  return (
    <div>
      <SpeechCtrl onTranscriptChange={handleTranscriptChange} />

      <div className='CityTable'>{tables}</div>
    </div>
  );
};

export default City;
