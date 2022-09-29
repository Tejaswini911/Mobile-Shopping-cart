import axios from "axios";
import React from "react";
import { Mobile, User } from "./Mobile";

// const reducer = (state:any, action:any) => {
//   switch(action.type) {
//     case "Add": return axios.post("http://localhost:5000/mobiles", action.mobile).catch((err)=>console.log(err));
//     case "Delete": return axios.delete(`http://localhost:5000/mobiles/${action.id}`).catch((err) => console.log(err));
//     case "Update": return axios.put(`http://localhost:5000/mobiles/${action.id}`, action.mobile).catch((err)=>console.log(err));
//     default: return state
//   }
// }

export const MobileContext = React.createContext({});
interface Props {
  children: React.ReactNode;
}

const MobileProvider: React.FC<Props> = ({ children }) => {
 
  const [users, setUsers] = React.useState<User[]>();
  const [loading, setLoading] = React.useState<boolean>();
  const [mobiles, setMobiles] = React.useState<Mobile[]>();
  const [message, setMessage] = React.useState<string>();
  const [currentUser, setCurrentUser] = React.useState<User>();
  axios.defaults.baseURL="http://localhost:8081/"
  axios.defaults.timeout = 5000;

  axios.interceptors.request.use(function (config) {
    setLoading(true)
    return config;
  }, function (error) { 
    return Promise.reject(error);
  });


axios.interceptors.response.use(function (response) {
    setLoading(false)
    return response;
  }, function (error) {
    
    return Promise.reject(error);
  });

  // const url = "http://localhost:5000/users";
  // const mobils_url = "http://localhost:5000/mobiles";

  React.useEffect(() => {
    getUsers();
    getMobiles();
  }, []);

  const postUser = (user: User) => {
    axios
      .post("addUser", user)
      .then(() => {getUsers();setCurrentUser(user)})
      .catch((err) => console.log(err.message));
  };

  const updateUser = (id: number|string, user: User) => {
    axios
      .post(`editUser`, user)
      .then(() =>{ getUsers();localStorage.setItem('currentUser', JSON.stringify(user)); setCurrentUser(user)})
      .catch((err) => console.log(err.message));
  };
  
  const deleteUser = (id: number|string) => {
    axios
      .delete(`deleteUser/${id}`)
      .then(() => getUsers())
      .catch((err) => console.log(err));
  };

  const getUsers = () => {
    axios
      .get("users")
      .then((data) => setUsers(data.data))
      .catch((error) => console.log(error));
  };

  const postMobile = (mobile: Mobile) => {
    axios
    .post("addMobile", mobile)
    .then(() => getMobiles())
    .catch((err)=>console.log(err));
  };

  const updateMobiles = (id: string, mobile: Mobile) =>{ 
    axios
      .post("editMobile", mobile)
      .then(() => getMobiles())
      .catch((err) => console.log(err));
  };

  const deleteMobiles = (id: string) => {
    axios
      .delete(`delete/${id}`)
      .then(() => getMobiles())
      .catch((err) => console.log(err));
  };

  const getMobiles = () => {
    axios
      .get("mobiles")
      .then((data) => setMobiles(data.data))
      .catch((error) => console.log(error));
  };

  // const [mobileList, dispatch] = React.useReducer<any>(reducer,mobiles);
  // console.log(mobileList);
  // React.useEffect(() => {
  //   localStorage.setItem("mobileList", JSON.stringify(mobileList));
  // }, [mobileList]);
  return (
    <MobileContext.Provider
      value={{
        users,
        mobiles,
        loading,
        message,
        currentUser,
        setCurrentUser,
        setMessage,
        postUser,
        updateUser,
        deleteUser,
        postMobile,
        updateMobiles,
        deleteMobiles,
        // mobileList,
        // addMobile,
        // updateMobile,
        // deleteMobile,
        // mobileList,
        // dispatch,
      }}
    >
      {children}
    </MobileContext.Provider>
  );
};

export default MobileProvider;
//>npx json-server src/api/db.json --port 5000


 // const [mobileList, setMobileList] = React.useState<Mobile[]>(
  //   JSON.parse(
  //     localStorage.getItem("mobileList") ||
  //       `[
  //   { id: "1662023711235", model: "a6+", ram: "6gb", rom: "64gb" },
  //   { id: "1662023711345", model: "a6", ram: "4gb", rom: "32gb" },
  // ]`
  //   )
  // );

//Post method
   // const options = {
    //   method:"POST",
    //   headers :{
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    //   body:JSON.stringify(mobile)
    // }
    // fetch(mobils_url,options).then((res)=>res.json).then(()=>getMobiles()).catch((err)=>console.log(err));

   // const options = {
  //   method:"GET",
  //   headers :{
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //   }
  // }

  // fetch(mobils_url,options).then((res)=>res.json).then((res) => {
  //   setMobiles((prev)=>[...prev, res])
  // }).catch((err)=>console.log(err));

  /*
  React.useEffect(() => {
    localStorage.setItem("mobileList", JSON.stringify(mobileList));
  }, [mobileList]);

  const addMobile = (mobile: Mobile) => {
    const newMobile: Mobile = {
      id: new Date().getTime().toString(), // not really unique - but fine for this example
      model: mobile.model,
      ram: mobile.ram,
      rom: mobile.rom,
    };
    setMobileList([...mobileList, newMobile]);
  };

  const updateMobile = (editedMobile: Mobile) => {
    setMobileList(
      mobileList.map((mobile: Mobile) =>
        mobile.id === editedMobile.id
          ? { id: mobile.id, ...editedMobile }
          : mobile
      )
    );
  };

  const deleteMobile = (model: string) => {
    setMobileList(mobileList.filter((mobile) => mobile.model !== model));
  };
*/