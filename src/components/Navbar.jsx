import React from "react";

const Navbar = () => {
  return (
    <div>
      <div className="navbar">
        <div className="navbar-start">
          <button>Today</button>
          <button> Tomorrow</button>
          <button> Next 10 Days</button>
        </div>
        <div className="navbar-end">
          <button> Air Quality</button>
          <button>Chance of Rain</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
