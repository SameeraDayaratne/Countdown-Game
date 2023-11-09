import React from 'react';
import { forwardRef ,useImperativeHandle , useRef } from 'react';
import { createPortal } from 'react-dom';

const ResultModal =  forwardRef(function ResultModal({targetTime , remainingTime , onReset} , ref) {

    const dialog = useRef();
    let isWon =false;
    let score = 0;

    if(remainingTime <= 0)
    {
        isWon =false;   
    }

    if( remainingTime < targetTime*1000  && remainingTime > 0)
    {
        isWon = true;
        score = ((targetTime*1000 - remainingTime) / (targetTime*1000))*100;
        console.log(score);
    }
    

    useImperativeHandle(ref, ()=>{
        return {
            open (){
                dialog.current.showModal();
            }
        }
    });

    return createPortal(
        <dialog ref={dialog} className='result-modal' onClose={()=> onReset()}>
                <h2>{isWon? `Your Score is ${score}`: 'You lost'}</h2>
                <p>The target time was <strong>{targetTime} seconds</strong> </p>
                <p>You stopped the timer with <strong>{remainingTime/1000} seconds left</strong> </p>
                <form action="dialog">
                    <button onClick={()=> onReset()}>Close</button>
                </form>
        </dialog>,
        document.getElementById("modal")
    );
})

export default ResultModal;