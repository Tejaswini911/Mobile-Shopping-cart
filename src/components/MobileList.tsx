import React from "react";
import { contextType, Mobile, User } from "./model/Mobile";
import { MobileContext } from "../components/model/MobileContext";
import { useNavigate } from "react-router-dom";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { TbCurrencyRupee } from "react-icons/tb";
import { Fade, Slide } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css'
import Popup from './Popup';

function MobileList() {
  const { mobiles,currentUser, updateUser, deleteMobiles, message, setMessage } =
    React.useContext(MobileContext) as contextType;
  const navigate = useNavigate();
  // const currentUser: User = JSON.parse(
  //   localStorage.getItem("currentUser") || ""
  // );

  const addToCart = (mobile: Mobile) => {
    let newCart: Mobile[] = [];
    currentUser.cart.map((prev: Mobile) => {
      if (prev.id === mobile.id) {
        newCart = currentUser.cart.map((mb: Mobile) =>
          mb.id === mobile.id ? { ...mb, count: mb.count + 1 } : mb
        );
      }
    });
    if (newCart.length === 0) {
      newCart = JSON.parse(JSON.stringify(currentUser.cart));
      newCart.push(mobile);
    }
    let price:number=0;
    newCart.map((mobile)=>{price=price+(mobile.count*mobile.price)})
    const editedUser: User = {
      ...currentUser,
      cart: newCart,
      totalPrice:price,
      orderStatus:'No Order'
    };
    updateUser(currentUser.id? currentUser.id : "0", editedUser);
    setMessage("Item added to cart")
    // localStorage.setItem('currentUser', JSON.stringify(editedUser));
  };


  const mobileElements = mobiles?.map((mobile: Mobile) => {
    return (
      <div className="col" >
        <div className="card item-card">
          <div className="view overlay">
          
            <Fade>
         {mobile.img.map((slideImage, index)=> (
            <div className="each-slide" key={index}>
              <img  className="card-img-top" src={slideImage}/>
            </div>
          ))} 
        </Fade>
          </div>

          <div className="card-body elegant-color white-text rounded-bottom"  >
            <div onClick={()=> navigate("/home/view/" + mobile.model)}>
            <h5 className="card-title">{mobile.model}</h5>
            <hr className="hr-light" />
            <p className="card-text">Details:</p>
            <p className="p">RAM: {mobile.ram}</p>
            <p className="p">Storage: {mobile.rom}</p>
            <p className="p">
              <TbCurrencyRupee />
              {mobile.price}{" "}
            </p>
            </div>
            {currentUser.userType === "admin" ? (
              <>
                <button
                  className="btn btn-sm btn-outline-primary "
                  onClick={() => navigate("/home/edit/" + mobile.model)}
                >
                  {" "}
                  <AiFillEdit className="icon" />
                </button>
                &nbsp;
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => {
                    deleteMobiles(mobile.id ? mobile.id : "");
                  }}
                >
                  <AiOutlineDelete className="icon" />
                </button>
              </>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => {
                  addToCart(mobile);
                }}
              >
                <BsCartPlus className="icon" />
              </button>
            )}
            {message && <Popup/>}
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="container my-3" >
      <h2 className="mb-3">List of Mobiles</h2>

      <div className="row row-cols-1 row-cols-md-3 g-4">{mobileElements}</div>
    </div>
  );
}

export default MobileList;
// <tr key={mobile.id}>
//   <th scope="row">{index + 1}</th>
//   <td>{mobile.model}</td>
//   <td>{mobile.ram}</td>
//   <td>{mobile.rom}</td>
//   <td>{mobile.price}</td>
//   <td>
//   { currentUser.userType === 'admin' ? (
//     <>
//   <button
//       className="btn btn-sm btn-outline-primary "
//       onClick={()=>navigate('/home/edit/'+mobile.model)}
//     > <AiFillEdit className="icon"/>
//     </button>
//     &nbsp;
//     <button
//       className="btn btn-sm btn-outline-danger"
//       onClick={() => {
//         deleteMobiles(mobile.id ? mobile.id : '')
//       }}
//     >
//     <AiOutlineDelete className="icon" />
//     </button></>) :(
//       <>
//       <button
//       className="btn btn-sm btn-outline-primary"
//       onClick={() => {addToCart(mobile)}}><BsCartPlus className="icon"/></button>
//       </>
//     )}

//   </td>
// </tr>
//
/* <div className="col-md-12">
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
          <tbody>{mobileElements}</tbody>
        </table>
      </div> */
