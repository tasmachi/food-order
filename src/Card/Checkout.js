import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";
const isNotFIveChars = (value) => value.trim().length !== 5;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    address: true,
    city: true,
    postalCode: true,
  });
  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredAddressIsValid = !isEmpty(enteredAddress);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = !isNotFIveChars(enteredPostal);

    setFormInputsValidity({
      name: enteredNameIsValid,
      address: enteredAddressIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalIsValid,
    });

    const formIsValid =
      enteredAddressIsValid &&
      enteredCityIsValid &&
      enteredNameIsValid &&
      enteredPostalIsValid;

    if (!formIsValid) {
      return;
    }

    const userInputData = {
      name: enteredName,
      address: enteredAddress,
      city: enteredCity,
      postalCode: enteredPostal,
    };

    props.onConfirm(userInputData);
  };
  return (
    <form onSubmit={confirmHandler} className={classes.form}>
      <div
        className={`${classes.control} ${
          !formInputsValidity.name ? classes.invalid : ""
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input ref={nameInputRef} type="text" id="name" />
        {!formInputsValidity.name && (
          <p className={classes["error-text"]}>Please enter a valid name.</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          !formInputsValidity.address ? classes.invalid : ""
        }`}
      >
        <label htmlFor="address">Street Address</label>
        <input ref={addressInputRef} type="text" id="address" />
        {!formInputsValidity.address && (
          <p className={classes["error-text"]}>
            Please enter a valid Street address.
          </p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          !formInputsValidity.postalCode ? classes.invalid : ""
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalInputRef} type="text" id="postal" />
        {!formInputsValidity.postalCode && (
          <p className={classes["error-text"]}>
            Please enter a valid Postal code.
          </p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          !formInputsValidity.city ? classes.invalid : ""
        }`}
      >
        <label htmlFor="city">City</label>
        <input ref={cityInputRef} type="text" id="city" />
        {!formInputsValidity.city && (
          <p className={classes["error-text"]}>Please enter a city name.</p>
        )}
      </div>
      <button>Confirm</button>
      <button type="button" onClick={props.onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default Checkout;
