import React from "react";

function Loader() {
  return (
    <div className="h-screen flex justify-center items-center">
      <span className="ouro ouro3">
        <span className="left">
          <span className="anim"></span>
        </span>
        <span className="right">
          <span className="anim"></span>
        </span>
      </span>
    </div>
  );
}

export default Loader;
