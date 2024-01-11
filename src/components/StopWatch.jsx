import React, { useState, useEffect } from "react";

const Stopwatch = ({ stopwatchClickTime, buttonVal, index, setTaskArr, taskArr }) => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        if (buttonVal !== 'start') {

            const interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);

            return () => clearInterval(interval);
        } else if(buttonVal === 'start') {
            debugger
        }
    }, []);



    const formatTime = (givenTime) => {


        const givenTimeDate = new Date(givenTime);

        // Get the difference in milliseconds between the current time and the given time.
        const timeDifferenceInMilliseconds = Date.now() - givenTimeDate.getTime();

        // Convert the difference in milliseconds to seconds.
        const timeDifferenceInSeconds = timeDifferenceInMilliseconds / 1000;

        // Calculate the hours, minutes, and seconds from the difference in seconds.
        const hours = Math.floor(timeDifferenceInSeconds / 3600);
        const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);
        const seconds = timeDifferenceInSeconds % 60;

        // Format the hours, minutes, and seconds in HH:MM:SS format.
        let timeDifferenceInHHMMSSFormat = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${parseInt(seconds.toString())}`;

       
        return timeDifferenceInHHMMSSFormat;

        /* let hours, minutes, seconds

        hours = Math.floor(time / 3600);
        minutes = Math.floor((time % 3600) / 60);
        seconds = time % 60;


        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`; */
    };

    return (
        <div>
            <div style={{ width: '100px' }}>{formatTime(stopwatchClickTime)}</div>
        </div>
    );
};

export default Stopwatch;