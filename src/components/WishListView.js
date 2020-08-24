import React from "react";
import { observer } from "mobx-react";

import WishListItemView from "./WishListItemView";

const WishListView = ({ wishList }) => (
  <div className="list">
    <ul>
      {wishList.items.map((item, idx) => (
        <WishListItemView key={idx} item={item} />
      ))}
    </ul>
    Total: {wishList.totalPrice}
  </div>
);

export default observer(WishListView);
//observer make sures that whenever data is changed relevant component re-renders
//observer from the 'mobx-react' package is enough to render data in React components, and get notified of updates
