import React, { useState } from 'react';

const City = (props) => {
    
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
                <td key={j}
                id='CityTd'
                onClick={() => {props.pN ? props.setStart( current => current = cities[cityIndex] ) : props.setFinish( current => current = cities[cityIndex]); console.log(cities[cityIndex])}}>{cities[cityIndex].City}</td>);
            }

        tableRows.push(<tr key={i}>{tableCells}</tr>);
    }


    tables.push(
        <table key={tableIndex}>
            <tbody>{tableRows}</tbody>
        </table>
    );
  }

  return <div className='CityTable'>{tables}</div>;
};

export default City;