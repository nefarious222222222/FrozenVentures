import React from "react";

export const ShopPerformance = () => {
  return (
    <div className="shop-performance">
      <h1>Shop Performance</h1>

      <div className="metrics-container">
        <div className="metric">
          <div className="metric-value">4500</div>
          <div className="metric-label">Total Revenue</div>
        </div>

        <div className="metric">
          <div className="metric-value">180</div>
          <div className="metric-label">Sold Products</div>
        </div>

        <div className="metric">
          <div className="metric-value">4</div>
          <div className="metric-label">Cancelled Order</div>
        </div>

        <div className="metric">
          <div className="metric-value">0</div>
          <div className="metric-label">Request Refund</div>
        </div>
      </div>

      <div className="graphs-container">
      </div>
    </div>
  );
};