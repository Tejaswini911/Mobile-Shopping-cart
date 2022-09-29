import React from "react";
import { useNavigate } from "react-router-dom";
import { MobileContext } from "../model/MobileContext";
import { contextType } from "../model/Mobile";
import Popup from "../Popup";

function Login() {
  const formData: React.MutableRefObject<any> = React.useRef();
  const navigate = useNavigate();
  const [msg, setMsg] = React.useState<string>("");
  const { users, message, setMessage,setCurrentUser  } = React.useContext(MobileContext) as contextType;

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMsg("Email or Password is incorrect");
    const { email, password } = formData.current;
    //const users = JSON.parse(localStorage.getItem('users') || '');
    users.map((user) => {
      if (user.email === email.value && user.password === password.value) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        setCurrentUser(user)
        setMessage("You have been signed in successfully!");
        setMsg('');
        navigate("/home/mobile-list");
      }
    });
  }


  return (
    <div className="container-sm">
      <form onSubmit={submit} ref={formData}>
        
        <img className="login-img" src="https://dt9xom8irs6kr.cloudfront.net/u244019/qhKX4F0Q6jxQUrmRWTkQ1619503108.png"></img>
        <div className="form-floating mb-3">
         
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
          />
           <label>Email</label>
        </div>
        <div className="form-floating mb-3">
          
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
          />
          <label>Password</label>
        </div>
        {msg && <p className="error-msg">*{msg}</p>}
        <button className="btn btn-primary mb-3" type={"submit"}>
          Submit
        </button>
        {message && <Popup/>}
      </form>
    </div>
  );
}

export default Login;
