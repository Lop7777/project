import React, { useState } from 'react';
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

    const selectedCity = props.cityList.find((city) =>
      city.City === newTranscript.replace(/\s/g, '') ||
      city.City === newTranscript.replace(/\s/g, '') + '종합터미널' ||
      city.City === newTranscript.replace(/\s/g, '') + '시외버스터미널' ||
      city.City === newTranscript.replace(/\s/g, '') + '버스터미널' ||
      city.City === newTranscript.replace(/\s/g, '') + '고속버스터미널' ||
      city.City === newTranscript.replace(/\s/g, '') + '동산정류소' ||
      city.City === newTranscript.replace(/\s/g, '') + '복합터미널'
    );

    if (selectedCity) {
      handleCitySelection(selectedCity);
    }
  };

  const [cityList] = useState(props.cityList);

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
              props.pN ? props.setStart(cities[cityIndex]) : props.setFinish(cities[cityIndex]);
            }}>
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
    <>
      <SpeechCtrl onTranscriptChange={handleTranscriptChange} />

      <div className='CityTable'>{tables}</div>
    </>
  );
};

export default City;