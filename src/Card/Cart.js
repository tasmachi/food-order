import classes from "./Cart.module.css";
import Modal from "../components/UI/Modal";
import Context from "../Context/Context";
import { useContext, useState } from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useFetch from "../hooks/hook";

const URL =
  "https://movies-api-e583e-default-rtdb.europe-west1.firebasedatabase.app/orders.json";

const Cart = () => {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(Context);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const {
    isLoading: sending,
    sendRequest: sendUserData,
    didSubmit,
  } = useFetch();

  const itemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const itemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const hasItems = cartCtx.items.length > 0;

  const submitOrderHandler = (userData) => {
    sendUserData({
      url: URL,
      method: "POST",
      body: { user: userData, orderedItems: cartCtx.items },
      headers: { "Content-Type": "application/json" },
    });

    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={itemRemoveHandler.bind(null, item.id)}
          onAdd={itemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const didSubmitModalContent = (
    <>
      <p>Successfully ordered!</p>
      <div className={classes.actions}>
        <button onClick={cartCtx.hideModalHandler} className={classes.button}>
          Close
        </button>
      </div>
    </>
  );  

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const btnOrderHandler = () => {
    setIsCheckout(true);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button
        onClick={cartCtx.hideModalHandler}
        className={classes["button--alt"]}
      >
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={btnOrderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onConfirm={submitOrderHandler}
          onCancel={cartCtx.hideModalHandler}
        />
      )}
      {!isCheckout && modalActions}
    </>
  );

  return (
    <Modal>
      {!sending && !didSubmit && cartModalContent}
      {sending && isSubmittingModalContent}
      {!sending && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
