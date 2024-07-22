import React from "react";
import "./Tabs.scss";
import LinkTab from "./LinkTab/LinkTab";
import FileTab from "./FileTab/FileTab";

import { useState } from "react";

const Tabs = ({ finalResult, setFinalResult }) => {
  const [isSelected, setIsSelected] = useState(1);
  return (
    <div className="box">
      <div className="top-box">
        <div
          onClick={() => setIsSelected(1)}
          className={isSelected === 1 ? "tab highlight" : "tab"}
        >
          Video
        </div>
        <div
          onClick={() => setIsSelected(2)}
          className={isSelected === 2 ? "tab highlight" : "tab"}
        >
          Youtube
        </div>
        <div
          onClick={() => setIsSelected(3)}
          className={isSelected === 3 ? "tab highlight" : "tab"}
        >
          Instagram
        </div>
        <div
          onClick={() => setIsSelected(4)}
          className={isSelected === 4 ? "tab highlight" : "tab"}
        >
          Twitter
        </div>
      </div>
      <div className="bottom-box">
        {isSelected === 1 && <FileTab />}
        {isSelected === 2 && <LinkTab />}
        {isSelected === 3 && <LinkTab />}
        {isSelected === 4 && <LinkTab />}
      </div>
    </div>
  );
};

export default Tabs;
