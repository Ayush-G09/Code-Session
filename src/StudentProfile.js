import React, { useEffect, useState } from 'react';
import './StudentProfile.css';
import { faPenToSquare, faFloppyDisk, faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

function StudentProfile(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [roll, setRoll] = useState('');
    const [batch, setBatch] = useState('');
    const [branch, setBranch] = useState('');
    const [contact, setcontact] = useState('');

    if(sessionStorage.getItem('jwt') === null)
    {
        sessionStorage.setItem('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxhdGlrYXBhaTE5QHN2dnYuZWR1LmluIiwicm9sZSI6InN0dWRlbnQiLCJpZCI6IldmSWRxOXR3a3IxaUFXRjh6UzVXWCIsImlhdCI6MTY3MDE4NTg1NywiZXhwIjoxNjcwNzkwNjU3fQ.W34ITLEK_DlIiV4BKpvKVE41-0DS0bcCwjYPDXbKMOI')
    }

    var headers = {
        'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`
    }

    async function ShowPerInfo() {
        var data = {email : 'latikapai19@svvv.edu.in'};
        const request = await axios.post('https://code-sessions-backend.onrender.com/showPersonalInfo', data, {headers: headers});
        console.log(request.data.check);
        setName(request.data.check.fullName);
        setEmail(request.data.check.emailID);
        setRoll(request.data.check.enrollmentNo);
        setBatch(request.data.check.batch);
        setBranch(request.data.check.branch);
        setcontact(request.data.check.contact);
        sessionStorage.setItem('stuid', request.data.check._id);
        sessionStorage.setItem('name', request.data.check.fullName);
    }
    
    function EditClick() {
        var edi = document.getElementById('editbt');
        var sav = document.getElementById('savebt');
        var can = document.getElementById('cancbt');
        var roll = document.getElementById('rollid');
        var batch = document.getElementById('batchid');
        var branch = document.getElementById('branchid');
        var contact = document.getElementById('contactid');
        roll.style.pointerEvents = 'all';
        batch.style.pointerEvents = 'all';
        branch.style.pointerEvents = 'all';
        contact.style.pointerEvents = 'all';
        edi.style.display = 'none';
        sav.style.display = 'flex';
        can.style.display = 'flex';
    }

    async function SaveClick() {
        var edi = document.getElementById('editbt');
        var sav = document.getElementById('savebt');
        var can = document.getElementById('cancbt');
        var roll = document.getElementById('rollid');
        var batch = document.getElementById('batchid');
        var branch = document.getElementById('branchid');
        var contact = document.getElementById('contactid');
        var MobileRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if(roll.value === '')
        {
            alert('Enter roll number.');
        }
        else
        {
            if(batch.value === '')
            {
                alert('Enter batch.');
            }
            else
            {
                if(branch.value === '')
                {
                    alert('Enter branch.');
                }
                else
                {
                    if(contact.value === '')
                    {
                        alert('Enter contact number.');
                    }
                    else
                    {
                        if(contact.value.match(MobileRegex))
                        {
                            var data =  {email : email, rollNo : roll.value, batch : batch.value, branch : branch.value, contact : contact.value}
                            const request = await axios.post('https://code-sessions-backend.onrender.com/addPersonalInfo', data);
                            if(request.status === 200)
                            {
                                roll.style.pointerEvents = 'none';
                                batch.style.pointerEvents = 'none';
                                branch.style.pointerEvents = 'none';
                                contact.style.pointerEvents = 'none';
                                edi.style.display = 'flex';
                                sav.style.display = 'none';
                                can.style.display = 'none';
                                setRoll(roll);
                                setBatch(batch);
                                setBranch(branch);
                                setcontact(contact);
                            }
                            else
                            {
                                alert('Error')
                            }
                        }
                        else
                        {
                            alert('Enter correct mobile number.')
                        }
                    }
                }
            }
        }
    }

    function CancelClick() {
        var edi = document.getElementById('editbt');
        var sav = document.getElementById('savebt');
        var can = document.getElementById('cancbt');
        var Roll = document.getElementById('rollid');
        var Batch = document.getElementById('batchid');
        var Branch = document.getElementById('branchid');
        var Contact = document.getElementById('contactid');
        Roll.value = roll;
        Batch.value = batch;
        Branch.value = branch;
        Contact.value = contact;
        Roll.style.pointerEvents = 'none';
        Batch.style.pointerEvents = 'none';
        Branch.style.pointerEvents = 'none';
        Contact.style.pointerEvents = 'none';
        edi.style.display = 'flex';
        sav.style.display = 'none';
        can.style.display = 'none';
    }

    if(props.isl)
    {
        ShowPerInfo();
    }
    else
    {
        if(name === '')
        {
            setName(props.n);
            setEmail(props.e);
        }
    }

  return (
    <>
    <div className="Sp-con1">
        <div className='Sp-con1-header'>
            <h1>Personal Information</h1>
            <div className='Sp-con1-edibt' id='editbt' onClick={() => EditClick()}><FontAwesomeIcon icon={faPenToSquare}/></div>
            <div className='Sp-con1-savbt' id='savebt' onClick={() => SaveClick()}><FontAwesomeIcon icon={faFloppyDisk}/></div>
            <div className='Sp-con1-canbt' id='cancbt' onClick={() => CancelClick()}><FontAwesomeIcon icon={faBan}/></div>
        </div>
        <div className='Sp-con1-content'>
            <div className='circle1'></div>
            <div className='Sp-con1-content-box'>
                <div className='Sp-con1-content-box-head'>Name</div>
                <input className='Sp-input' type='text' defaultValue={name}></input>
            </div>
            <div className='Sp-con1-content-box'>
                <div className='Sp-con1-content-box-head'>Email</div>
                <input className='Sp-input' type='text' defaultValue={email}></input>
            </div>
            <div className='Sp-con1-content-box'>
                <div className='Sp-con1-content-box-head'>Roll No</div>
                <input className='Sp-input' type='text' defaultValue={roll} id='rollid'></input>
            </div>
            <div className='Sp-con1-content-box'>
                <div className='Sp-con1-content-box-head'>Batch</div>
                <input className='Sp-input' type='text' defaultValue={batch} id='batchid'></input>
            </div>
            <div className='Sp-con1-content-box'>
                <div className='Sp-con1-content-box-head'>Branch</div>
                <input className='Sp-input' type='text' defaultValue={branch} id='branchid'></input>
            </div>
            <div className='Sp-con1-content-box'>
                <div className='Sp-con1-content-box-head'>Contact</div>
                <input className='Sp-input' type='text' defaultValue={contact} id='contactid'></input>
            </div>
        </div>
    </div>
    <div className='Sp-con2'>
        <div className='Sp-con2-box1'>
            <img className='Sp-con-box1-logo' src='https://p.kindpng.com/picc/s/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png'></img>
        </div>
        <div className='Sp-con-box1-name'>{name}</div>
    </div>
    </>
  )
}

export default StudentProfile;