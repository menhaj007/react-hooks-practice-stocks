import React, {useState, useEffect} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";
const API = "http://localhost:3000/stocks";

function MainContainer() {
  const [stockData, setStockData] = useState([]);
  const [sortedByAZ, setSortedByAZ] = useState("");
  const [filterByCategory, setCategory] = useState("Tech");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(API);
      const receivedStockData = await response.json();
      setStockData(receivedStockData);
    };
    fetchData();
  }, []);
  function sortedByAZFn(e) {
    setSortedByAZ(e.target.value);
  }

  function decisionMaker() {
    const tmpStockData = [...stockData];
    if (sortedByAZ==="Alphabetically") {
      tmpStockData.sort((stockA, stockB) => {
        const nameA = stockA.name.toLowerCase();
        const nameB = stockB.name.toLowerCase();
        // return stockA > -1;
        // console.log(nameA, nameB)
        if (nameA < nameB) return -1
        else if (nameA > nameB) return 1
        else return 0;
      });
    } else if (sortedByAZ === "Price") {
      tmpStockData.sort((a, b) => {
        if (a.price < b.price) return -1
        else if (a.price > b.price) return 1;
        else return 0;
      })
    }
    return tmpStockData;
  }

  function filterStockData(value) {
    setCategory(value);
  }

  const filteredStocks = decisionMaker().filter(
    (stock) => stock.type === filterByCategory
  );
  
  
  return (
    
    <div>
      <SearchBar sortedByAZFn={sortedByAZFn} sortedByAZ={sortedByAZ} filterStockData={filterStockData}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stockData={sortedByAZ.length > 0? decisionMaker(): filteredStocks } />
        </div>
        <div className="col-4">
          <PortfolioContainer />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
