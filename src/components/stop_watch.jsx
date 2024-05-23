import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaUndo, FaTrash } from "react-icons/fa";

export default function StopwatchApp() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      const startTime = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]);
  };

  const handleAddLap = () => {
    if (isRunning) {
      setLaps([...laps, elapsedTime]);
    }
  };

  const handleClearLaps = () => {
    setLaps([]);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="container mx-auto my-3 p-4 max-w-md bg-gray-100 rounded-lg h-[436px]">
      <h1 className="flex items-center justify-center text-2xl font-semibold mb-4 text-gray-800">
        Stopwatch
      </h1>
      <div className="flex items-center justify-center text-xl font-bold mb-6">
        {formatTime(elapsedTime)}
      </div>
      <div className="flex justify-center mb-7 mt-8">
        <button
          onClick={handleStartStop}
          className={`flex items-center justify-center w-20 h-20 bg-black hover:bg-blue-600 text-white rounded-full focus:outline-none mr-4`}
        >
          {isRunning ? (
            <FaPause className="text-xl" />
          ) : (
            <FaPlay className="text-xl" />
          )}
        </button>
        <button
          onClick={handleReset}
          className="flex items-center justify-center w-20 h-20 bg-black hover:bg-red-600 text-white rounded-full focus:outline-none"
        >
          <FaUndo className="text-2xl" />
        </button>
      </div>
      <div className="flex justify-center mb-4 ">
        <button
          onClick={handleAddLap}
          className="text-sm text-gray-700 hover:text-black focus:outline-none mr-4 font-semibold"
          disabled={!isRunning}
        >
          Add Lap
        </button>
        <button
          onClick={handleClearLaps}
          className="text-sm text-gray-700 hover:text-black focus:outline-none font-semibold pl-6"
          disabled={laps.length === 0}
        >
          Clear Laps
        </button>
      </div>
      <ul className="mt-8 overflow-y-auto max-h-20 no-scrollbar  pt-2 ">
        {laps.map((lap, index) => (
          <li
            key={index}
            className="text-sm text-gray-800 pl-20 bg-white shadow-sm"
          >
            Lap {index + 1}: {formatTime(lap)}
          </li>
        ))}
      </ul>
    </div>
  );
}
