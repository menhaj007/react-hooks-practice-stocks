import React from "react";
import Stock from "./Stock";

function StockContainer({stockData}) {
  return (
    <div>
      <h2>Stocks</h2>
      {stockData.map(stock => <Stock key={stock.id} {...stock}/>)}
    </div>
  );
}

export default StockContainer;
