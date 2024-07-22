import { useState, useEffect } from "react";
import "./Nft.scss";
import { useStore } from "../../context/StoreContext";
import CERTI from "../../assets/certifi.jpeg";
import POLY from "../../assets/polygon.png";
import { baseUrl } from "../../constant";

const Nft = () => {
  const { wallet } = useStore();
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCerti = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${baseUrl}/cert/${wallet}`, {
          method: "get",
          headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch certificates");
        }
        const result = await response.json();
        console.log(result)
        setCertificates(result.nfts);
      } catch (err) {
        console.error(err);
        setError("Failed to load certificates. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCerti();
  }, []);

  const handleViewCertificate = (certId) => {
    // Implement view certificate functionality
    console.log(`Viewing certificate ${certId}`);
  };

  const handleViewOnPolygonscan = (certId) => {
    // Implement view on Polygonscan functionality
    console.log(`Viewing certificate ${certId} on Polygonscan`);
  };

  if (isLoading) return <div>Loading certificates...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="nft-page">
      <div className="sec-head">My certificates</div>
      <div className="nft-list">
        {certificates.map((cert, index) => (
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
    </div>
  );
};

export default Nft;
