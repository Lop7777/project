import React from 'react';

const Schedule = (props) => {
    console.log(props.ticketInfo.StartCity.id);
    const SCID = props.ticketInfo.StartCity.id,
        SCNAME = props.ticketInfo.StartCity.City,
        FCID = props.ticketInfo.FinishCity.id,
        FCNAME = props.ticketInfo.FinishCity.City,
        TICKETNUM = props.ticketInfo.TicketNum

        
    return (
        <div>
            {SCID}
            <br/>
            {SCNAME}
            <br/>
            {FCID}
            <br/>
            {FCNAME}
            <br/>
            {TICKETNUM}
        </div>
    );
};

export default Schedule;