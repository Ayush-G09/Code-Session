import React from "react";
import './Bbar.css';
import { faBarsProgress, faPlus, faAddressCard, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Bbar(props) {

    return(
        <>
        <div className="Bbar-con">
            <div className="Bbar">
                {props.role === "superUser" || props.role === "teacher" ?
                    <>
                    <div className="Bbar-b1" onClick={props.ogt}>
                        <div className="Bbar-b11">
                            <FontAwesomeIcon icon={faBarsProgress} />
                        </div>
                        <div className="Bbar-b12">
                            <h1>Scheduled Test</h1>
                        </div>
                    </div>
                    <div className="Bbar-b2" onClick={props.ct}>
                        <div className="Bbar-b11">
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                        <div className="Bbar-b12">
                            <h1>Create Test</h1>
                        </div>
                    </div>
                    </>
                : null }
                {props.role === "superUser" ?
                    <div className="Bbar-b3" onClick={props.at}>
                        <div className="Bbar-b11">
                            <FontAwesomeIcon icon={faAddressCard} />
                        </div>
                        <div className="Bbar-b12">
                            <h1>Add Teacher</h1>
                        </div>
                    </div>
                : null }
                {props.role === "student" ?
                    <>
                    {props.isv ? 
                    <div className="Bbar-b1" onClick={props.Sp}>
                        <div className="Bbar-b11">
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <div className="Bbar-b12">
                            <h1>Profile</h1>
                        </div>
                    </div>
                    : null
                    }
                    {props.isv && props.l ? 
                    <div className="Bbar-b2" onClick={props.T}>
                        <div className="Bbar-b11">
                            <FontAwesomeIcon icon={faBarsProgress} />
                        </div>
                        <div className="Bbar-b12">
                            <h1>Test</h1>
                        </div>
                    </div>
                    : null
                    }
                    </>
                : null }
            </div>
        </div>
        </>
    );
}

export default Bbar;