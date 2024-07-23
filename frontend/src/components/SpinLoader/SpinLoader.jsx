import React from "react";
import { BallTriangle } from "react-loader-spinner";

const SpinLoader = () => {
  return (
    <div style={{
        width:'100%',
        height:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    }}>
      <BallTriangle
        height={80}
        width={80}
        radius={5}
        color="#7879F1"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default SpinLoader;
