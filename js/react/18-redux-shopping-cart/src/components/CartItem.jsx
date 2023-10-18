import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";
import "./Cart.css";

const CartItem = ({ name, quantity, total, price, id }) => {
  const dispatch = useDispatch();
  const dec = () => {
    dispatch(cartActions.removeFromCart(id))
  };
  const inc = () => {
    dispatch(
      cartActions.addToCart({
        id,
        name,
        price,
      })
    );
  };
  return (
    <div className="cartItem">
      <h2> {name}</h2>
      <p>${price} /-</p>
      <p>x{quantity}</p>
      <article>Total ${total}</article>
      <button className="cart-actions" onClick={dec}>
        -
      </button>
      <button className="cart-actions" onClick={inc}>
        +
      </button>
    </div>
  );
};

export default CartItem;
