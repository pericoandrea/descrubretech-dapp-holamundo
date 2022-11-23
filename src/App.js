import "./App.css";
import React, { useState } from "react";
import { ethers } from "ethers";

function App() {
  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState();
  const [name, setName] = useState("");

  async function set() {
    const contractAddress = "0x0DC7c9547756602218f96AB820c49E30cB3b97eB";
    const contractAbi = [
      {
        inputs: [],
        name: "name",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ];

    if (provider) {
      // The Contract object
      const daiContract = new ethers.Contract(
        contractAddress,
        contractAbi,
        provider
      );
      console.log(daiContract);
      const valueName = await daiContract.name();
      setName(valueName);
      console.log(valueName);
    } else {
      alert("Conectese a MetaMask");
    }
  }

  return (
    <div className="App">
      <h1>Conectar con la billetera</h1>
      <button
        onClick={async () => {
          alert("Conectar a MetaMask!!");
          if (window.ethereum) {
            // A Web3Provider wraps a standard Web3 provider, which is
            // what MetaMask injects as window.ethereum into each page
            const prov = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(prov);

            // MetaMask requires requesting permission to connect users accounts
            await prov.send("eth_requestAccounts", []);
            console.log(prov);

            // The MetaMask plugin also allows signing transactions to
            // send ether and pay to change state within the blockchain.
            // For this, you need the account signer...
            const signer = prov.getSigner();

            setAddress(await signer.getAddress());

            set();
          } else {
            alert("¡Obtenga la extensión de MetaMask para su navegador!");
          }
        }}
      >
        MetaMask
      </button>
      {address === "" ? "" : <h2>Billetera: {address} </h2>}
      {name === "" ? "" : <h2>Nombre Contrato: {name} </h2>}
    </div>
  );
}

export default App;
