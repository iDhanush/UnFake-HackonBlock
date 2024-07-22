import React from "react";
import GIF from "../../assets/loader.gif";
import "./Loader.scss";

import { ProgressBar } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loader">
      <img className="loading-effect" src={GIF} alt="" />
      <ProgressBar
        visible={true}
        height="80"
        width="80"
        color="#333"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        borderColor="#10100d"
        barColor="#bcbcc6"
      />
    </div>
  );
};

export default Loader;
