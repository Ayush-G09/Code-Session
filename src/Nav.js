import React from "react";
import './Nav.css';
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

function Navigation(props) {
    let nav = useNavigate();

    return(
        <div className="header">
            <div className="header-content">
                <h1>Code Sessions</h1>
            </div>
            <div className="header-profile">
                <div className="profile-logo">
                    <FontAwesomeIcon icon={faUser}/>
                </div>
                <div className="proflie-name">
                    <h2>Hi {props.n}</h2>
                </div>
                <div className="logout">
                    <FontAwesomeIcon icon={faRightFromBracket} onClick={() => nav('/')}/>
                </div>
            </div>
        </div>
    );
}

export default Navigation;