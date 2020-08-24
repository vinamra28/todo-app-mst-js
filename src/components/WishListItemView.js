import React from "react";

const WishListItemView = ({ item }) => (
  <li className="item">
    {item.image && <img src={item.image} />}
    <h3>{item.name}</h3>
    <span>{item.price}</span>
  </li>
);

export default WishListItemView;
