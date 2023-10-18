import React, { useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Notification from "./components/Notification";
import Layout from "./components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "./store/ui-slice";
import { fetchData, sendCartData } from "./store/cart-actions";

function App() {
  const dispatch = useDispatch();
  const notification = useSelector(state=> state.ui.notification);
  const cart = useSelector(state => state.cart);
  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch]);

  useEffect(() => {
    // METHOD 1
    // Send state as Sending request
    //dispatch(uiActions.showNotification({
    //  open: true,
    //  message: 'Sending request...',
    //  type: 'warning'
    //}))
    //const sendRequest = async () => {
    //  const res = await fetch("https://redux-6d494-default-rtdb.europe-west1.firebasedatabase.app/cartitems.json", {
    //    method: 'PUT',
    //    body: JSON.stringify(cart)
    //  });
    //  const data = await res.json();
      // Send state as Request is successfull
   //   dispatch(uiActions.showNotification({
    //    open: true,
    //    message: 'Sent request to DB successfully',
    //    type: 'success'
    //  }));
   // };
    //sendRequest().catch(err => {
      // send state error
    //  dispatch(uiActions.showNotification({
     //   open: true,
    //    message: 'Request failed',
    //    type: 'error'
    //  }));
    //});

    // METHOD 2
    if(cart.changed) {
      dispatch(sendCartData(cart));
    }
  },[cart, dispatch]);
  return (
    <div className="App">
      {isLoggedIn && notification && <Notification type={notification.type} message={notification.message}/> }
      { !isLoggedIn && <Auth /> }
      {isLoggedIn && <Layout /> }
    </div>
  );
}

export default App;
