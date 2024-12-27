import classes from './MealItemForm.module.css'
import Input from '../../UI/Input'
import React,{useRef,useState } from "react";

const MealItemForm =(props)=>{
    const [isFormValid,setFormValid]=useState(true)

    const amountInputRef=useRef()
    const formSubmitHandler=(e)=>{
      e.preventDefault();
      const enteredAmount = amountInputRef.current.value;
      const enteredAmountNumber=+enteredAmount

      if (
        enteredAmount.trim().length === 0 ||
        enteredAmountNumber < 1 ||
        enteredAmountNumber > 10
      ) {
        setFormValid(false);
        return;
      }
      props.onAddToCart(enteredAmountNumber)
      amountInputRef.current.value='1'
    }

    return <form onSubmit={formSubmitHandler} className={classes.form}>
        <Input ref={amountInputRef} label='Amount' input={{
            id:'amout_'+props.id,
            type:'number',
            min:'1',
            max:'10',
            step:'1',
            defaultValue:'1'
        }} />
        <button>+ Add</button>
        {!isFormValid && <p className={classes.invalid}>Please enter a valid amount (1-10).</p>}
    </form>
}

export default MealItemForm