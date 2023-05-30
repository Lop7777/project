import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import City from '../Component/City';

const Ticket = (props) => {
    
    const [pN, setpN] = useState(true);

    const $modal = useRef();

    useEffect(() => {
        $modal.current = document.querySelector('.modal');
    }, [])

    return (

        <div>
            <Link to="/">홈버튼</Link>



            <div>
                출발 일자 및 도착지 선택
            </div>

            


            <div onClick={() => {$modal.current.style.display = 'block'; setpN(true)}} id= 'StartPointButton'>
                <div>출발지 선택</div>

                <div style={{textAlign:'right'}}>{props.Start.City}</div>
            </div>




            <div onClick={() => {$modal.current.style.display = 'block'; setpN(false)}} id= 'StartPointButton'>
                <div>도착지 선택</div>

                <div style={{textAlign:'right'}}>{props.Finish.City}</div>
            </div>




            <Link to={'/ticketing/Time'} >다음</Link>






            {/*모달 창*/}
            <div className="modal">
                <div className="modal_body">
                    <button id='close' onClick={() => {$modal.current.style.display = 'none';}}>X</button>
                    원하는 {pN ? '출발' : '도착'}지 선택

                    <div>{pN ? props.Start.City : props.Finish.City}</div>
                    <City cityList = {props.cityList} setStart = {props.setStart} setFinish = {props.setFinish} pN = {pN}/>
                </div>
            </div>


        </div>
    );

};

export default Ticket;







    // const [StName, setStName] = useState('선택하지 않음');
    // const [FnName, setFnName] = useState('선택하지 않음');
    
    // 이분 탐색 알고리즘
    // 현재 폐기
    // const showCity = useCallback((findnum) => {

    //     //테스트용
    //     console.log(findnum);

    //     let left = 0;
    //     let right = cityList.length - 1;
    //     let now = Math.floor((cityList.length - 1) / 2);
    //     if(findnum === 0) {
    //         return '선택하지 않음';
    //     }
    //     while(true) {
    //         if(cityList[now].id === findnum) {
    //             return cityList[now].City;
    //         }
    //         else if(cityList[now].id < findnum) {
    //             left = now;  
    //         }
    //         else {
    //             right = now;
    //         }

    //         now = Math.floor((left + right) / 2);
            
            

    //         if(cityList[now].id >= findnum && cityList[cityList.length-1].id <= findnum) { // 어떤 것도 없을 시 에러 반환
    //             return 'error';
    //         }

    //         if(left === cityList.length -2 && right === cityList.length - 1) { // 제일 마지막 요소 선택 시 무한 루프 방지
    //             now = right;
    //         }

    //         //테스트
    //         console.log('left : ' + left + ' right : ' + right + ' now : ' + (now + 1));
    //     }
    // }, [cityList])

    // useEffect(() => {
    //     setStName(showCity(Start));
    // }, [Start, showCity])

    // useEffect(() => {
    //     setFnName(showCity(Finish));
    // }, [Finish, showCity])