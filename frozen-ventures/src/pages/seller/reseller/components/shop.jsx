import React from "react";
import ImageOne from "../../../../assets/images/1.jpg";

export const Shop = () => {
  return (
    <div className="shop-reseller">
      <h1>Shop</h1>

      <div className="search-bar">
        <input type="text" placeholder="Search" />
      </div>

      <div className="reseller-container">
        <div className="reseller-shop">
          <div className="shop-header">
            <p>Php 450</p>
            <img src={ImageOne} alt="" />
            <h2>Senog Ays Krim</h2>
          </div>

          <form className="input-container">
            <div className="input-field">
              <label htmlFor="flavor-select">Flavor:</label>
              <select id="flavor-select" name="flavors">
                <option value="" disabled>
                  -- Please choose an option --
                </option>
                <option value="vanilla">Vanilla</option>
                <option value="chocolate">Chocolate</option>
                <option value="strawberry">Strawberry</option>
                <option value="mint">Mint</option>
                <option value="caramel">Caramel</option>
              </select>
            </div>

            <div className="input-field">
              <label htmlFor="size-select">Size:</label>
              <select id="size-select" name="sizes">
                <option value="" disabled>
                  -- Please choose a size --
                </option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="extra-large">Extra Large</option>
              </select>
            </div>

            <div className="input-field">
              <label htmlFor="size-select">Quantity:</label>
              <input type="number" />
            </div>

            <div className="input-footer">
              <div className="input-field">
                <label htmlFor="size-select">Add Ons:</label>
                <select id="size-select" name="sizes">
                  <option value="" disabled>
                    -- Please choose an add ons --
                  </option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="extra-large">Extra Large</option>
                </select>
              </div>

              <button>Add to cart</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
