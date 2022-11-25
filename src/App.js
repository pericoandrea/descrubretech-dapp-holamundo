import "./App.css";
import React, { useState } from "react";
import { ethers } from "ethers";

function App() {
  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [allSaludos, setAllSaludos] = useState([]);

    const contractAddress = "0x277CE0518B0e87Dc3D23D34fFA2BE1e1d973af01";
    const contractAbi = [
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "mensaje",
            "type": "string"
          }
        ],
        "name": "crearNuevoSaludo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "saludos",
        "outputs": [
          {
            "internalType": "string",
            "name": "mensaje",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "saludador",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "marcaDeTiempo",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ]
    let daiContract;

    
    try {
      const { ethereum } = window;
  
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        daiContract = new ethers.Contract(contractAddress, contractAbi, signer); 
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log("ERROR:", error);
    }

  async function submit () {
      try {
        alert ('Enviando transacción...: ' + message);
        const txn = await daiContract.crearNuevoSaludo(message);
        await txn.wait();
        alert ('Se envió un saludo! El saludo:' + message);
      } catch (e) {
        alert ('Error: ' + e);
      }
  }

  function readAllMessages () {
    if (daiContract) {
      const saludos = [];
      for (let i=0; i < daiContract.saludos.length; i++){
        saludos.push(daiContract.saludos(i));
      }
      setAllSaludos(saludos);
    } else {
      alert("Conectese a MetaMask");
    }
  }

  async function set() {
    if (daiContract) {
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

            // Firmar un mensaje
            const sign = await signer.signMessage("DescubreTech Web 3.0");
            console.log(sign);

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
      <button
        onClick={async () => {
          const signer = provider.getSigner();

          // Firmar un mensaje
          const sign = await signer.signMessage("DescubreTech Web 3.0");
          console.log(sign);
        }}
      >
        Firmar un mensaje
      </button>

      <h1>Crear un nuevo saludo</h1>
      <form onSubmit={() => submit()}>
        <label>
          Saludo:
          <input type="text" value={message} onChange={(event) => setMessage(event.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <h1>Todos los saludo</h1>
      { allSaludos.length > 0 && allSaludos.map((saludo, index) => {
          return <div key={index}>
            <p>Saludo: {saludo.mensaje}</p>
            <p>Saludador: {saludo.saludador}</p>
            <p>Marca de tiempo: {saludo.marcaDeTiempo}</p>
          </div>
        }
      )}
      <button onClick={()=>readAllMessages()}>Click</button>
    </div>
  );
}

export default App;
