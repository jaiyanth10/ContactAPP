import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

export default function MobileNavBar() {
  return (
    <div className="w-full max-w-[480px] flex justify-between  items-center bottom-14">
      <div className="flex items-center space-x-2">
        <span className="text-sm">12:45</span>
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
