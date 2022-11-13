import React, { forwardRef, useImperativeHandle } from 'react';
import './Message.css';
import { faXmark, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Message = (() => {

    
      function  GreenOpen() {
            var element = document.getElementById("M-con");
            var mb1 = document.getElementById("M-b1");
            var mb3 = document.getElementById("M-b3");
            element.style.boxShadow = "0px 0px 3px 0px green";
            mb1.style.backgroundColor = "green";
            mb3.style.backgroundColor = "green";
            element.classList.toggle("M-con-active");
        }

      function  RedOpen() {
            var element = document.getElementById("M-con");
            var mb1 = document.getElementById("M-b1");
            var mb3 = document.getElementById("M-b3");
            element.style.boxShadow = "0px 0px 3px 0px red";
            mb1.style.backgroundColor = "red";
            mb3.style.backgroundColor = "red";
            element.classList.toggle("M-con-active");
        }

      function  YellowOpen() {
            var element = document.getElementById("M-con");
            var mb1 = document.getElementById("M-b1");
            var mb3 = document.getElementById("M-b3");
            element.style.boxShadow = "0px 0px 3px 0px yellow";
            mb1.style.backgroundColor = "yellow";
            mb3.style.backgroundColor = "yellow";
            element.classList.toggle("M-con-active");
        }
    
    return (
        <>
        <div className="M-con" id='M-con'>
            <div className='M-b1' id='M-b1'>
                <FontAwesomeIcon icon={faXmark}/>
            </div>
            <div className='M-b2'>
                <span>b nkj kjshndci soduhcijsdn jncojsdn ikndcon  jnsdicn uhniusdcn jnsd </span>
            </div>
            <div className='M-b3' id='M-b3'>
                <FontAwesomeIcon icon={faEllipsisVertical}/>
            </div>
        </div>
        </>
    )
})

export default Message;