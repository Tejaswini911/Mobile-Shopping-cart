import React from 'react'
import { useNavigate } from 'react-router-dom';
import { contextType, User } from "./model/Mobile";
import { MobileContext } from "./model/MobileContext";

function Order() {
    const navigate = useNavigate();
    const { updateUser, currentUser, setCurrentUser } = React.useContext(MobileContext) as contextType;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();  
        const edited:User = {
          ...currentUser,
          orderStatus:"Pending"
        }
        updateUser(currentUser.id?currentUser.id:0, edited);
        navigate("/home/mobile-list")
    }
  return (
    <div className='container-sm'>
        <h2>Delivery Address</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3 ">
          <input
            type="text"
            className= "form-control"
            name="address"
            required
            placeholder="Address"
            value={currentUser.deliveryAdd}
            onChange={(e)=>{ setCurrentUser({...currentUser,deliveryAdd:e.target.value})}}
          />
          <label>Address</label>
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
        &nbsp;
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/home/mobile-list")}
        >
          Back
        </button>
        </form>
    </div>
  )
}

export default Order