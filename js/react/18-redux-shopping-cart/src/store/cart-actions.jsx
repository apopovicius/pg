import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const FIREBASEDB = "https://redux-6d494-default-rtdb.europe-west1.firebasedatabase.app/cartitems.json";

export const fetchData = () => {
  return async(dispatch) => {
    const fetchHandler = async() => {
      const res = await fetch(FIREBASEDB);
      const data = await res.json();
      return data;
    };
    try {
      const cartData = await fetchHandler();
      console.log(cartData);
      dispatch(cartActions.replaceData(cartData));
    } catch(err) {
      dispatch(uiActions.showNotification({
        open:true,
        message: 'No data in DB for cart!',
        type: 'error'
      }))
    }
  }
}

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(uiActions.showNotification({
        open: true,
        message: 'Sending request...',
        type: 'warning'
      }));

    const sendRequest = async() => {
    // send state as sending request
      const res = await fetch(FIREBASEDB, {
        method: 'PUT',
        body: JSON.stringify(cart),
      })
      const data = await res.json()
      // send state are request success
      dispatch(uiActions.showNotification({
        open: true,
        message: 'Sent request to DB successfully',
        type: 'success'
      }));
    }

    try {
      await sendRequest();
    } catch(err) {
      dispatch(uiActions.showNotification({
        open:true,
        message: 'Request failed!',
        type: 'error'
      }))
    }
  }
}
