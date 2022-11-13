import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import './CreateTest.css';
import Ogt from "./OngoingTest";
import { faPenToSquare, faFloppyDisk, faBan, faArrowRightFromBracket, faTrash, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const AptData = {
    _id : '',
    testId : '',
    question : '',
    options : [],
    answer : ''
}

const CodSamData = {
    _id : '',
    testId : '',
    question : '',
    constraints : '',
    sampleTestCases : [
        {
            input : '',
            output : '',
            _id : ''
        }
    ],
    hiddenTestCases : [
        {
            input : '',
            output : '',
            _id : ''
        }
    ]
}

const TestCase = {
    input : '',
    output : '',
    _id : ''
}

function Ct() {

    var isCt = true;
    var headers = {
        'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`
    }

    const [aptiques, setAptiques] = useState('');
    const [codques, setCodques] = useState('');
    const [aptdata, setAptdata] = useState([]);
    const [coddata, setCoddata] = useState([]);
    const [update, setUpdate] = useState(true);
    const [aptiquesval, setAptiquesval] = useState('');
    const [aptiop1val, setAptiop1val] = useState('');
    const [aptiop2val, setAptiop2val] = useState('');
    const [aptiop3val, setAptiop3val] = useState('');
    const [aptiop4val, setAptiop4val] = useState('');
    const [aptiansval, setAptiansval] = useState('');
    const [cTestid, setCTestid] = useState('');
    const [somethingIsActivated, setSomethingisActivated] = useState(false);
    const [codquesval, setCodequesval] = useState('');
    const [codconstval, setCodconstval] = useState('');
    const [codpubtcival, setCodpubtcival] = useState([]);
    const [codpubtcoval, setCodpubtcoval] = useState([]);
    const [codhidtcival, setCodhidtcival] = useState([]);
    const [codhidtcoval, setCodhidtcoval] = useState([]);

    function EditClick(i) {
        if(somethingIsActivated)
        {
            alert('Complete your edit action first or cancel it.');
        }
        else
        {
            var editbt = document.getElementsByClassName('edibt');
            var savbt = document.getElementsByClassName('savbt');
            var canbt = document.getElementsByClassName('canbt');
            var delbt = document.getElementsByClassName('delbt');
            var ques = document.getElementsByClassName('aptiques');
            var aptop1 = document.getElementsByClassName('aptop1');
            var aptop2 = document.getElementsByClassName('aptop2');
            var aptop3 = document.getElementsByClassName('aptop3');
            var aptop4 = document.getElementsByClassName('aptop4');
            var aptans = document.getElementsByClassName('aptans');
            setAptiquesval(ques[i].value);
            setAptiop1val(aptop1[i].value);
            setAptiop2val(aptop2[i].value);
            setAptiop3val(aptop3[i].value);
            setAptiop4val(aptop4[i].value);
            setAptiansval(aptans[i].value);
            aptans[i].style.pointerEvents = "all";
            aptop1[i].style.pointerEvents = "all";
            aptop2[i].style.pointerEvents = "all";
            aptop3[i].style.pointerEvents = "all";
            aptop4[i].style.pointerEvents = "all";
            ques[i].style.pointerEvents = "all";
            editbt[i].style.display = "none";
            savbt[i].style.display = "flex";
            canbt[i].style.display = "flex";
            delbt[i].style.display = "flex";
            setSomethingisActivated(true);
        }
    }

    async function SaveClick(i, aid) {
        var editbt = document.getElementsByClassName('edibt');
        var savbt = document.getElementsByClassName('savbt');
        var canbt = document.getElementsByClassName('canbt');
        var delbt = document.getElementsByClassName('delbt');
        var ques = document.getElementsByClassName('aptiques');
        var aptop1 = document.getElementsByClassName('aptop1');
        var aptop2 = document.getElementsByClassName('aptop2');
        var aptop3 = document.getElementsByClassName('aptop3');
        var aptop4 = document.getElementsByClassName('aptop4');
        var aptans = document.getElementsByClassName('aptans');
        var data = {testId : cTestid, question : ques[i].value, options : [aptop1[i].value, aptop2[i].value, aptop3[i].value, aptop4[i].value], answer : aptans[i].value};
        console.log(data);
        if(ques[i].value === '' || aptop1[i].value === '' || aptop2[i].value === '' || aptop3[i].value === '' || aptop4[i].value === '' || aptans[i].value === '')
        {
            alert('Please enter all fields');
        }
        else
        {
            if(aptiquesval === '')
            {
                const request = await axios.post('https://code-sessions-backend.onrender.com/addAptitudeQuestions', data, {headers: headers});
                console.log(request)
                if(request.status === 200)
                {
                    alert('Aptitude question added');
                    TestDetail(cTestid);
                }
            }
            else
            {
                var dat = {testId : cTestid, question : ques[i].value, options : [aptop1[i].value, aptop2[i].value, aptop3[i].value, aptop4[i].value], answer : aptans[i].value, aptitudeID : aid, action : "update"};
                const request = await axios.post('https://code-sessions-backend.onrender.com/updateAptituteQuestions', dat, {headers: headers});
                console.log(request)
                if(request.status === 200)
                {
                    alert('Aptitude question updated');
                    TestDetail(cTestid);
                }
            }
            aptans[i].style.pointerEvents = "none";
            aptop1[i].style.pointerEvents = "none";
            aptop2[i].style.pointerEvents = "none";
            aptop3[i].style.pointerEvents = "none";
            aptop4[i].style.pointerEvents = "none";
            ques[i].style.pointerEvents = "none";
            editbt[i].style.display = "flex";
            savbt[i].style.display = "none";
            canbt[i].style.display = "none";
            delbt[i].style.display = "none";
        }
        if(update)
        {
            setUpdate(false);
        }
        else
        {
            setUpdate(true);
        }
        setSomethingisActivated(false);
    }

    async function CancelClick(i) {
        var editbt = document.getElementsByClassName('edibt');
        var savbt = document.getElementsByClassName('savbt');
        var canbt = document.getElementsByClassName('canbt');
        var delbt = document.getElementsByClassName('delbt');
        var ques = document.getElementsByClassName('aptiques');
        var aptop1 = document.getElementsByClassName('aptop1');
        var aptop2 = document.getElementsByClassName('aptop2');
        var aptop3 = document.getElementsByClassName('aptop3');
        var aptop4 = document.getElementsByClassName('aptop4');
        var aptans = document.getElementsByClassName('aptans');
        ques[i].value = aptiquesval;
        aptop1[i].value = aptiop1val;
        aptop2[i].value = aptiop2val;
        aptop3[i].value = aptiop3val;
        aptop4[i].value = aptiop4val;
        aptans[i].value = aptiansval
        aptans[i].style.pointerEvents = "none";
        aptop1[i].style.pointerEvents = "none";
        aptop2[i].style.pointerEvents = "none";
        aptop3[i].style.pointerEvents = "none";
        aptop4[i].style.pointerEvents = "none";
        ques[i].style.pointerEvents = "none";
        editbt[i].style.display = "flex";
        savbt[i].style.display = "none";
        canbt[i].style.display = "none";
        delbt[i].style.display = "none";
        setSomethingisActivated(false);
    }

    async function DeleteAptQues(i, aid) {
        var data = {testId : cTestid, aptitudeID : aid, action : "delete"};
        console.log(data);
        if(aid === '')
        {
            console.log(aptdata);
            aptdata.splice(i, 1);
        }
        else
        {
            const request = await axios.post('https://code-sessions-backend.onrender.com/updateAptituteQuestions', data, {headers: headers});
            console.log(request)
            if(request.status === 200)
            {
                alert('Aptitude question deleted');
                TestDetail(cTestid);
            }
        }
        var editbt = document.getElementsByClassName('edibt');
        var savbt = document.getElementsByClassName('savbt');
        var canbt = document.getElementsByClassName('canbt');
        var delbt = document.getElementsByClassName('delbt');
        editbt[i].style.display = "flex";
        savbt[i].style.display = "none";
        canbt[i].style.display = "none";
        delbt[i].style.display = "none";
        if(update)
        {
            setUpdate(false);
        }
        else
        {
            setUpdate(true);
        }
        setSomethingisActivated(false);
    }

    function CodEditClick(i) {
        if(somethingIsActivated)
        {
            alert('Complete your edit action first or cancel it.');
        }
        else
        {
        var editbt = document.getElementsByClassName('codedibt');
        var savbt = document.getElementsByClassName('codsavbt');
        var canbt = document.getElementsByClassName('codcanbt');
        var delbt = document.getElementsByClassName('coddelbt');
        var pubadd = document.getElementsByClassName('pubaddmore');
        var hidadd = document.getElementsByClassName('hidaddmore');
        var rempubtc = document.getElementsByClassName(`tempubtc${i}`);
        var remhidtc = document.getElementsByClassName(`temhidtc${i}`);
        var codques = document.getElementsByClassName('codques');
        var codconst = document.getElementsByClassName('codconst');
        var codpubtci = document.getElementsByClassName(`codpubtci${i}`);
        var codpubtco = document.getElementsByClassName(`codpubtco${i}`);
        var codhidtci = document.getElementsByClassName(`codhidtci${i}`);
        var codhidtco = document.getElementsByClassName(`codhidtco${i}`);
        setCodequesval(codques[i].value);
        setCodconstval(codconst[i].value);
        var temparr1 = [];
        var temparr2 = [];
        var temparr3 = [];
        var temparr4 = [];
        for(var e = 0; e < codpubtci.length; e++)
        {
            codpubtci[e].style.pointerEvents = 'all';
            temparr1.push(codpubtci[e].value);
            codpubtco[e].style.pointerEvents = 'all';
            temparr2.push(codpubtco[e].value);
        }
        for(var g = 0; g < codhidtci.length; g++)
        {
            codhidtci[g].style.pointerEvents = 'all';
            temparr3.push(codhidtci[g].value);
            codhidtco[g].style.pointerEvents = 'all';
            temparr4.push(codhidtco[g].value);
        }
        setCodpubtcival(temparr1);
        setCodpubtcoval(temparr2);
        setCodhidtcival(temparr3);
        setCodhidtcoval(temparr4);
        codques[i].style.pointerEvents = 'all';
        codconst[i].style.pointerEvents = 'all';
        for(var a = 0; a < remhidtc.length; a++)
        {
            remhidtc[a].style.display = "flex";
        }
        for(var b = 0; b < rempubtc.length; b++)
        {
            rempubtc[b].style.display = "flex";
        }
        editbt[i].style.display = "none";
        savbt[i].style.display = "flex";
        canbt[i].style.display = "flex";
        delbt[i].style.display = "flex";
        pubadd[i].style.display = "flex";
        hidadd[i].style.display = "flex";
        setSomethingisActivated(true);
        }
    }

    function GetPubTc(i) {
        var codpubtci = document.getElementsByClassName(`codpubtci${i}`);
        var codpubtco = document.getElementsByClassName(`codpubtco${i}`);
        var stc = [];
        for(var a = 0; a < codpubtci.length; a++)
        {
            var tarr = {input : codpubtci[a].value, output : codpubtco[a].value};
            stc.push(tarr);
        }
        return stc;
    }

    function GetHidTc(i) {
        var codhidtci = document.getElementsByClassName(`codhidtci${i}`);
        var codhidtco = document.getElementsByClassName(`codhidtco${i}`);
        var htc = [];
        for(var a = 0; a < codhidtci.length; a++)
        {
            var tarr = {input : codhidtci[a].value, output : codhidtco[a].value};
            htc.push(tarr);
        }
        return htc;
    }

    async function CodSaveClick(i , qid) {
        var editbt = document.getElementsByClassName('codedibt');
        var savbt = document.getElementsByClassName('codsavbt');
        var canbt = document.getElementsByClassName('codcanbt');
        var delbt = document.getElementsByClassName('coddelbt');
        var pubadd = document.getElementsByClassName('pubaddmore');
        var hidadd = document.getElementsByClassName('hidaddmore');
        var rempubtc = document.getElementsByClassName(`tempubtc${i}`);
        var remhidtc = document.getElementsByClassName(`temhidtc${i}`);
        var codques = document.getElementsByClassName('codques');
        var codconst = document.getElementsByClassName('codconst');
        var codpubtci = document.getElementsByClassName(`codpubtci${i}`);
        var codpubtco = document.getElementsByClassName(`codpubtco${i}`);
        var codhidtci = document.getElementsByClassName(`codhidtci${i}`);
        var codhidtco = document.getElementsByClassName(`codhidtco${i}`);
        var data = {testId : cTestid, question : codques[i].value, constraints : codconst[i].value, sampleTestCases : GetPubTc(i), hiddenTestCases : GetHidTc(i)}
        if(codques[i].value === '' || codconst[i].value === '')
        {
            alert('Please enter all fields');
        }
        else
        {
            var isb = false;
            for(var z = 0; z < codpubtci.length; z++)
            {
                if(codpubtci[z].value === '' || codpubtco[z].value === '')
                {
                    alert('Please enter all fields');
                    break;
                }
                if(z+1 === codpubtci.length)
                {
                    isb = true;
                }
            }
            if(isb)
            {
                isb = false;
                for(var x = 0; x < codhidtci.length; x++)
                {
                    if(codhidtci[x].value === '' || codhidtco[x].value === '')
                    {
                        alert('Please enter all fields');
                        break;
                    }
                    if(x+1 === codhidtci.length)
                    {
                        isb = true;
                    }
                }
            }
            if(isb)
            {
                if(codquesval === '')
                {
                    const request = await axios.post('https://code-sessions-backend.onrender.com/addCodingProblems', data, {headers: headers});
                    console.log(request)
                    if(request.status === 200)
                    {
                        alert('Aptitude question added.');
                        TestDetail(cTestid);
                    }
                }
                else
                {
                    var dat = {testId : cTestid, question : codques[i].value, constraints : codconst[i].value, sampleTestCases : GetPubTc(i), hiddenTestCases : GetHidTc(i), codingID : qid, action : 'update'};
                    console.log(dat)
                    const request = await axios.post('https://code-sessions-backend.onrender.com/updateCodingProblems', dat, {headers: headers});
                    console.log(request)
                    if(request.status === 200)
                    {
                        alert('Aptitude question updated.');
                        TestDetail(cTestid);
                    }
                }
            }
        }
        for(var e = 0; e < codpubtci.length; e++)
        {
            codpubtci[e].style.pointerEvents = 'none';
            codpubtco[e].style.pointerEvents = 'none';
        }
        for(var g = 0; g < codhidtci.length; g++)
        {
            codhidtci[g].style.pointerEvents = 'none';
            codhidtco[g].style.pointerEvents = 'none';
        }
        codques[i].style.pointerEvents = 'none';
        codconst[i].style.pointerEvents = 'none';
        for(var a = 0; a < remhidtc.length; a++)
        {
            remhidtc[a].style.display = "none";
        }
        for(var b = 0; b < rempubtc.length; b++)
        {
            rempubtc[b].style.display = "none";
        }
        editbt[i].style.display = "flex";
        savbt[i].style.display = "none";
        canbt[i].style.display = "none";
        delbt[i].style.display = "none";
        pubadd[i].style.display = "none";
        hidadd[i].style.display = "none";
        if(update)
        {
            setUpdate(false);
        }
        else
        {
            setUpdate(true);
        }
        setSomethingisActivated(false);
    }

    function CodCancelClick(i) {
        var editbt = document.getElementsByClassName('codedibt');
        var savbt = document.getElementsByClassName('codsavbt');
        var canbt = document.getElementsByClassName('codcanbt');
        var delbt = document.getElementsByClassName('coddelbt');
        var pubadd = document.getElementsByClassName('pubaddmore');
        var hidadd = document.getElementsByClassName('hidaddmore');
        var rempubtc = document.getElementsByClassName(`tempubtc${i}`);
        var remhidtc = document.getElementsByClassName(`temhidtc${i}`);
        var codques = document.getElementsByClassName('codques');
        var codconst = document.getElementsByClassName('codconst');
        var codpubtci = document.getElementsByClassName(`codpubtci${i}`);
        var codpubtco = document.getElementsByClassName(`codpubtco${i}`);
        var codhidtci = document.getElementsByClassName(`codhidtci${i}`);
        var codhidtco = document.getElementsByClassName(`codhidtco${i}`);
        codques[i].value = codquesval;
        codconst[i].value = codconstval;
        for(var e = 0; e < codpubtci.length; e++)
        {
            if(codpubtcival[e] === undefined)
            {
                codpubtci[e].value = '';
            }
            else
            {
                codpubtci[e].value = codpubtcival[e];
            }
            if(codpubtcoval[e] === undefined)
            {
                codpubtco[e].value = '';
            }
            else
            {
                codpubtco[e].value = codpubtcoval[e];
            }
            codpubtci[e].style.pointerEvents = 'none';
            codpubtco[e].style.pointerEvents = 'none';
        }
        for(var g = 0; g < codhidtci.length; g++)
        {
            if(codhidtcival[g] === undefined)
            {
                codhidtci[g].value = '';
            }
            else
            {
                codhidtci[g].value = codhidtcival[g];
            }
            if(codhidtcoval[g] === undefined)
            {
                codhidtco[g].value = '';
            }
            else
            {
                codhidtco[g].value = codhidtcoval[g];
            }
            codhidtci[g].style.pointerEvents = 'none';
            codhidtco[g].style.pointerEvents = 'none';
        }
        codques[i].style.pointerEvents = 'none';
        codconst[i].style.pointerEvents = 'none';
        for(var a = 0; a < remhidtc.length; a++)
        {
            remhidtc[a].style.display = "none";
        }
        for(var b = 0; b < rempubtc.length; b++)
        {
            rempubtc[b].style.display = "none";
        }
        editbt[i].style.display = "flex";
        savbt[i].style.display = "none";
        canbt[i].style.display = "none";
        delbt[i].style.display = "none";
        pubadd[i].style.display = "none";
        hidadd[i].style.display = "none";
        setSomethingisActivated(false);
    }

    async function CodDeleteClick(i, qid) {
        var editbt = document.getElementsByClassName('codedibt');
        var savbt = document.getElementsByClassName('codsavbt');
        var canbt = document.getElementsByClassName('codcanbt');
        var delbt = document.getElementsByClassName('coddelbt');
        var pubadd = document.getElementsByClassName('pubaddmore');
        var hidadd = document.getElementsByClassName('hidaddmore');
        var rempubtc = document.getElementsByClassName(`tempubtc${i}`);
        var remhidtc = document.getElementsByClassName(`temhidtc${i}`);
        var codques = document.getElementsByClassName('codques');
        var codconst = document.getElementsByClassName('codconst');
        var codpubtci = document.getElementsByClassName(`codpubtci${i}`);
        var codpubtco = document.getElementsByClassName(`codpubtco${i}`);
        var codhidtci = document.getElementsByClassName(`codhidtci${i}`);
        var codhidtco = document.getElementsByClassName(`codhidtco${i}`);
        var data = {testId : cTestid, codingID : qid, action : 'delete'};
        console.log(data)
        if(qid === '')
        {
            console.log(coddata);
            coddata.splice(i, 1);
        }
        else
        {
            const request = await axios.post('https://code-sessions-backend.onrender.com/updateCodingProblems', data, {headers: headers});
            console.log(request)
            if(request.status === 200)
            {
                alert('Coding question deleted');
                TestDetail(cTestid);
            }
        }
        for(var e = 0; e < codpubtci.length; e++)
        {
            codpubtci[e].style.pointerEvents = 'none';
            codpubtco[e].style.pointerEvents = 'none';
        }
        for(var g = 0; g < codhidtci.length; g++)
        {
            codhidtci[g].style.pointerEvents = 'none';
            codhidtco[g].style.pointerEvents = 'none';
        }
        codques[i].style.pointerEvents = 'none';
        codconst[i].style.pointerEvents = 'none';
        for(var a = 0; a < remhidtc.length; a++)
        {
            remhidtc[a].style.display = "none";
        }
        for(var b = 0; b < rempubtc.length; b++)
        {
            rempubtc[b].style.display = "none";
        }
        editbt[i].style.display = "flex";
        savbt[i].style.display = "none";
        canbt[i].style.display = "none";
        delbt[i].style.display = "none";
        pubadd[i].style.display = "none";
        hidadd[i].style.display = "none";
        if(update)
        {
            setUpdate(false);
        }
        else
        {
            setUpdate(true);
        }
        setSomethingisActivated(false);
    }

    async function TestDetail(id) {
        var data = {testId: id};
        setCTestid(id);
        const request = await axios.post('https://code-sessions-backend.onrender.com/displayTestDetails', data, {headers: headers});
        setAptiques(request.data.testDetails.aptitude);
        setCodques(request.data.testDetails.coding);
        console.log(request.data.testDetails.coding);
        const apreq = await axios.post('https://code-sessions-backend.onrender.com/displayAptitudeQuestions', data, {headers: headers});
        setAptdata(apreq.data.aptitude);
        const coreq = await axios.post('https://code-sessions-backend.onrender.com/displayCodingProblems', data, {headers: headers});
        setCoddata(coreq.data.coding);
        console.log(coddata);
        var con1 = document.getElementById('con1');
        var con2 = document.getElementById('con2');
        var backbt = document.getElementById('backbt');
        con1.style.display = "none";
        con2.style.display = "flex";
        backbt.style.display = "flex";
    }

    function AddAptiQues() {
        aptdata.push(AptData);
        console.log(aptdata)
        if(update)
        {
            setUpdate(false);
        }
        else
        {
            setUpdate(true);
        }
    }

    function AddCodQues() {
        console.log(coddata);
        coddata.push(CodSamData);
        console.log(coddata);
        if(update)
        {
            setUpdate(false);
        }
        else
        {
            setUpdate(true);
        }
    }

    function AfterAddTestCase(i) {
        var rempubtc = document.getElementsByClassName(`tempubtc${i}`);
        var remhidtc = document.getElementsByClassName(`temhidtc${i}`);
        var codpubtci = document.getElementsByClassName(`codpubtci${i}`);
        var codpubtco = document.getElementsByClassName(`codpubtco${i}`);
        var codhidtci = document.getElementsByClassName(`codhidtci${i}`);
        var codhidtco = document.getElementsByClassName(`codhidtco${i}`);
        setTimeout(() => {
            for(var a = 0; a < remhidtc.length; a++)
            {
                remhidtc[a].style.display = "flex";
            }
            for(var b = 0; b < rempubtc.length; b++)
            {
                rempubtc[b].style.display = "flex";
            }
            for(var e = 0; e < codpubtci.length; e++)
            {
                codpubtci[e].style.pointerEvents = 'all';
                codpubtco[e].style.pointerEvents = 'all';
            }
            for(var g = 0; g < codhidtci.length; g++)
            {
                codhidtci[g].style.pointerEvents = 'all';
                codhidtco[g].style.pointerEvents = 'all';
            }
        }, 1000);
    }

    function AddPubTC(i) {
        coddata[i].sampleTestCases.push(TestCase);
        AfterAddTestCase(i);
        if(update)
        {
            setUpdate(false);
        }
        else
        {
            setUpdate(true);
        }
    }

    function RemPubTC(index, stcindex) {
        coddata[index].sampleTestCases.splice(stcindex, 1);
        if(update)
        {
            setUpdate(false);
        }
        else
        {
            setUpdate(true);
        }
    }

    function AddhidTC(i) {
        coddata[i].hiddenTestCases.push(TestCase);
        AfterAddTestCase(i);
        if(update)
        {
            setUpdate(false);
        }
        else
        {
            setUpdate(true);
        }
    }

    function RemHidTC(index, htcindex) {
        coddata[index].hiddenTestCases.splice(htcindex, 1);
        if(update)
        {
            setUpdate(false);
        }
        else
        {
            setUpdate(true);
        }
    }

    function Back() {
        if(somethingIsActivated)
        {
            alert('Complete your edit action first or cancel it.');
        }
        else
        {
            var con1 = document.getElementById('con1');
            var con2 = document.getElementById('con2');
            var backbt = document.getElementById('backbt');
            con1.style.display = "flex";
            con2.style.display = "none";
            backbt.style.display = "none";
        }
    }

    async function CrTe() {
        var testDate = document.getElementById('dateid').value;
        var testDuration = document.getElementById('noid').value;
        var data = {testDate: testDate, testDuration: testDuration};
        if(testDate === '')
        {
            alert('Select date & time.')
        }
        else
        {
            if(testDuration === '')
            {
                alert('Enter test duration');
            }
            else
            {
                const request = await axios.post('https://code-sessions-backend.onrender.com/createTest', data, {headers: headers});
                if(request.status === 200)
                {
                    alert('Test created.')
                    document.getElementById('noid').value = '';
                    document.getElementById('dateid').value = '';
                }
            }
        }
    }

    return(
        <>
        <div className="Ct-con1">
            <div className="Ct-con1-header">
                <h1>Create Test</h1>
            </div>
            <div className="Ct-con1-content">
                <div className="Ct-con1-content-b1"><h1>Date & Time</h1></div>
                <div className="Ct-con1-content-b2">
                    <input className="datepicker" type="datetime-local" placeholder="Select Date & Time" id="dateid"></input>
                </div>
                <div className="Ct-con1-content-b3"><h1>Test Duration</h1></div>
                <div className="Ct-con1-content-b2">
                    <input className="datepicker" type="number" placeholder="Test Duration (In Hours)" id="noid"></input>
                </div>
                <div className="Ct-con1-content-b4"><div onClick={() => CrTe()}>Create</div></div>
            </div>
        </div>
        <div className="Ct-con2">
            <div className="Ct-con2-header">
                <h1>Test Details</h1>
                <div onClick={() => Back()} id="backbt"><FontAwesomeIcon icon={faArrowRightFromBracket}/></div>
            </div>
            <div className="Ct-con2-content1" id="con1">
                <Ogt isCt = {isCt} TestDetail = {TestDetail}/>
            </div>
            <div className="Ct-con2-content2" id="con2">
                <div className="Ct-con2-content2-scroll">
                    <div className="Ct-con2-content2-1">
                        <h1>Aptitude Questions - {aptiques}</h1>
                        <div onClick={() => AddAptiQues()}>Add Question</div>
                    </div>
                    {aptdata.map((item, index) => {
                        return(
                    <div className="Ct-con2-content2-2" key={index}>
                        <div className="Apt-ques-card">
                            <div className="Apt-ques-box">
                                <div className="Apt-ques-box1">Question</div>
                                <div className="Apt-ques-box2">
                                    <textarea defaultValue={item.question} className='aptiques'></textarea>
                                </div>
                            </div>
                            <div className="Apt-opt-box">
                                <div className="Apt-opt-box1">
                                    <div className="Apt-opt-box1-head">Option 1</div>
                                    <div className="Apt-opt-box1-content">
                                        <input className="Apt-input aptop1" type="text" defaultValue={item.options[0]}></input>
                                    </div>
                                </div>
                                <div className="Apt-opt-box2">
                                    <div className="Apt-opt-box1-head">Option 2</div>
                                    <div className="Apt-opt-box1-content">
                                        <input className="Apt-input aptop2" type="text" defaultValue={item.options[1]}></input>
                                    </div>
                                </div>
                                <div className="Apt-opt-box3">
                                    <div className="Apt-opt-box1-head">Option 3</div>
                                    <div className="Apt-opt-box1-content">
                                        <input className="Apt-input aptop3" type="text" defaultValue={item.options[2]}></input>
                                    </div>
                                </div>
                                <div className="Apt-opt-box4">
                                    <div className="Apt-opt-box1-head">Option 4</div>
                                    <div className="Apt-opt-box1-content">
                                        <input className="Apt-input aptop4" type="text" defaultValue={item.options[3]}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="Apt-ans-box">
                                <div className="Apt-ans-box2">
                                    <div className="Apt-ans-box2-head">Answer</div>
                                    <div className="Apt-ans-box2-content">
                                        <input className="Apt-input aptans" type="number" defaultValue={item.answer}></input>
                                    </div>
                                </div>
                                <div className="Apt-ans-box1">
                                    <div className="Apt-edi-bt edibt" onClick={() => EditClick(index)}><FontAwesomeIcon icon={faPenToSquare}/></div>
                                    <div className="Apt-sav-bt savbt" onClick={() => SaveClick(index, item._id)}><FontAwesomeIcon icon={faFloppyDisk}/></div>
                                    <div className="Apt-can-bt canbt" onClick={() => CancelClick(index)}><FontAwesomeIcon icon={faBan}/></div>
                                    <div className="Apt-del-bt delbt" onClick={() => DeleteAptQues(index, item._id)}><FontAwesomeIcon icon={faTrash}/></div>
                                </div>
                            </div>
                        </div>
                        <div className="spacer">n</div>
                    </div>
                    )
                    })}
                    <div className="Ct-con2-content2-3">
                        <h1>Coding Questions - {codques}</h1>
                        <div onClick={() => AddCodQues()}>Add Question</div>
                    </div>
                    {coddata.map((coditem, index) => {
                        return(
                    <div className="Ct-con2-content2-4" key={index}>
                        <div className="Apt-ques-card">
                            <div className="Apt-ques-box">
                                <div className="Apt-ques-box1">Question</div>
                                <div className="Apt-ques-box2">
                                    <textarea className="codques" defaultValue={coditem.question}></textarea>
                                </div>
                            </div>
                            <div className="Cod-con-box">
                                <div className="Cod-con-box1">
                                    <div className="Cod-con-box1-head">Constraints</div>
                                    <div className="Cod-con-box1-content">
                                        <input className="Apt-input codconst" type="text" placeholder="Constraints" defaultValue={coditem.constraints}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="Cod-pub-box">
                                <div className="Cod-pub-box1">
                                    <div className="Cod-pub-box11">Public Testcase</div>
                                    <div className="Cod-pub-box12">
                                        <div className="pubaddmore" onClick={() => AddPubTC(index)}>Add More</div>
                                    </div>
                                </div>
                            </div>     
                            {coditem.sampleTestCases.map((stc, stcindex) => {
                                return(
                            <div className="Cod-pub-box2" key={stcindex}>
                                <div className="Cod-pub-box21">
                                    <div className="Cod-pub-box211">Input</div>
                                    <div className="Cod-pub-box212">
                                        <input className={`Apt-input codpubtci${index}`} type="text" placeholder="Input" defaultValue={stc.input}></input>
                                    </div>
                                    <div className={`Cod-pub-box213 tempubtc${index}`}><FontAwesomeIcon icon={faCircleXmark} onClick={() => RemPubTC(index, stcindex)}/></div>
                                </div>
                                <div className="Cod-pub-box22">
                                    <div className="Cod-pub-box211">Output</div>
                                    <div className="Cod-pub-box212">
                                        <input className={`Apt-input codpubtco${index}`} type="text" placeholder="Output" defaultValue={stc.output}></input>
                                    </div>
                                </div>
                            </div>   
                            )
                            })}       
                            <div className="Cod-pub-box">
                                <div className="Cod-pub-box1">
                                    <div className="Cod-pub-box11">Hidden Testcase</div>
                                    <div className="Cod-pub-box12">
                                        <div className="hidaddmore" onClick={() => AddhidTC(index)}>Add More</div>
                                    </div>
                                </div>
                            </div>     
                            {coditem.hiddenTestCases.map((htc, htcindex) => {
                                return(
                            <div className="Cod-pub-box2" key={htcindex}>
                                <div className="Cod-pub-box21">
                                    <div className="Cod-pub-box211">Input</div>
                                    <div className="Cod-pub-box212">
                                        <input className={`Apt-input codhidtci${index}`} type="text" placeholder="Input" defaultValue={htc.input}></input>
                                    </div>
                                    <div className={`Cod-pub-box213 temhidtc${index}`}><FontAwesomeIcon icon={faCircleXmark} onClick={() => RemHidTC(index, htcindex)}/></div>
                                </div>
                                <div className="Cod-pub-box22">
                                    <div className="Cod-pub-box211">Output</div>
                                    <div className="Cod-pub-box212">
                                        <input className={`Apt-input codhidtco${index}`} type="text" placeholder="Output" defaultValue={htc.output}></input>
                                    </div>
                                </div>
                            </div>   
                            )
                            })}
                            <div className="Cod-bt-box">
                                <div className="Cod-edi-bt codedibt" onClick={() => CodEditClick(index)}><FontAwesomeIcon icon={faPenToSquare}/></div>
                                <div className="Cod-sav-bt codsavbt" onClick={() => CodSaveClick(index, coditem._id)}><FontAwesomeIcon icon={faFloppyDisk}/></div>
                                <div className="Cod-can-bt codcanbt" onClick={() => CodCancelClick(index)}><FontAwesomeIcon icon={faBan}/></div>
                                <div className="Cod-del-bt coddelbt" onClick={() => CodDeleteClick(index, coditem._id)}><FontAwesomeIcon icon={faTrash}/></div>
                            </div>
                        </div>
                        <div className="spacer">n</div>
                    </div>
                    )
                    })}
                </div>
            </div>
        </div>
        </>
    );
}

export default Ct;