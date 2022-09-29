import React from "react";
import { AiFillEdit, AiOutlineCheck, AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { contextType, User } from "../model/Mobile";
import { MobileContext } from "../model/MobileContext";

function UsersList() {
  const { users, deleteUser, updateUser } = React.useContext(
    MobileContext
  ) as contextType;
  //console.log(mobiles);
  // const navigate = useNavigate()
  function approveOrder(user: User) {
    const editedUser: User = {
      ...user,
      totalPrice: 0,
      cart: [],
      orderStatus: "Order Confirmed",
    };
    updateUser(editedUser.id ? editedUser.id : 0, editedUser);
  }

  const userElements = users?.map((user: User, index: number) => {
    return (
      <tr key={user.id}>
        <th scope="row">{index + 1}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.userType}</td>
        <td>{user.orderStatus}</td>
        <td>
          {/* <button 
            className="btn btn-sm btn-outline-primary "
            onClick={()=>navigate('/home/edit/'+mobile.model)}
          > <AiFillEdit className="icon"/>
          </button>      
          &nbsp; */}
          {user.orderStatus === "Pending" && (
            <button
              className="btn btn-sm btn-outline-success"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Confirm the Order"
              onClick={() => {
                approveOrder(user);
              }}
            >
              <AiOutlineCheck className="icon" />
            </button>
          )}
          &nbsp;
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => {
              deleteUser(user.id ? user.id : 0);
            }}
          >
            <AiOutlineDelete className="icon" />
          </button>
        </td>
      </tr>
    );
  });
  return (
    <div className="container my-3">
      <h2>List of Users</h2>

      <div className="col-md-12">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">User Type</th>
              <th scope="col">Order Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{userElements}</tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersList;
