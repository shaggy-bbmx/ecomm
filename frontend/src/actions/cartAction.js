import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
  EMPTY_CART
} from "../constants/cartConstants";
import axios from "axios";

// Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.Stock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};


//ACTION FOR REMOVING ALL ITEMS FROM CART ---AFTER DONE WITH SHOPPING
export const emptyCart = () => async (dispatch) => {


  const cart = JSON.parse(localStorage['cartItems'])

  for (let i = 0; i < cart.length; ++i) {
    try {
      await axios.post(`/api/v1/product/stock/update/${cart[i].product}`,
        { quantity: cart[i].quantity }, {
        'Content-Type': 'application/json'
      })
      dispatch({
        type: EMPTY_CART
      })
      localStorage.removeItem('cartItems')
    } catch (error) {
      console.log(error)
    }
  }

}