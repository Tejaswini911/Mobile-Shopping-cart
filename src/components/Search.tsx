import React from "react";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { Fade } from "react-slideshow-image";
import { contextType, Mobile, User } from "./model/Mobile";
import { MobileContext } from "./model/MobileContext";

function Search() {
  const { model } = useParams();
  const navigate = useNavigate();
  const [searchedMobile, setSearchedMobile] = React.useState<Mobile>({
    id: "",
    model: "",
    ram: "",
    rom: "",
    price:0,
    count:1, 
    img:[""]
  });
  
  const { mobiles, updateUser, deleteMobiles } =
  React.useContext(MobileContext) as contextType;

const currentUser: User = JSON.parse(
  localStorage.getItem("currentUser") || ""
);

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

  const editedUser: User = {
    ...currentUser,
    cart: newCart,
  };
  updateUser(currentUser.id ? currentUser.id : 0, editedUser);
  // localStorage.setItem('currentUser', JSON.stringify(editedUser));
};
  React.useEffect(() => {
    if (model) {
      setSearchedMobile((prev) =>
        mobiles.filter(
          (mobile) => mobile.model.toLowerCase() === model.toLowerCase()
        ).length > 0
          ? mobiles.filter(
              (mobile) => mobile.model.toLowerCase() === model.toLowerCase()
            )[0]
          : prev
      );
    }
  }, [model]);

  function handleClose() {
    navigate("/home/mobile-list");
    setSearchedMobile({ id: "", model: "", ram: "", rom: "", price:0, count:1, img:[""]});
  }
  
  return (
    <>      
      {searchedMobile.id ? (
      <div className="container my-3">
      <h2>Mobile Details</h2>
      <div className="mobile-img">
      <Fade>
         {searchedMobile.img.map((slideImage, index)=> (
            <div className="each-slide" key={index}>
              <img  className="card-img-top" src={slideImage}/>
            </div>
          ))} 
        </Fade>
    </div>
      <div className="col-md-12">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Model</th>
              <th scope="col">RAM</th>
              <th scope="col">Storage</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
          <tr key={searchedMobile.id}>
        <th scope="row">1</th>
        <td>{searchedMobile.model}</td>
        <td>{searchedMobile.ram}</td>
        <td>{searchedMobile.rom}</td>
        <td>{searchedMobile.price}</td>
        </tr>
          </tbody>
        </table>
      </div>
      </div>
      ) : (
        <h3>Mobile Not Found</h3>
      )}
      {currentUser.userType === "admin" ? (
              <>
                <button
                  className="btn btn-sm btn-outline-primary "
                  onClick={() => navigate("/home/edit/" + searchedMobile.model)}
                >
                  {" "}
                  <AiFillEdit className="icon" />
                </button>
                &nbsp;
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => {
                    deleteMobiles(searchedMobile.id ? searchedMobile.id : "");
                  }}
                >
                  <AiOutlineDelete className="icon" />
                </button>
              </>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => {
                  addToCart(searchedMobile);
                }}
              >
                <BsCartPlus className="icon" />
              </button>
            )}
      &nbsp;<button className="btn btn-outline-primary" onClick={() => handleClose()}>
        Close
      </button>
    
    </>
  );
}

export default Search;
