import "./App.css";
import { ethers } from "ethers";

function App() {
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

            // The MetaMask plugin also allows signing transactions to
            // send ether and pay to change state within the blockchain.
            // For this, you need the account signer...
            const signer = provider.getSigner();
            console.log(provider, await signer.getAddress());
          }
        }}
      >
        MetaMask
      </button>
    </div>
  );
}

export default App;
