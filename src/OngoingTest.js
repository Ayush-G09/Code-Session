import React, { useEffect, useState } from "react";
import './OngoingTest.css'
import { faTrash, faSquareArrowUpRight, faPenToSquare, faBan, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Ogt(props) {

    let nav = useNavigate();

    var headers = {
        'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`
    }

    var testids = [];
    var testDetails = [];
    const [details, setDetail] = useState([]);
    const [date, setDate] = useState('');
    const [td, setTd] = useState('');
    const [somethingIsActivated, setSomethingisActivated] = useState(false);

    useEffect(() => {
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
        setDetail(testDetails);
    }
    fetchTestId()
    })

    async function DeleteTest(id, i) {
        var data = {testId: id, action: 'delete'};
        const request = await axios.post('https://code-sessions-backend.onrender.com/updateTestDetails', data, {headers: headers});
        if(request.status === 200)
        {
            alert('Test Deleted');
        }
        var editbt = document.getElementsByClassName('data6pen');
        var delebt = document.getElementsByClassName('data6trash');
        var cancbt = document.getElementsByClassName('data6ban');
        var savebt = document.getElementsByClassName('data6disk');
        var h1 = document.getElementsByClassName('data4eh1');
        var inp = document.getElementsByClassName('data4einput');
        var d1h1 = document.getElementsByClassName('data1eh1');
        var d1inp = document.getElementsByClassName('data1einput');
        var data1einputval = document.getElementsByClassName('data1einputval');
        var data4einput = document.getElementsByClassName('data4einput');
        data1einputval[i].value = date;
        data4einput[i].value = td;
        d1h1[i].style.display = 'flex';
        d1inp[i].style.display = 'none';
        editbt[i].style.display = 'flex';
        delebt[i].style.display = 'none';
        cancbt[i].style.display = 'none';
        savebt[i].style.display = 'none';
        h1[i].style.display = 'flex';
        inp[i].style.display = 'none';
        setSomethingisActivated(false)
    }

    function SliceDate(D) {
        var year = D.slice(0, 4);
        var month = D.slice(5, 7);
        var day = D.slice(8, 10);
        var Date = day.concat("-", month, "-", year);
        return Date;
    }

    function SliceTime(T) {
        var Time = T.slice(11, 16);
        return Time;
    }

    function EditClick(i , timedate, testdur) {
        if(!somethingIsActivated)
        {
        var editbt = document.getElementsByClassName('data6pen');
        var delebt = document.getElementsByClassName('data6trash');
        var cancbt = document.getElementsByClassName('data6ban');
        var savebt = document.getElementsByClassName('data6disk');
        var h1 = document.getElementsByClassName('data4eh1');
        var inp = document.getElementsByClassName('data4einput');
        var d1h1 = document.getElementsByClassName('data1eh1');
        var d1inp = document.getElementsByClassName('data1einput');
        var data1einputval = document.getElementsByClassName('data1einputval');
        var data4einput = document.getElementsByClassName('data4einput');
        var tempdate = timedate.slice(0, 16);
        data1einputval[i].value = tempdate;
        data4einput[i].value = testdur;
        setDate(tempdate);
        setTd(testdur);
        d1h1[i].style.display = 'none';
        d1inp[i].style.display = 'flex';
        editbt[i].style.display = 'none';
        delebt[i].style.display = 'flex';
        cancbt[i].style.display = 'flex';
        savebt[i].style.display = 'flex';
        h1[i].style.display = 'none';
        inp[i].style.display = 'flex';
        setSomethingisActivated(true);
        }
        else
        {
            alert('Complete your edit action first or cancel it.')
        }
    }

    function CancelClick(i) {
        var editbt = document.getElementsByClassName('data6pen');
        var delebt = document.getElementsByClassName('data6trash');
        var cancbt = document.getElementsByClassName('data6ban');
        var savebt = document.getElementsByClassName('data6disk');
        var h1 = document.getElementsByClassName('data4eh1');
        var inp = document.getElementsByClassName('data4einput');
        var d1h1 = document.getElementsByClassName('data1eh1');
        var d1inp = document.getElementsByClassName('data1einput');
        var data1einputval = document.getElementsByClassName('data1einputval');
        var data4einput = document.getElementsByClassName('data4einput');
        data1einputval[i].value = date;
        data4einput[i].value = td;
        d1h1[i].style.display = 'flex';
        d1inp[i].style.display = 'none';
        editbt[i].style.display = 'flex';
        delebt[i].style.display = 'none';
        cancbt[i].style.display = 'none';
        savebt[i].style.display = 'none';
        h1[i].style.display = 'flex';
        inp[i].style.display = 'none';
        setSomethingisActivated(false)
    }

    async function SaveClick(i, tid) {
        var data1einputval = document.getElementsByClassName('data1einputval');
        var data4einput = document.getElementsByClassName('data4einput');
        var data = {testDate: data1einputval[i].value, testDuration: data4einput[i].value, action : 'update', testId : tid};
        if(data4einput[i].value === '')
        {
            alert('Please enter all value');
        }
        else
        {
            console.log(data)
            const request = await axios.post('https://code-sessions-backend.onrender.com/updateTestDetails', data, {headers: headers});
            if(request.status === 200)
            {
                alert('Test Updated');
            }
            var editbt = document.getElementsByClassName('data6pen');
            var delebt = document.getElementsByClassName('data6trash');
            var cancbt = document.getElementsByClassName('data6ban');
            var savebt = document.getElementsByClassName('data6disk');
            var h1 = document.getElementsByClassName('data4eh1');
            var inp = document.getElementsByClassName('data4einput');
            var d1h1 = document.getElementsByClassName('data1eh1');
            var d1inp = document.getElementsByClassName('data1einput');
            d1h1[i].style.display = 'flex';
            d1inp[i].style.display = 'none';
            editbt[i].style.display = 'flex';
            delebt[i].style.display = 'none';
            cancbt[i].style.display = 'none';
            savebt[i].style.display = 'none';
            h1[i].style.display = 'flex';
            inp[i].style.display = 'none';
            setSomethingisActivated(false)
        }
    }

    return(
        <>
        {props.isCt ? 
        <div className="Ogtct-con">
            <div className="table-headingct">
                <div className="head1"><h1>Start Date & Time</h1></div>
                <div className="head2"><h1>Aptitude Questions</h1></div>
                <div className="head3"><h1>Coding Questions</h1></div>
                <div className="head4"><h1>Test Duration</h1></div>
                <div className="head5"><h1>Test Id</h1></div>
                <div className="head6"></div>
            </div>
            <div className="table-Data">
            {details.map((item, index) => {
                return(
                    <div className="Ogt-datact" key={index}>
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
                        <div className="data5"><h1>{item.testId}</h1></div>
                        <div className="data6ct" onClick={() => {props.TestDetail(item.testId)}}><FontAwesomeIcon className="data6cti" icon={faSquareArrowUpRight} /></div>
                    </div>
                )
            })}
            </div>
        </div> : null
        || props.isT ?
        <div className="Ogt-con">
            <div className="table-heading">
                <div className="head1"><h1>Start Date & Time</h1></div>
                <div className="head2"><h1>Aptitude Questions</h1></div>
                <div className="head3"><h1>Coding Questions</h1></div>
                <div className="head4e"><h1>Test Duration</h1></div>
                <div className="head5"><h1>Test Id</h1></div>
                <div className="head6e"></div>
            </div>
            <div className="table-Data">
                {details.map((item, index) => {
                    return(
                        <div className="Ogt-data" key={index}>
                            <div className="data1eh1">
                                <h1>{SliceDate(item.testDate)}</h1>
                                <h1 className="space">&</h1>
                                <h1>{SliceTime(item.testDate)}</h1>
                            </div>
                            <div className="data1einput">
                                <input className="data1einputval" type="datetime-local"></input>
                            </div>
                            <div className="data2"><h1>{item.aptitude}</h1></div>
                            <div className="data3"><h1>{item.coding}</h1></div>
                            <div className="data4e">
                                <h1 className="data4eh1">{item.testDuration} Hours</h1>
                                <input className="data4einput" type='number'></input>
                            </div>
                            <div className="data5"><h1>{item.testId}</h1></div>
                            <div className="data6e"><FontAwesomeIcon className="data6pen" icon={faPenToSquare} onClick={() => EditClick(index, item.testDate, item.testDuration)}/><FontAwesomeIcon icon={faFloppyDisk} className='data6disk' onClick={() => SaveClick(index, item.testId)}/><FontAwesomeIcon icon={faTrash} className='data6trash' onClick={() => DeleteTest(item.testId, index)}/><FontAwesomeIcon icon={faBan} className='data6ban' onClick={() => CancelClick(index)}/></div>
                        </div>
                    )
                })}
            </div>
        </div> : null
        }
        </>
    );
}

export default Ogt;