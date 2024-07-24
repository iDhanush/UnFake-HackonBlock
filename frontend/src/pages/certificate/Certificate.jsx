import React, { useEffect } from "react";

import "./Certificate.scss";
import { useStore } from "../../context/StoreContext";

const Certificate = () => {
  const {certiId}=useStore()
  return (
    <div className="certi-wrapper">
      <img className="certificate" src={`${certiId}`} alt=""></img>
      <a className="cssas-io-button" href={`${certiId}`} download={true} >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={32}
          height={32}
          fill="none"
        >
          <path
            fill="#fff"
            d="M20.347 29.667h-8.694c-6.546 0-9.346-2.8-9.346-9.347v-.173c0-5.92 2.333-8.774 7.56-9.267.533-.04 1.04.36 1.093.907a1 1 0 0 1-.907 1.093c-4.186.387-5.746 2.36-5.746 7.28v.173c0 5.427 1.92 7.347 7.346 7.347h8.694c5.426 0 7.346-1.92 7.346-7.347v-.173c0-4.947-1.586-6.92-5.853-7.28a1 1 0 0 1-.907-1.08.99.99 0 0 1 1.08-.907c5.307.454 7.68 3.32 7.68 9.28v.174c0 6.52-2.8 9.32-9.346 9.32"
          />
          <path
            fill="#fff"
            d="M16 20.84c-.547 0-1-.453-1-1V2.667c0-.547.453-1 1-1s1 .453 1 1V19.84c0 .56-.453 1-1 1"
          />
          <path
            fill="#fff"
            d="M16 22.333a1 1 0 0 1-.707-.293l-4.466-4.467a1.006 1.006 0 0 1 0-1.413 1.006 1.006 0 0 1 1.413 0L16 19.92l3.76-3.76a1.006 1.006 0 0 1 1.413 0 1.006 1.006 0 0 1 0 1.413l-4.466 4.467a1 1 0 0 1-.707.293"
          />
        </svg>
        Download certificate
      </a>
    </div>
  );
};

export default Certificate;
