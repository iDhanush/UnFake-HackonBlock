import React, { useEffect, useState } from "react";
import "./Home.scss";
import Tabs from "../../components/Tabs/Tabs";

import IMG from '../../assets/heroimg.png'
const Home = () => {
  return (
    <div className="home">
      <div className="sec-1">
        <h1 className="main-txt">
          Spot the <span className="grad">Truth</span> : Unmasking <br></br>
          Deepfakes Media
        </h1>

        <Tabs />
      </div>
      <div className="img-sec">
        <img src={IMG} className="main-img" alt="" />
      </div>
    </div>
  );
};

export default Home;
