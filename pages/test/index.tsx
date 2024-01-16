import { getItemsInCart, setItemsInCart } from "@/store/authSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Home() {
  const itemsInCart: any = useSelector(getItemsInCart);
  const dispatch = useDispatch();

  const addItemsToCart = () => {
    const result:any = parseInt(itemsInCart) + 1
    dispatch(setItemsInCart(result))
  }

  return (
    <>
      <h2>
        Items in Cart : {itemsInCart}
      </h2>
      <button value="Add" type="button" onClick={addItemsToCart}>
        Add
      </button>
    </>
  )
}