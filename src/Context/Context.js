import React from "react";

const cartContext = React.createContext({
  cartIsShown: false,
  showModalHandler: () => {},
  hideModalHandler: () => {},
  items:[],
  totalAmount:0,
  addItem:(item)=>{},
  removeItem:(id)=>{},
  clearCart:()=>{}
});



export default cartContext;
