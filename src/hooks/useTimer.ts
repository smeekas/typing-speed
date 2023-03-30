import React, { useEffect, useRef, useState } from 'react'
import { TOTAL_SECONDS } from '../utils/constants';
type TimerState = "start" | "active" | "finish"
function useTimer() {
    const [time, setTime] = useState(TOTAL_SECONDS);
    const [timerState, setTimerState] = useState<TimerState>("start");
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    // const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const startTimer = () => {
        setTimerState("active")
        // console.log("Stat")
        intervalRef.current = setInterval(() => {
            // console.log(time-1)
            setTime((prev) => prev - 1)
        }, 1000)
    }
    const resetTimer = () => {
        if (intervalRef.current) {
            setTimerState("finish")
            clearInterval(intervalRef.current);
        }
    }
    const restart = () => {
        setTimerState('start');
        if (intervalRef.current) clearInterval(intervalRef.current)
        setTime(TOTAL_SECONDS);
    }
    useEffect(() => {
        if (time === 0) {
            resetTimer()
        }
    }, [time])
    return { time, startTimer, resetTimer, timerState, restart };
}

export default useTimer