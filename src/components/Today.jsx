import React from "react";

const Today = () => {
  return (
    <React.Fragment>
      <div className="left-top">
        <div className="city-name"> city name</div>
        <div className="temperature"> Temperature</div>
      </div>
      <div className="left-bottom-top">
        <div className="dial-temperature">1</div>
        <div className="dial-speed">2</div>
      </div>
      <div className="left-bottom-bottom">
        <div className="dial-humidity">3</div>
        <div className="dial-pressure">4</div>
      </div>
    </React.Fragment>
  );
};

export default Today;
