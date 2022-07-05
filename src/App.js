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

        <div className="container my-12 mx-auto px-4 md:px-12">
          <div className="flex flex-wrap -mx-1 lg:-mx-4">


            {image &&
              image.map((el) => {
                return (

                  <article className="overflow-hidden rounded-lg shadow-lg">

                    <a href="#">
                      <img alt={el.name} className="block h-auto w-full" src={el.image} />
                    </a>

                    <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                      <h1 className="text-lg">
                        <a className="no-underline hover:underline text-black" href="#">
                          {el.name}
                        </a>
                      </h1>


                    </header>

                    <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                      <a className="flex items-center no-underline hover:underline text-black" href="#">
                        <img alt="Placeholder" className="block rounded-full" src="https://picsum.photos/32/32/?random" />
                        <p className="ml-2 text-sm">
                          {el.name}
                        </p>
                      </a>
                      <a className="no-underline text-grey-darker hover:text-red-dark" href="#">
                        <span className="hidden">Like</span>
                        <i className="fa fa-heart"></i>
                      </a>
                    </footer>

                  </article>


                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
