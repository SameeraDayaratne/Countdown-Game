import React from 'react';
import { useState , useRef} from 'react';
import ResultModal from './ResultModal';

function TimerChallenge({title , targetTime}) {

    const [timeRemaining , setTimeRemaining] = useState(targetTime*1000);
    
    let timerActive = false;
    const modal = useRef();
    const timer = useRef();


    if(timeRemaining < targetTime*1000 &&  timeRemaining > 0 )
    {
        timerActive = true;
    }
    
    if(timeRemaining <= 0)
    {
        
        modal.current.open();
        clearInterval(timer.current);
        
   
    }

    function handleStart(){
       timer.current = setInterval(() => {
            setTimeRemaining(prev => prev - 10);
            // modal.current.open();
        }, 10);
    }

    function handleReset(){
        setTimeRemaining(targetTime*1000);
    }
    function handleStop(){
        
        clearInterval(timer.current);
       
        modal.current.open();
        
    }

    return (
        <>
            <ResultModal ref={modal} remainingTime={timeRemaining} targetTime={targetTime} onReset={handleReset}></ResultModal>
            <section className='challenge'>
            <h2>{title}</h2>
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's' : ''}
            </p>
            <p>
                <button onClick={timerActive? handleStop : handleStart}>
                 {timerActive ? 'Stop' : 'Start'} Challenge
                </button>
            </p>
            <p className={timerActive ? 'active' : undefined}>
                {timerActive? 'Time ris Running' : 'Timer inactive'} 
            </p>

        </section>
        </>
        

    );
}

export default TimerChallenge;