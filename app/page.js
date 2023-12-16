'use client'

import { useState, useEffect } from "react"
import Coins from '../app/components/Coins'
import SearchCoins from '../app/components/SearchCoins'

export default function Home() {
  const [coins, setCoins] = useState([]);

  const getCoins = async () => {
    const response = await fetch('/api/coins');
    if (response.ok) {
      const coinsData = await response.json();
      if (coinsData && coinsData.data && coinsData.data.coins) {
        setCoins(coinsData.data.coins);
      } else {
        console.error("Invalid data structure in response", coinsData);
      }
    } else {
      console.error("Failed to fetch data:", response.status, response.statusText);
    }
  };

  useEffect(() => {
    getCoins();
  }, []);


  return (
    <div className="text-center">
      <h1 className="font-bold text-6xl mt-14">Crypto Coins</h1>
      <SearchCoins getSearchResults={(results) => setCoins(results)} />
      <Coins coins={coins} />
    </div>
  )
}

