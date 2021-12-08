
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";

import XplayVids from "./XplayVid";

import Home from "./create-item";
import MarketPlace from "./Marketplace";

const ethers = require('ethers');
const provider = new ethers.providers.JsonRpcProvider(`https://eth-rinkeby.alchemyapi.io/v2/avpSFE4CFF97rciebprxcggQd2cF18mJ`);

function MyApp() {


  return (
    <div>
      
      <Router>
      <div className="App">
        <div>Hello and it is working </div>
        <br></br>
        <nav style={{
        height: '90px',

        display: 'flex',
        background: '#000',
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
      >
        <img width={200} height={200} src="/Meta.png" />
        <div className="flex mt-6"
        >
          <Link to="/Home">
            <a style={{ padding: '0rem 2rem' }}
              className="text-0.05px text-blue-500 md:text-0.05px"
            >
              Home
            </a>
          </Link>
          <Link to="/Marketplace">
            <a style={{ padding: '0rem 2rem' }} className="text-0.05px text-blue-500 md:text-0.05px">
              MarketPlace
            </a>
          </Link>
          <Link to="/XplayLive">
            <a style={{ padding: '0rem 2rem' }} className="text-0.05px text-blue-500 md:text-0.05px">
              XplayLive
            </a>
          </Link>
          <Link to="/XplayVid">
            <a style={{ padding: '0rem 2rem' }} className="text-0.05px text-blue-500 md:text-0.05px">
              XplayVideo
            </a>
          </Link>
          <Link to="/create-item">
            <a style={{ padding: '0rem 2rem' }} className=" text-0.05px text-blue-500 md:text-0.05px">
              CreateNFT
            </a>
          </Link>
          <Link to="/my-nfts">
            <a style={{ padding: '0rem 2rem' }} className="text-0.05px text-blue-500 md:text-0.05px">
              MyNFTS
            </a>
          </Link>

        </div>
      </nav >
      
      </div >
      <div>
        <Switch>
          <Route path="/Marketplace" component={MarketPlace} ></Route>
          <Route path="/create-item" component={Home} ></Route>
          <Route path="/XplayVids" component={XplayVids} ></Route>
          
          <MyApp/>
          
        </Switch>
      </div>

    </Router>
    </div >
  )

}

export default MyApp;
