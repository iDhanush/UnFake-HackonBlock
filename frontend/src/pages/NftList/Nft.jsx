import "./Nft.scss";

import CERTI from "../../assets/certifi.jpeg";
import POLY from "../../assets/polygon.png";

const Nft = () => {
  return (
    <div className="nft-page">
      <div className="sec-head">My certificates</div>
      <div className="nft-list">
        <div className="nft-card">
          <div className="card-top">
            <img src={POLY} alt="" />
          </div>
          <div className="certi-container">
            <img src={CERTI} className="certi-img" />
            <div className="view-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={19}
                fill="none"
              >
                <path
                  fill="#DAC50B"
                  d="m9 .5 2.43 6.57L18 9.5l-6.57 2.43L9 18.5l-2.43-6.57L0 9.5l6.57-2.43z"
                />
              </svg>
              view certificate
            </div>
          </div>

          <div className="card-name">certificate</div>
          <div className="view-poly-btn">view on polygonscan</div>
        </div>
        <div className="nft-card">
          <div className="card-top">
            <img src={POLY} alt="" />
          </div>
          <div className="certi-container">
            <img src={CERTI} className="certi-img" />
            <div className="view-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={19}
                fill="none"
              >
                <path
                  fill="#DAC50B"
                  d="m9 .5 2.43 6.57L18 9.5l-6.57 2.43L9 18.5l-2.43-6.57L0 9.5l6.57-2.43z"
                />
              </svg>
              view certificate
            </div>
          </div>

          <div className="card-name">certificate</div>
          <div className="view-poly-btn">view on polygonscan</div>
        </div>
      </div>
    </div>
  );
};

export default Nft;
