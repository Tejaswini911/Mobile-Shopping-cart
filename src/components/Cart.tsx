
import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Outlet, useNavigate } from "react-router-dom";

import { contextType, Mobile, User } from "./model/Mobile";
import { MobileContext } from "./model/MobileContext";

function Cart() {
  const { updateUser, currentUser } = React.useContext(MobileContext) as contextType;
  const navigate = useNavigate();
  // const currentUser: User = JSON.parse(
  //   localStorage.getItem("currentUser") || ""
  // );
  
  const deleteItem = (mobile: Mobile) => {

    const list:Mobile[] = currentUser.cart.map((prev:Mobile)=> prev.id === mobile.id ? {...prev, count:prev.count-1} : prev);
     const index = list.findIndex(obj => obj.count <= 0 );
     if( index>=0){
     list.splice(index,1)
     }
     let price:number=0;
    list.map((mobile)=>{price=price+(mobile.count*mobile.price)})
    const editedUser: User = {
      ...currentUser,
      cart: list,
      totalPrice:price
    };
    updateUser(currentUser.id ? currentUser.id : 0, editedUser);
  };

  const addItem = (mobile: Mobile) => {

    const list:Mobile[] = currentUser.cart.map((prev:Mobile)=> prev.id === mobile.id ? {...prev, count:prev.count+1} : prev);
    let price:number=0;
    list.map((mobile)=>{price=price+(mobile.count*mobile.price)})
    const editedUser: User = {
      ...currentUser,
      cart: list,
      totalPrice:price
    };  
    updateUser(currentUser.id ? currentUser.id : 0, editedUser);
  };

  const cartItems = currentUser.cart.map((mobile: Mobile, index: number) => {

    return (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{mobile.model}</td>
        <td>{mobile.ram}</td>
        <td>{mobile.rom}</td>
        <td>{mobile.price}</td>
        <td>
         <div className="actions">
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => {
              addItem(mobile);
            }}
          >
            <AiOutlinePlus className="icon" />
          </button>
          <div className="count">{mobile.count}</div>
          
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => {
              deleteItem(mobile);
            }}
          >
            <AiOutlineMinus className="icon" />
          </button>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <><div className="container my-3">
      <h2>Cart Items</h2>
      {currentUser.orderStatus === "Pending" && <h4>Your Order is Placed</h4>}
      {currentUser.orderStatus === "Order Confirmed" ? <h4>Order is Delivered</h4> : 
      <div className="col-md-12">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Model</th>
              <th scope="col">RAM</th>
              <th scope="col">Storage</th>
              <th scope="col">Price</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>{cartItems}</tbody>
        </table>
        <div className="d-flex justify-content-between">
          {currentUser.orderStatus === "Pending" ? <button className="btn btn-danger" onClick={()=>{
            const editedUser: User = {
              ...currentUser,
              orderStatus:"No Order"
            };
            updateUser(currentUser.id ? currentUser.id : 0, editedUser);
          }}>Cancel Order</button> :
          <button className="btn btn-primary" onClick={() => { navigate("order"); } }>Place Order</button> }
          <h3>Total Price : Rs.{currentUser.totalPrice}</h3>
        </div>
      </div>}
    </div>
    <Outlet />
    </> 
  );
}

export default Cart;
