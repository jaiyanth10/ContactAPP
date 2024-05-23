import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS

export default function BottomNavBar({
  setApp,
  onBg,
  setBg,
  setCalci,
  setStop_watch,
}) {
  return (
    <div className="w-full max-w-[480px] flex justify-between items-center shadow-md">
      <div className="flex justify-start ml-6 w-1/3">
        <button
          className="flex items-center space-x-2"
          onClick={() => {
            setStop_watch(false);
            setCalci(false);
            setBg(false);
            setApp(0);
          }}
        >
          <i className="fas fa-arrow-left fa-xs"></i>
        </button>
      </div>
      <div className="flex justify-center w-1/3">
        <button
          className="flex items-center space-x-2"
          onClick={() => {
            setStop_watch(false);
            setCalci(false);
            setBg(false);
            setApp(0);
          }}
        >
          <i className="fas fa-home fa-xs"></i>
        </button>
      </div>
      <div className="flex justify-end mr-6 w-1/3">
        <button className="flex items-center space-x-2" onClick={() => onBg()}>
          <i className="fas fa-bars fa-xs"></i>
        </button>
      </div>
    </div>
  );
}
