import React from 'react';
import { useState , useRef} from 'react';

function TimerChallenge({title , targetTime}) {

    const [timerstarted , setTimerStarted] = useState(false);
    const [timerExpired , setTimerExpired] = useState(false);

    const timer = useRef();

    function handleStart(){
        setTimerStarted(true);
       timer.current = setTimeout(() => {
            setTimerExpired(true);
        }, targetTime*1000);
    }

    function handleStop(){
        
        clearTimeout(timer.current);
        setTimerStarted(false);
        
    }

    return (
        <section className='challenge'>
            <h2>{title}</h2>
            {timerExpired && <p>You lost</p>}
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's' : ''}
            </p>
            <p>
                <button onClick={timerstarted? handleStop : handleStart}>
                 {timerstarted ? 'Stop' : 'Start'} Challenge
                </button>
            </p>
            <p className={timerstarted ? 'active' : undefined}>
                {timerstarted? 'Time is Running' : 'Timer inactive'} / 
            </p>

        </section>
    );
}

export default TimerChallenge;