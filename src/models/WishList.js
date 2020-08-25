import { types, getParent, destroy } from "mobx-state-tree";

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
    remove() {
      // since it's a tree
      //2 here means we want to go 2 parents up
      getParent(self, 2).remove(self);
      //above can also be written as
      // getParent(getParent(self)).remove(self);
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
    remove(item) {
      //MST in built feature as in MST every element has unique location
      destroy(item);
      // normal method is :
      //self.items.splice(self.items.indexOf(item), 1);
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
