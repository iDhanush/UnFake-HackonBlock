import React, { useEffect, useState } from "react";
import "./Home.scss";
import Tabs from "../../components/Tabs/Tabs";

const Home = () => {
  return (
    <div className="home">
      <div className="sec-1">
        <h1 className="main-txt">
          Spot the <span className="grad">Truth</span> : Unmasking <br></br>
          Deepfakes Media
        </h1>
      </div>
      <div className="sec-2">
        <Tabs />
      </div>
    </div>
  );
};

export default Home;
