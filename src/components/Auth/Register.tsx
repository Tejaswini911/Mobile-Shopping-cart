import React from "react";
import { useNavigate } from "react-router-dom";
import { contextType } from "../model/Mobile";
import { MobileContext } from "../model/MobileContext";
import { User } from "../model/Mobile";
import Popup from "../Popup";

interface errors {
  userError: string;
  passwordError: string;
}

const initialState: errors = { userError: "", passwordError: "" };

function Register() {
  const navigate = useNavigate();
  const { users, postUser, setCurrentUser, setMessage, message } = React.useContext(MobileContext) as contextType;
  const formData: React.MutableRefObject<any> = React.useRef();
  const [error, setError] = React.useState<errors>(initialState);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, email, password, confirmPassword, admin } = formData.current;

    const newUser: User = {
      id: new Date().getTime().toString(),
      name: name.value,
      email: email.value,
      password: password.value,
      userType: admin.value,
      cart:[],
      totalPrice:0,
      deliveryAdd:'',
      orderStatus:'No Order'
    };
    if (Validate(newUser)) {
      // const users: Array<User> = JSON.parse(
      //   localStorage.getItem("users") || "[]"
      // );
      // users.push(newUser);
      //localStorage.setItem("users", JSON.stringify(users));
      if (password.value === confirmPassword.value) {
        localStorage.setItem("currentUser", JSON.stringify(newUser));
        postUser(newUser);
        setMessage("You have been registered successfully!");
        navigate("/home/mobile-list");
        setError(initialState);
      } else {
        setError((value) => ({
          ...value,
          passwordError: "Enter currect password",
        }));
      }
    }
  };

  function Validate(newuser: User) {
    let isValid = true;

    users.map((user) => {
      if (user.email === newuser.email) {
        isValid = false;
        setError((value) => ({
          ...value,
          userError: "User email already exists",
        }));
      }
    });
    return isValid;
  }

  return (
    <div className="container-sm">
      <form onSubmit={submit} ref={formData}>
      <img className="login-img" src="https://dt9xom8irs6kr.cloudfront.net/u244019/qhKX4F0Q6jxQUrmRWTkQ1619503108.png"></img>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="name"
            required
            placeholder="Name"
          />
          <label className="form-label">Full Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className={error.userError ? "form-control is-invalid" : "form-control"}
            name="email"
            required
            placeholder="Email ID"
          />
          <label className="form-label">Email address</label>
          {error.userError && <div className="invalid-tooltip">
          {error.userError}.
        </div>}
        </div>
        <div className="mb-3 form-floating">
        <select className="form-select"  name="admin" >
          <option value="user">User</option>
          <option value="admin" >Admin</option>
        </select>
        <label className="form-label">User Type</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            name="password"
            required
            placeholder="Password"
          />
          <label className="form-label">Password</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className={error.passwordError ? "form-control is-invalid" : "form-control"}
            name="confirmPassword"
            required
            placeholder="Confirm Password"
          />
          <label className="form-label">Confirm Password</label>
        </div>
        {error.passwordError && (
          <div className="invalid-tooltip">*{error.passwordError}</div>
        )}
        <button type="submit" className="btn btn-primary mb-3">
          Submit
        </button>
      </form>
      {message && <Popup/>}
    </div>
  );
}

export default Register;
