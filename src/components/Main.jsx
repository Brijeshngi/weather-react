import React from "react";
import Navbar from "./Navbar";
import Today from "./Today";
import Tomorrow from "./Tomorrow";
import Forcast from "./Forcast";

const Main = () => {
  return (
    <React.Fragment>
      <div className="content-main">
    
        <Navbar />
        <div className="content-main-content">
          <div className="content-main-left">
            <Today />
            <Tomorrow/>
            <Forcast/>
          </div>
          <div className="content-main-right">
          Rain data
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Main;
