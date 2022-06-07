import { useState } from 'react';
import './App.css';
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { Connection } from "@solana/web3.js";


function App() {

  const [wallet, setWallet] = useState({});
  const [walletaddress, setWalletaddress] = useState('');
  async function connectWallet() {

    try {
      setWallet(await window.solana.connect());
      setWalletaddress(window.solana.publicKey.toString());
      console.log(walletaddress);
      const connectionMetaplex = new Connection(
        "https://api.metaplex.solana.com",
        "confirmed"
      );
      const t_walletAddress = walletaddress
      const nftsmetadata = await Metadata.findDataByOwner(connectionMetaplex, t_walletAddress);
      console.log(nftsmetadata);


    } catch (err) {
      // { code: 4001, message: 'User rejected the request.' }
    }


  }

  return (
    <div>
      <h1>Test</h1 >
      <button onClick={connectWallet}>Connect to Wallet</button>

    </div >
  );
}

export default App;
