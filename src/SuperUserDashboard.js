import React, { useEffect, useState } from "react";
import './SuperUserDashboard.css';
import Navigation from "./Nav";
import Bbar from "./Bbar";
import Ogt from "./OngoingTest";
import Ct from "./CreateTest";
import At from "./AddTeacher";
import StudentProfile from "./StudentProfile";
import StudentTest from "./StudentTest";

function SuperUserDashboard() {

    const [ongoingTest, setOngoingTest] = useState(true);
    const [createTest, setCreateTest] = useState(false);
    const [addTeacher, setAddTeacher] = useState(false);
    const [studPro, setStudPro] = useState(true);
    const [aTest, setaTest] = useState(false);
    const [role, setRole] = useState("student");
    const [name, setName] = useState("");

    var isValid = true;
    var login = true;
    var na = "Ayush Gokhle";
    var email = "ayushgai19@svvv.edu.in";

    useEffect(() => {
        if(sessionStorage.getItem("setrole") === "true")
        {
            sessionStorage.setItem("setrole", "false");
            setRole(sessionStorage.getItem("role"));
        }
        if(sessionStorage.getItem("role") === "superUser")
        {
            setName('SuperUser');
        }
    })

    const ActiveOgt = () => {
        setOngoingTest(true);
        setCreateTest(false);
        setAddTeacher(false);
    }

    const ActiveCt = () => {
        setOngoingTest(false);
        setCreateTest(true);
        setAddTeacher(false);
    }
 
    const ActiveAt = () => {
        setOngoingTest(false);
        setCreateTest(false);
        setAddTeacher(true);
    }

    const ActiveSp = () => {
        setStudPro(true);
        setaTest(false);
    }

    const ActiveT = () => {
        setStudPro(false);
        setaTest(true);
    }

    return(
        <>
        <Navigation n = {name}/>
        <div className="sud-con">
            <Bbar ogt = {ActiveOgt} ct = {ActiveCt} at = {ActiveAt} role = {role} Sp = {ActiveSp} T = {ActiveT} isv = {isValid} l = {login}/>
            { ongoingTest && role !== "student" ? <Ogt isT={true}/> : null }
            { createTest && role !== "student"  ? <Ct/> : null }
            { addTeacher && role !== "student"  ? <At/> : null } 
            { studPro && role === "student" ? <StudentProfile isl = {login} n = {na} e = {email}/> : null}
            { aTest && role === "student" ? <StudentTest/> : null}
        </div>
        </>
    );
}

export default SuperUserDashboard;