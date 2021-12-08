import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { Button } from '@material-ui/core';
import web3 from 'web3'
import axios from 'axios'
import Web3Modal from "web3modal"
import Head from 'next/head'


import {
  nftmarketaddress, nftaddress
} from './config'

import Market from './artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import NFT from './artifacts/contracts/NFT.sol/NFT.json'

export default function MyNFTS() {
  const [nfts, setNfts] = useState([])
  const [sold, setSold] = useState([])
  const [loaded, setLoaded] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const data = await marketContract.fetchMyNFTs()

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = web3.utils.fromWei(i.price.toString(), 'ether');
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
      }
      return item
    }))
    console.log('items: ', items)
    const soldItems = items.filter(i => i.sold)
    setSold(soldItems)
    setNfts(items)
    setLoaded('loaded')
  }
  if (loaded === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">You currently own no asset!</h1>)
  //if (loaded === 'not-loaded' && !nfts.length) return (<Button onClick={loadNFTs} className="rounded bg-blue-600 py-2 px-12 text-white m-16">Fetch NFTs</Button>)
  return (
    <div>

      <Head>
        <title>MetaX | MyNft</title>
      </Head>
      <div className="flex justify-center">
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {
              nfts.map((nft, i) => (
                <div key={i} className="border shadow rounded-xl overflow-hidden">
                  <img src={nft.image} className="rounded" />
                  <div className="flex flex-row p-4 bg-black">
                    <p className="text-2xl font-bold text-white">Price - {nft.price}&nbsp; </p>
                    <img height="15px" width='15px' src='https://www.cryptologos.cc/logos/ethereum-eth-logo.svg?v=014' />
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}