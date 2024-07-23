import { useState, useEffect } from "react";
import "./Nft.scss";
import { useStore } from "../../context/StoreContext";
import CERTI from "../../assets/certifi.jpeg";
import POLY from "../../assets/polygon.png";
import { baseUrl } from "../../constant";
import SpinLoader from "../../components/SpinLoader/SpinLoader";

const Nft = () => {
  const { wallet } = useStore();
  const [certificates, setCertificates] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchCerti = async () => {
      try {
        setLoader(true);
        const response = await fetch(`${baseUrl}/cert/${wallet}`, {
          method: "get",
          headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
          }),
        });
        const result = await response.json();
        console.log(result);
        setCertificates(result.nfts);
        setLoader(false);
      } catch (err) {
        setLoader(false);
        console.error(err);
      }
    };
    fetchCerti();
  }, [wallet]);

  const handleViewCertificate = (certId) => {
    // Implement view certificate functionality
    console.log(`Viewing certificate ${certId}`);
  };

  const handleViewOnPolygonscan = (certId) => {
    // Implement view on Polygonscan functionality
    console.log(`Viewing certificate ${certId} on Polygonscan`);
  };

  return (
    <div className="nft-page">
      {wallet ? (
        <>
          <div className="sec-head">My certificates</div>
          {loader ? (
            <SpinLoader />
          ) : (
            <div className="nft-list">
              {certificates?.map((cert, index) => (
                <div key={index} className="nft-card">
                  <div className="card-top">
                    <img src={POLY} alt="Polygon logo" />
                  </div>
                  <div className="certi-container">
                    <img src={CERTI} className="certi-img" alt="Certificate" />
                    <div
                      className="view-btn"
                      onClick={() => handleViewCertificate(cert.id)}
                    >
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
                  <div className="card-name">{cert.name || "Certificate"}</div>
                  <div
                    className="view-poly-btn"
                    onClick={() => handleViewOnPolygonscan(cert.id)}
                  >
                    view on polygonscan
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="connect-txt">
          Please connect your wallet 😧
        </div>
      )}
    </div>
  );
};

export default Nft;
