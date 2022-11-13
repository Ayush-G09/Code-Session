import React from "react";
import './AddTeacher.css';
import axios from "axios";

var headers = {
    'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`
}

async function Register() {
    var name = document.getElementById('nameid').value;
    var mobile = document.getElementById('mobileid').value;
    var email = document.getElementById('emailid').value;
    var password = document.getElementById('passid').value;
    var conpass = document.getElementById('conpassid').value;
    var MobileRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    var EmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var PassRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/;
    var data = {fullName: name, contact: mobile, emailID: email, password: password, confirmPassword: conpass}
    if(name === '')
    {
        alert('Please enter name');
    }
    else
    {
        if(mobile === '')
        {
            alert('Enter mobile number');
        }
        else
        {
            if(mobile.match(MobileRegex))
            {
                if(email === '')
                {
                    alert('Enter email.')
                }
                else
                {
                    if(email.match(EmailRegex))
                    {
                        if(password === '' || conpass === '')
                        {
                            alert('Enter password.')
                        }
                        else
                        {
                            if(conpass.match(PassRegex) && password.match(PassRegex))
                            {
                                if(password === conpass)
                                {
                                    console.log(data)
                                    const request = await axios.post('https://code-sessions-backend.onrender.com/addTeacher', data, {headers: headers});
                                    if(request.status === 200)
                                    {
                                        alert('Teacher added.');
                                        document.getElementById('nameid').value = '';
                                        document.getElementById('mobileid').value = '';
                                        document.getElementById('emailid').value = '';
                                        document.getElementById('passid').value = '';
                                        document.getElementById('conpassid').value = '';
                                    }
                                    else
                                    {
                                        alert('error');
                                    }
                                }
                                else
                                {
                                    alert(`Password does't match.`);
                                }
                            }
                            else
                            {
                                alert('Enter strong password.')
                            }
                        }
                    }
                    else
                    {
                        alert('Enter correct email.')
                    }
                }
            }
            else
            {
                alert('Enter correct mobile number.');
            }    
        }
    }
}

function At() {
    return(
        <div className="At-con">
            <div className="At-header">
                <h1>Add Teacher</h1>
            </div>
            <div className="At-Content">
                <div className="At-f1">
                    <div className="At-f11">
                        <div className="At-f111"><h1>Full Name</h1></div>
                        <div className="At-f112"><h1>Mobile Number</h1></div>
                    </div>
                    <div className="At-f12">
                        <div className="At-f121">
                            <input className="At-inputbox" type="text" placeholder="First & Last Name" id="nameid"/>
                        </div>
                        <div className="At-f122">
                            <input className="At-inputbox" type="text" placeholder="Mobile Number" id="mobileid"/>
                        </div>
                    </div>
                </div>
                <div className="At-f2">
                    <div className="At-f21">
                        <div className="At-f211"><h1>Email</h1></div>
                    </div>
                    <div className="At-f22">
                    <div className="At-f221">
                            <input className="At-inputboxe" type="text" placeholder="Email" id="emailid"/>
                        </div>
                    </div>
                </div>
                <div className="At-f3">
                    <div className="At-f11">
                        <div className="At-f111"><h1>Password</h1></div>
                        <div className="At-f112"><h1>Confirm Password</h1></div>
                    </div>
                    <div className="At-f12">
                        <div className="At-f121">
                            <input className="At-inputbox" type="Password" placeholder="Password" id="passid"/>
                        </div>
                        <div className="At-f122">
                            <input className="At-inputbox" type="Password" placeholder="Confirm Password" id="conpassid"/>
                        </div>
                    </div>
                </div>
                <div className="At-f4">
                    <div onClick={() => Register()}>Submit</div>
                </div>
            </div>
        </div>
    );
}

export default At;