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
    const [aques, setAques] = useState('');
    const [aoptns, setAoptns] = useState([]);
    const [cques, setCques] = useState('');
    const [ccons, setCcons] = useState('');
    const [csi, setCsi] = useState([]);
    let testaptiques = [];

    if(sessionStorage.getItem('jwt') === null)
    {
        sessionStorage.setItem('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxhdGlrYXBhaTE5QHN2dnYuZWR1LmluIiwicm9sZSI6InN0dWRlbnQiLCJpZCI6IldmSWRxOXR3a3IxaUFXRjh6UzVXWCIsImlhdCI6MTY3MDE4NTg1NywiZXhwIjoxNjcwNzkwNjU3fQ.W34ITLEK_DlIiV4BKpvKVE41-0DS0bcCwjYPDXbKMOI')
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
                    if(ch >= teststarthr)
                    {
                        if(ch < endtime)
                        {
                            return 0;
                        }
                        else
                        {
                            return 0;
                        }
                    }
                    else
                    {
                        return 1;
                    }
                }
                else
                {
                    return 0;
                }
            }
        }
        else
        {
            return 1;
        }
    }

    async function StartClick(testid, aptiq, codq) {
        sessionStorage.setItem('tid', testid);
        sessionStorage.setItem('aptq', aptiq);
        sessionStorage.setItem('codq', codq);
        sessionStorage.setItem('aptcom', 1);
        sessionStorage.setItem('codcom', 0);
        var con = document.getElementById('st-con');
        var con0 = document.getElementById('st-con0');
        con.style.display = 'none';
        con0.style.display = 'flex';
        var data = {testId : testid};
        const arequest = await axios.post('https://code-sessions-backend.onrender.com/displayAptitudeQuestions', data, {headers: headers});
        //const crequest = await axios.post('https://code-sessions-backend.onrender.com/displayCodingProblems', data, {headers: headers});
        //setCodequestion(crequest.data.coding);
        console.log(arequest.data.aptitude);
        //console.log(crequest.data.coding);
        testaptiques = arequest.data.aptitude;
        setAques(testaptiques[0].question);
        setAoptns(testaptiques[0].options)
        console.log(testaptiques);
        console.log(aques);
    }

    async function SaveAndNext() {
        if(sessionStorage.getItem('aptcom') < sessionStorage.getItem('aptq'))
        {
            var data = {testId : sessionStorage.getItem('tid')};
            var a = parseInt(sessionStorage.getItem('aptcom'));
            var n = a + 1;
            sessionStorage.setItem('aptcom', n);
            var z = n - 1;
            const arequest = await axios.post('https://code-sessions-backend.onrender.com/displayAptitudeQuestions', data, {headers: headers});
            testaptiques = arequest.data.aptitude;
            setAques(testaptiques[z].question);
            setAoptns(testaptiques[z].options);
        }
        else
        {
            if(sessionStorage.getItem('codcom') < sessionStorage.getItem('codq')) {
                data = {testId : sessionStorage.getItem('tid')};
                a = parseInt(sessionStorage.getItem('codcom'));
                n = a + 1;
                sessionStorage.setItem('codcom', n);
                z = n - 1;
                var apticon = document.getElementById('apticon');
                apticon.style.display = 'none';
                var codicon = document.getElementById('codicon');
                codicon.style.display = 'flex';
                const crequest = await axios.post('https://code-sessions-backend.onrender.com/displayCodingProblems', data, {headers: headers});
                console.log(crequest.data);
                setCques(crequest.data.coding[z].question);
                setCcons(crequest.data.coding[z].constraints);
                setCsi(crequest.data.coding[z].sampleTestCases);
            }
            else
            {
                var apticon = document.getElementById('apticon');
                apticon.style.display = 'none';
                var codicon = document.getElementById('codicon');
                codicon.style.display = 'none';
                var snbt = document.getElementById('snbt');
                snbt.style.display = 'none';
                var etbt = document.getElementById('etbt');
                etbt.style.display = 'flex';
            }
        }
    }

    function End() {
        var con = document.getElementById('st-con');
        var con0 = document.getElementById('st-con0');
        con.style.display = 'flex';
        con0.style.display = 'none';
        var apticon = document.getElementById('apticon');
        apticon.style.display = 'flex';
        var snbt = document.getElementById('snbt');
        snbt.style.display = 'flex';
        var etbt = document.getElementById('etbt');
        etbt.style.display = 'none';
    }

    fetchTestId()

  return (
    <>
    <div className='St-con' id='st-con'>
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
                            <div className='st-startbt' onClick={() => StartClick(item.testId, item.aptitude, item.coding)}>
                                <div><FontAwesomeIcon icon={faCirclePlay}/></div>
                                <span>Start</span>
                            </div>
                            : null}
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
    <div className='St-con0' id='st-con0'>
        <div className='St-con0h'></div>
        <div className='St-con0c'>
            <div className='St-con0cq'>
                <div className='St-con0cqapti' id='apticon'>
                    <div className='St-con0cqapti1'>
                        <span>{aques}</span>
                    </div>
                    <div className='St-con0cqapti2'>
                        <div className='St-con0cqapti21'>
                            <span className='h'>Option 1</span>
                            <div>
                                <span className='optn'>{aoptns[0]}</span>
                            </div>
                        </div>
                        <div className='St-con0cqapti21'>
                            <span className='h'>Option 2</span>
                            <div>
                                <span className='optn'>{aoptns[1]}</span>
                            </div>
                        </div>
                        <div className='St-con0cqapti21'>
                            <span className='h'>Option 3</span>
                            <div>
                                <span className='optn'>{aoptns[2]}</span>
                            </div>
                        </div>
                        <div className='St-con0cqapti21'>
                            <span className='h'>Option 4</span>
                            <div>
                                <span className='optn'>{aoptns[3]}</span>
                            </div>
                        </div>
                    </div>
                    <div className='St-con0cqapti3'>
                        <span>Answer</span>
                        <input type='number'></input>
                    </div>
                </div>
                <div className='St-con0cqcodi' id='codicon'>
                    <div className='St-con0cqcodi0'>
                        <div className='St-con0cqcodi01'>{cques}</div>
                        <div className='St-con0cqcodi02'>{ccons}</div>
                        <div className='St-con0cqcodi03'>
                        {csi.map((item, index) => {
                            return(
                                <div className='St-con0cqcodi031' key={index}>
                                    <div className='St-con0cqcodi0311'>Sample Testcase {index + 1}</div>
                                    <div className='St-con0cqcodi0312'>Input: {item.input}</div>
                                    <div className='St-con0cqcodi0313'>Output: {item.output}</div>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                    <div className='St-con0cqcodi1'>
                        <div className='St-con0cqcodi1h'>
                            <select name="languages" id="languages" className='languages'>
                                <option value="volvo">C++</option>
                                <option value="saab">Java</option>
                                <option value="mercedes">Python</option>
                            </select>
                        </div>
                        <div className='St-con0cqcodi1c'>
                            <textarea placeholder='Code Here.....'></textarea>
                        </div>
                        <div className='St-con0cqcodi1cb'>
                            <div>Submit</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='St-con0cs'>
                <div className='St-con0csname'>
                    <div className='float'>
                        <span>{sessionStorage.getItem('name')}</span>
                    </div>
                </div>
                <div className='St-con0cs1'>
                    <div className='float'>
                        <h1>Aptitude Questions</h1>
                        <div className='St-con0cs11'>
                            <span className='green'>{sessionStorage.getItem('aptcom')}</span><span>/</span><span className='white'>{sessionStorage.getItem('aptq')}</span>
                        </div>
                    </div>
                </div>
                <div className='St-con0cs1'>
                    <div className='float'>
                        <h1>Coding Questions</h1>
                        <div className='St-con0cs11'>
                            <span className='green'>{sessionStorage.getItem('codcom')}</span><span>/</span><span className='white'>{sessionStorage.getItem('codq')}</span>
                        </div>
                    </div>
                </div>
                <div className='St-con0cssnbt'>
                    <div className='snbt' id='snbt' onClick={() => SaveAndNext()}>Save & Next</div>
                    <div className='etbt' id='etbt' onClick={() => End()}>End Test</div>
                    <div className='subbt'>Submit Test</div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default StudentTest