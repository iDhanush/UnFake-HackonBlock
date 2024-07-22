import React, { useState, useEffect } from "react";
import "./Navbar.scss";
import { Link, NavLink } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

import META from "../../assets/meta.svg";

const Navbar = ({ page }) => {
  const { wallet, setWallet } = useStore();
  const [walletAddress, setWalletAddress] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      setProvider(window.ethereum);
    }
  }, []);

  const requestAccount = async () => {
    if (provider) {
      try {
        const accounts = await provider.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        setWallet(accounts[0]);
        console.log(accounts[0]);
        localStorage.setItem("wallet", accounts[0]);
      } catch (err) {
        console.error("Error:", err);
      }
    } else {
      console.log("MetaMask not detected");
    }
  };
  return (
    <>
      <nav className="nav">
        <Link className="logo" to="/">
          Un<span className="col">Mask</span>
        </Link>

        <ul className="navlinks">
          <li>
            <NavLink to="/nft">My certificates</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
          <li>{/* <NavLink to="/certification">Certification</NavLink> */}</li>
        </ul>

        {wallet ? (
          <div className="btns">
            <div className="wallet">
              <img src={META} alt="" />
              {wallet.substring(0, 8)}xxxxx
            </div>
            <button
              className="cssbuttons-io-button"
              onClick={() => {
                localStorage.clear();
                location.reload();
              }}
              style={{ gap: "10px" }}
            >
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <button
            className="cssbuttons-io-button"
            onClick={requestAccount}
            style={{ gap: "10px" }}
          >
            <img src={META} alt="" />
            <span>Connect wallet</span>
          </button>
        )}
      </nav>
    </>
  );
};

export default Navbar;
