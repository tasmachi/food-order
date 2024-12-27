import classes from "./Button.module.css";
import { useContext,useEffect,useState } from "react";
import cartContext from "../../Context/Context";

const CardButton = (props) => {
  const [amountIsChanged,setAmountIsChanged]=useState(false);
  const cartctx=useContext(cartContext)
  const {items}=cartctx;

  const numOfCartItems=items.reduce((curr,acc)=>{
    return curr+acc.amount
  },0)

  useEffect(()=>{
    if (items.length===0)return;

    setAmountIsChanged(true)

    const timer=setTimeout(()=>{
      setAmountIsChanged(false)
    },300);
    return ()=> clearTimeout(timer)
  },[items])

  const btnClasses=`${classes.button} ${amountIsChanged && classes.bump}`;

  return (
    <button onClick={cartctx.showModalHandler} className={btnClasses}>
      <span className={`${classes.icon}`}>
        <i className="fas fa-shopping-cart cart-icon"></i>
      </span>
      <span className={classes.cart}>Your Cart</span>
      <span>{numOfCartItems}</span>
    </button>
  );
};

export default CardButton;
