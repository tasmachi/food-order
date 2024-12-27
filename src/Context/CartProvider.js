import { useReducer, useState } from "react";
import CartContext from "./Context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingCartItem = state.items[existingCartItemIndex];

      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount, // Fix: Correctly updating the amount
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item); // Fix: Correctly adding a new item to the cart
      }

      return { items: updatedItems, totalAmount: updatedTotalAmount };

    case "REMOVE_ITEM":
      const itemIndex = state.items.findIndex((item) => item.id === action.id);
      const itemToRemove = state.items[itemIndex];
      let filteredItems;
      let filteredTotalAmount = state.totalAmount;

      if (itemToRemove.amount === 1) {
        filteredItems = state.items.filter((item) => item.id !== action.id);
        filteredTotalAmount -= itemToRemove.price;
      } else {
        const updatedItem = {
          ...itemToRemove,
          amount: itemToRemove.amount - 1,
        };
        filteredItems = [...state.items];
        filteredItems[itemIndex] = updatedItem;
        filteredTotalAmount -= itemToRemove.price;
      }

      return { items: filteredItems, totalAmount: filteredTotalAmount };

    case 'CLEAR':
      return defaultCartState

    default:
      return defaultCartState;
  }
};

const ContextProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, defaultCartState);
  const [isShown, setCartIsShown] = useState(false);

  const addItemToCartHandler = (item) => {
    cartDispatch({ type: "ADD_ITEM", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    cartDispatch({ type: "REMOVE_ITEM", id: id });
  };

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const clearCartItems=()=>{
    cartDispatch({type:'CLEAR'})
  }

  return (
    <CartContext.Provider
      value={{
        cartIsShown: isShown,
        showModalHandler: showCartHandler,
        hideModalHandler: hideCartHandler,
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart:clearCartItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default ContextProvider;
