import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS

export default function MobileNavBar() {
  
    const [currentTime, setCurrentTime] = useState(new Date());
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000); // Update every second
  
      // Clear interval on component unmount
      return () => clearInterval(interval);
    }, []); // Run effect only once on component mount
  
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
  
    const formattedTime = `${hours > 9 ? hours : `0${hours}`}:${minutes > 9 ? minutes : `0${minutes}`}`;
  return (
    <div className="w-full max-w-[480px] flex justify-between  items-center bottom-14">
      <div className="flex items-center space-x-2">
        <span className="text-sm">{formattedTime}</span>
        <i className="fas fa-clock fa-xs"></i>
      </div>
      <div className="flex items-center space-x-2">
        <i className="fas fa-signal fa-xs"></i>
        <i className="fas fa-wifi fa-xs"></i>
        <i className="fas fa-battery-three-quarters fa-xs"></i>
      </div>
    </div>
  );
}
