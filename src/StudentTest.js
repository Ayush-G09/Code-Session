import React, {useEffect, useState} from 'react'
import './StudentTest.css';
import { faCirclePlay, faFaceMehBlank, faCircleCheck, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentTest() {

    let nav = useNavigate();

    var testids = [];
    var testDetails = [];
    var teststatus = [];
    const [details, setDetail] = useState([]);
    const [status, setStatus] = useState([]);

    if(sessionStorage.getItem('jwt') === null)
    {
        sessionStorage.setItem('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxhdGlrYXBhaTE5QHN2dnYuZWR1LmluIiwicm9sZSI6InN0dWRlbnQiLCJpZCI6Ind4YUoxV1NBYVQwdXFGUE9TN2pfaCIsImlhdCI6MTY2ODM3MjA4NywiZXhwIjoxNjY4Mzg0Njg3fQ.OGeAMNobR6m_ISeaHcc6Prq9LF6vaBtudqsSk81jxdg')
    }

    var headers = {
        'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`
    }

        async function fetchTestId() {
            const request = await axios.get('https://code-sessions-backend.onrender.com/fetchTestIds', {headers: headers});
            testids = request.data.testDetails;
            testDetails = [];
            for(var i = 0; i < testids.length; i++)
            {
                const req = await axios.post('https://code-sessions-backend.onrender.com/displayTestDetails', testids[i], {headers: headers})
                .catch((er) => {
                    if(er.response.status === 401)
                    {
                        nav('/');
                    }
                })
                testDetails.push(req.data.testDetails);
            }
            teststatus = [];
            for(var z = 0; z < testids.length; z++)
            {
                var data = {testId : testids[z].testId, studentId : sessionStorage.getItem('stuid')};
                const r = await axios.post('https://code-sessions-backend.onrender.com/testAttemptedStatus', data, {headers: headers});
                teststatus.push(r.data.isAttempted);
            }
            setDetail(testDetails);
            setStatus(teststatus);
        }

    function SliceDate(D) {
        var year = D.slice(0, 4);
        var month = D.slice(5, 7);
        var day = D.slice(8, 10);
        var Date = day.concat("-", month, "-", year);
        return Date;
    }

    function SliceD(D) {
        var year = D.slice(0, 4);
        var month = D.slice(5, 7);
        var day = D.slice(8, 10);
        var Date = month.concat("-", day, "-", year);
        return Date;
    }

    function SliceTime(T) {
        var Time = T.slice(11, 16);
        return Time;
    }

    function SliceT(T) {
        var h = T.slice(11, 13);
        return h;
    }

    function RDate() {
        var td = new Date();
        var day  = td.getDate();
        var month = td.getMonth();
        var year = td.getFullYear();
        var date =  day+month+year;
        return date;
    }

    function CheckDate(td, st, teststarthr, duration) {
        let current = new Date();
        let date = new Date(td);
        var z = RDate();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var x = d+m+y;
        var ch = current.getHours();
        let m1 = current.getTime();
        let m2 = date.getTime();
        var endtime = teststarthr + duration;
        if(m1 > m2){
            if(st)
            {
                return 2;
            }
            else
            {
                if(z === x)
                {
                    if(ch > teststarthr)
                    {
                        if(ch < endtime)
                        {
                            return 0;
                        }
                        else
                        {
                            return 3;
                        }
                    }
                    else
                    {
                        return 1;
                    }
                }
                else
                {
                    return 3;
                }
            }
        }
        else
        {
            return 1;
        }
    }

    fetchTestId()

  return (
    <div className='St-con'>
        <div className="table-heading">
            <div className="head1"><h1>Start Date & Time</h1></div>
            <div className="head2"><h1>Aptitude Questions</h1></div>
            <div className="head3"><h1>Coding Questions</h1></div>
            <div className="head4"><h1>Test Duration</h1></div>
            <div className="head5"><h1>Status</h1></div>
        </div>
        <div className='table-data'>
            {details.map((item, index) => {
                return(
                    <div className='st-data' key={index}>
                        <div className="data1">
                            <h1>{SliceDate(item.testDate)}</h1>
                            <h1 className="space">&</h1>
                            <h1>{SliceTime(item.testDate)}</h1>
                        </div>
                        <div className="data2"><h1>{item.aptitude}</h1></div>
                        <div className="data3"><h1>{item.coding}</h1></div>
                        <div className="data4">
                            <h1>{item.testDuration} Hours</h1>
                        </div>
                        <div className="data5">
                            {CheckDate(SliceD(item.testDate), status[index], SliceT(item.testDate), item.testDuration) === 3 ?
                            <div className='st-missedbt'>
                                <div><FontAwesomeIcon icon={faFaceMehBlank}/></div>
                                <span>Missed</span>
                            </div>
                            : null}
                            {CheckDate(SliceD(item.testDate), status[index], SliceT(item.testDate), item.testDuration) === 2 ?
                            <div className='st-attemptedbt'>
                                <div><FontAwesomeIcon icon={faCircleCheck}/></div>
                                <span>Attempted</span>
                            </div>
                            : null}
                            {CheckDate(SliceD(item.testDate), status[index], SliceT(item.testDate), item.testDuration) === 1 ?
                            <div className='st-upbt'>
                                <div><FontAwesomeIcon icon={faCalendarDays}/></div>
                                <span>Upcoming</span>
                            </div>
                            : null}
                            {CheckDate(SliceD(item.testDate), status[index], SliceT(item.testDate), item.testDuration) === 0 ?
                            <div className='st-startbt'>
                                <div><FontAwesomeIcon icon={faCirclePlay}/></div>
                                <span>Start</span>
                            </div>
                            : null}
                        </div>
                        {/*<div className="data5">
                            {no === 0 ? 
                                <div className='st-startbt' onClick={() => CheckDate()}>
                                    <div><FontAwesomeIcon icon={faCirclePlay}/></div>
                                    <span>Start</span>
                                </div>
                            : null
                            }
                            {no === 1 ? 
                                <div className='st-missedbt'>
                                    <div><FontAwesomeIcon icon={faFaceMehBlank}/></div>
                                    <span>Missed</span>
                                </div>
                            : null
                            }
                            {no === 2 ? 
                                <div className='st-attemptedbt'>
                                    <div><FontAwesomeIcon icon={faCircleCheck}/></div>
                                    <span>Attempted</span>
                                </div>
                            : null
                            }
                            {no === 3 ?
                                <div className='st-upbt' onClick={() => CheckDate()}>
                                    <div><FontAwesomeIcon icon={faCalendarDays}/></div>
                                    <span>Upcoming</span>
                                </div>
                            : null
                            }
                        </div>*/}
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default StudentTest