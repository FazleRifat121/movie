import React from "react";
import "./loading.css";
const Loading = () => {
  return (
    <div>
      <div className="loader">
        <div className="intern"></div>
        <div className="external-shadow">
          <div className="central"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
