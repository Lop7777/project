import React from 'react';
import { Link } from "react-router-dom";

const Menu = () => {

    return (
        <div id = 'menu'>
            <div>
                <Link to="/check">발권 확인</Link>
            </div>
            <div>
                <Link to="/ticketing">현장 발권</Link>
            </div>
        </div>
    );

};

export default Menu;