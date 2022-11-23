import "./App.css";
import React, { useState } from "react";
import { ethers } from "ethers";

function App() {
  const [address, setAddress] = useState("");

  return (
    <div className="App">
      <h1>Conectar con la billetera</h1>
      <button
        onClick={async () => {
          alert("Conectar a MetaMask!!");
          if (window.ethereum) {
            // A Web3Provider wraps a standard Web3 provider, which is
            // what MetaMask injects as window.ethereum into each page
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            // MetaMask requires requesting permission to connect users accounts
            await provider.send("eth_requestAccounts", []);
            console.log(provider);
            
            // The MetaMask plugin also allows signing transactions to
            // send ether and pay to change state within the blockchain.
            // For this, you need the account signer...
            const signer = provider.getSigner();

            const addr = await signer.getAddress();
            setAddress(addr);
          } else {
            alert("¡Obtenga la extensión de MetaMask para su navegador!");
          }
        }}
      >
        MetaMask
      </button>
      {address === ""? "" : <h2>Dirección de la billetera: {address} </h2>}
    </div>
  );
}

export default App;
