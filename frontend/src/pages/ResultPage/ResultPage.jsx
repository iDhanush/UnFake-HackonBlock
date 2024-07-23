import "./ResultPage.scss";
import { useStore } from "../../context/StoreContext";

import { Progress } from "rsuite";

import { baseUrl } from "../../constant";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";

const ResultPage = () => {
  const customProgressBarStyle = {
    width: "200px", // Adjust the width of the progress bar
    height: "200px", // Adjust the height of the progress bar
    fontSize: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // Adjust the font size of the progress bar text
  };

  const {
    finalResult,
    setFinalResult,
    certiId,
    setCertiId,
    prediction,
    setPrediction,
    wallet,
    setWallet,
  } = useStore();

  console.log("f", finalResult);
  const navigate = useNavigate();

  const [walletAddress, setWalletAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      setProvider(window.ethereum);
    }
  }, []);

  // console.log(wallet);
  const requestAccount = async () => {
    if (provider) {
      try {
        const accounts = await provider.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
        localStorage.setItem("wallet", accounts[0]);
      } catch (err) {
        console.error("Error:", err);
      }
    } else {
      console.log("MetaMask not detected");
    }
  };
  async function getCerti() {
    // After successful transaction, you can proceed with generating the certificate
    try {
      // Proceed with the transaction
      // const tid = await sendEth(wallet);
      setLoading(true);
      const res = await fetch(`${baseUrl}/mint_certificate/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // transction_id: tid,
          user_address: wallet,
          file_uid: finalResult?.fid,
        }),
      });
      const result = await res.json();
      setCertiId(result.certificate_url);
      console.log(result);
      setLoading(false);
      navigate("/certification");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }
  const sendEth = async (fromAddress) => {
    try {
      const txHash = await provider.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: fromAddress,
            to: "0xf22756f18828b857c8252b4B735907fA9Ba24C9b",
            value: "30000000000000",
            gasLimit: "0x5028",
            maxPriorityFeePerGas: "0x3b9aca00",
            maxFeePerGas: "0x2540be400",
          },
        ],
      });
      console.log("Transaction hash:", txHash);
      return txHash;
    } catch (error) {
      toast.error("Transaction error ❌");
      //return dummy
      console.error("Error sending transaction:", error);
      throw error;
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="result-page">
      <div className="result-wrapper">
        <h1 className="result-head">Analysis</h1>
        <div className="result-grid">
          <div className="result-grid-left">
            <img src={`${baseUrl}/dwd/${finalResult?.fid}`} alt="" />
          </div>
          <div className="result-grid-right">
            <div className="progress-grp">
              <div className="result-grp">
                <div className="result-grp-name">Fake</div>
                <Progress.Circle
                  percent={Math.round(finalResult?.prediction.fake * 100)} // Set the percentage value
                  strokeColor={"rgba(132,116,254,1)"} // Set the stroke color
                  strokeWidth={10} // Set the stroke width
                  trailWidth={10} // Set the trail width (background)
                  style={customProgressBarStyle}
                  strokeLinecap="round"
                  trailColor="rgba(0, 114, 250, 0.09)"
                />
              </div>
              <div className="result-grp">
                <div className="result-grp-name">Real</div>
                <Progress.Circle
                  percent={Math.round(finalResult?.prediction.real * 100)} // Set the percentage value
                  strokeColor={"rgba(132,116,254,1)"} // Set the stroke color
                  strokeWidth={10} // Set the stroke width
                  trailWidth={10} // Set the trail width (background)
                  style={customProgressBarStyle}
                  strokeLinecap="round"
                  trailColor="rgba(0, 114, 250, 0.09)"
                />
              </div>
            </div>
            <div className="btns">
              {wallet ? (
                <button
                  className="cssbuttons-io-button"
                  onClick={() => {
                    getCerti();
                  }}
                >
                  <span>Get Certificate</span>
                </button>
              ) : (
                <button
                  className="cssbuttons-io-button"
                  onClick={requestAccount}
                >
                  <span>Connect wallet</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResultPage;
