import { types } from "mobx-state-tree";

const data = {
  name: "vinamra",
  price: 28.78,
  image: "google.com",
};

// we can return the functions present in the actions
// export const WishListItem = types
//   .model({
//     name: types.string,
//     price: types.number,
//     image: "", // or we can do this way -> types.optional(types.string, ""),
//   })
//   .actions((self) => {
//     function changeName(newName) {
//       self.name = newName;
//     }
//     return {
//       changeName,
//     };
//   });

// we can directly use ES6 features and return the functions instead of returning them manually
export const WishListItem = types
  .model({
    name: types.string,
    price: types.number,
    image: "", // or we can do this way -> types.optional(types.string, ""),
  })
  .actions((self) => ({
    changeName(newName) {
      self.name = newName;
    },
    changePrice(newPrice) {
      self.price = newPrice;
    },
    changeImage(newImage) {
      self.image = newImage;
    },
  }));

export const WishList = types
  .model({
    items: types.optional(types.array(WishListItem), []),
    // totalPrice: types.number, //this property needs to be computed again and again so moving it to views
  })
  .actions((self) => ({
    add(item) {
      self.items.push(item);
    },
  }))
  .views((self) => ({
    /**
     * since this property needs to be derived everytime that's why it's here
     * total price is only updated when necessary
     * @returns {number}
     */
    get totalPrice() {
      return self.items.reduce((sum, entry) => sum + entry.price, 0);
    },
  }));
