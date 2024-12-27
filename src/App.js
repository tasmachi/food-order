import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./Card/Cart";
import { useContext } from "react";
import cartContext from "./Context/Context";


function App() {
  const context=useContext(cartContext)

  return (
    <>
    {context.cartIsShown && <Cart/>}
      <Header />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
