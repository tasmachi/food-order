import classes from "./Modal.module.css";
import ReactDOM from "react-dom";
import cartContext from "../../Context/Context";
import { useContext } from "react";

const Backdrop = (props) => {
  return <div onClick={props.onClose} className={classes.backdrop} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalOverlay = document.getElementById("overlays");

const Modal = (props) => {
  const context = useContext(cartContext);

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={context.hideModalHandler} />,
        portalOverlay
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalOverlay
      )}
    </>
  );
};

export default Modal;
