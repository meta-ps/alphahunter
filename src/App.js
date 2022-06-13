import { useState } from "react";
import "./App.css";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { Connection } from "@solana/web3.js";

function App() {
  const [wallet, setWallet] = useState({});
  const [walletaddress, setWalletaddress] = useState("");

  const [data, setData] = useState();

  const [image, setImage] = useState([]);
  async function connectWallet() {
    try {
      setWallet(await window.solana.connect());
      setWalletaddress(window.solana.publicKey.toString());
      console.log(walletaddress);
      const connectionMetaplex = new Connection(
        "https://api.metaplex.solana.com",
        "confirmed"
      );
      const t_walletAddress = "7EMdrCmpx7Pogha1r363176NQCMaWrwrReApvQTpmEd2";
      const nftsmetadata = await Metadata.findDataByOwner(
        connectionMetaplex,
        t_walletAddress
      );

      setData(nftsmetadata);

      let imagesData = [];

      nftsmetadata.map(async (el) => {
        const data = await fetch(el.data.uri);
        const dt = await data.json();
        const newData = {
          name: dt.name,
          image: dt.image,
          symbol: dt.symbol,
        };

        console.log("thisis teh new data", newData);

        imagesData.push(newData);
      });

      setImage(imagesData);
    } catch (err) {}
  }

  return (
    <div>
      <h1>Test</h1>
      <button onClick={connectWallet}>Connect to Wallet</button>
      {image &&
        image.map((el) => {
          return (
            <div key={el.name}>
              <p>{el.name}</p>
              <img src={el.image} alt={el.name} width="100px" height="100px" />
            </div>
          );
        })}
    </div>
  );
}

export default App;
