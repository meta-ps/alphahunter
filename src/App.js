import { useState } from "react";
import "./App.css";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { Connection } from "@solana/web3.js";

function App() {
  const [wallet, setWallet] = useState({});
  const [walletaddress, setWalletaddress] = useState("");
  const [buttonHidden, setButtonHidden] = useState(true);
  const [data, setData] = useState();

  const [image, setImage] = useState([]);
  async function connectWallet() {
    setButtonHidden(false);

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
      console.log(t_walletAddress);
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
    } catch (err) { }
  }

  return (
    <div>
      <div>
        {buttonHidden && <button onClick={connectWallet} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Connect to Wallet</button>}
      </div>
      <div>
        <h1>Test</h1>

        {image &&
          image.map((el) => {
            return (
              <div key={el.name} >
                <p>{el.name}</p>
                <img src={el.image} alt={el.name} width="100px" height="100px" />
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default App;
