import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./orderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { emptyCart } from '../../actions/cartAction'
import { useEffect } from "react";



const OrderSuccess = () => {

  const dispatch = useDispatch()

  useEffect(() => {

    if (localStorage['cartItems']) {
      dispatch(emptyCart())
    }
  }, [dispatch])


  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
