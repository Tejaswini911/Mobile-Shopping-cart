import "./App.css";
import {  Route,  Routes } from "react-router-dom";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Home from "./components/Home";
import AddEdit from "./components/Admin/AddEdit";
import MobileList from "./components/MobileList";
import MobileProvider from "./components/model/MobileContext";
import Search from "./components/Search";
import Profile from "./components/Profile";
import Auth from "./components/Auth/Auth";
import PageNotFound from "./components/PageNotFound";
import UsersList from "./components/Admin/UsersList";
import Cart from "./components/Cart";
import Order from "./components/Order";


function App() {
  
  return (
    <div className="App">
      
      <MobileProvider>
      
        <Routes>
          <Route path="/" element={<Auth/>}>
          <Route path="sign-up" element={<Register />}></Route>
          <Route path="login"  element={<Login />}></Route>
          </Route>
         
          <Route path="/home" element={<Home />}>
            <Route path="mobile-list" element={<MobileList/>}> </Route>
            <Route path="edit/:model" element={<AddEdit/>}></Route>
            <Route path="add" element={<AddEdit/>}/>
            <Route path="profile" element={<Profile/>}/>
            <Route path="view/:model" element={<Search/>}></Route>
            <Route path="users-list" element={<UsersList/>}></Route>
            <Route path="cart" element={<Cart/>}>
              <Route path="order" element={<Order/>}></Route>
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound/>} />
          
        </Routes>
   
      </MobileProvider>
    </div>
  );
}

export default App;
