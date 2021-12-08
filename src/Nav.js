//import './styles/global.css'
import {
    Link,
    BrowserRouter,
 
    Route,
    
    Switch,
  } from 'react-router-dom'
import MarketPlace from "./Marketplace"
import Home from './create-item'
import XplayVids from './XplayVid'
import MyNFTS from './my-nfts'


function Navhan(){

  return (
      <>
      
      <BrowserRouter>
      <div className="App overflow-visible" style={{
        height: '65px',
        display: 'flex',
        background: '#000',
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
          <div>
        {/*  <img width={200} height={200} src="/Meta.png" /> */}
          </div>
          <div>
          <Link  style={{ padding: '0rem 3rem' }} className="text-0.05px text-blue-500 md:text-0.01px" to= './Marketplace'>MarketPlace</Link>
          </div>
          <div>
          <Link  style={{ padding: '0rem 3rem' }} className="text-0.05px text-blue-500 md:text-0.01px" to= './create-item'>Create NFts</Link>
          </div>
          <div>
          <Link  style={{ padding: '0rem 3rem' }} className="text-0.05px text-blue-500 md:text-0.01px" to= './XplayVid'>Play Vids</Link>
          </div>
          <div>
          <Link  style={{ padding: '0rem 3rem' }} className="text-0.05px text-blue-500 md:text-0.01px" to= './my-nft'>My Nfts</Link>
          </div>
   
        </div >
      <div>
       <Switch>
          <Route path="/profile/" component={MarketPlace} ></Route>
          <Route path="/Marketplace" component={MarketPlace} ></Route>
          <Route path="/create-item" component={Home} exact></Route>
          <Route path="/XplayVid" component={XplayVids} ></Route>
          <Route path="/my-nft" component={MyNFTS} ></Route>
        </Switch>
      </div>
    </BrowserRouter>
      </>
  )

}
export default Navhan;