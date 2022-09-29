import React from "react";
import { Mobile, contextType } from "../model/Mobile";
import { MobileContext } from "../model/MobileContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export interface Inputs {
  id?: string
  model: string
  ram: string
  rom: string
  price:number
  img:string
  modelError: string
  ramError: string
  romError: string
}

function AddEdit() {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const { model } = useParams();

  const {
    // mobileList,
    mobiles,
    postMobile,
    // addMobile,
    // updateMobile,
    updateMobiles,
  } = React.useContext(MobileContext) as contextType;

  const initialState: Inputs = {
    id: "",
    model: "",
    ram: "",
    rom: "",
    price:0,
    img:"",
    modelError: "",
    ramError: "",
    romError: "",
  };
  const [addEdit, setAddEdit] = React.useState<string>("");
  const [inputs, setInputs] = React.useState<Inputs>(initialState);

  React.useEffect(() => {
    var regEx = new RegExp("^/home/edit/[a-zA-Z0-9]");
    if (pathname === "/home/add") {
      setAddEdit("Add");
    } else if (regEx.test(pathname) && model) {
      setAddEdit("Edit");
      mobiles.map((mobile: Mobile) => {
        if (mobile.model === model) {
          setInputs({ ...mobile, img:mobile.img.toString(), modelError: "", ramError: "", romError: "" });
        }
      });
    }
  }, [pathname]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (Validate(inputs)) {
      if (addEdit === "Edit") {   
      //  console.log(inputs.img); 
        const images:string[] =  inputs.img.split(",");
        const editedMobile: Mobile = {
          id: inputs.id,
          model: inputs.model,
          ram: inputs.ram,
          rom: inputs.rom,
          price:inputs.price,
          count:1,
          img:images
        };
        //updateMobile({...inputs})
        updateMobiles(inputs.id ? inputs.id : "", editedMobile);
      } else if (addEdit === "Add") {
        
        const images:string[] =  inputs.img.split(",");
       
        const newMobile: Mobile = {
          id: new Date().getTime().toString(),
          model: inputs.model,
          ram: inputs.ram,
          rom: inputs.rom,
          price:inputs.price,
          count:1,
          img:images
        };
        //  addMobile(newMobile);
        postMobile(newMobile);
      }
      navigate("/home/mobile-list");
      setInputs(initialState);
      setAddEdit("");
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    //Validate(inputs);
  }

  function Validate(formInputs: Inputs) {
    let isValid = true;
    const ramRegExp = new RegExp("[0-9][0-9]*[a-zA-Z]*");
    switch (addEdit) {
      case "Edit":
        const newList = mobiles.filter(
          (mobile: Mobile) => mobile.id !== formInputs.id
        );
        newList.map((mobile: Mobile) => {
          if (mobile.model === formInputs.model) {
            isValid = false;
            setInputs((values) => ({
              ...values,
              modelError: "Model already exists",
            }));
          }
        });
        break;
      case "Add":
        mobiles.map((mobile: Mobile) => {
          if (mobile.model === formInputs.model) {
            isValid = false;
            setInputs((values) => ({
              ...values,
              modelError: "Model already exists",
            }));
          }
        });
        break;
      default:
        break;
    }

    if (!ramRegExp.test(formInputs.ram)) {
      isValid = false;
      setInputs((values) => ({
        ...values,
        ramError: `RAM should be in the form of "4GB/4mb"`,
      }));
    }
    if (!ramRegExp.test(formInputs.rom)) {
      isValid = false;
      setInputs((values) => ({
        ...values,
        romError: `Storage should be in the form of "24GB"`,
      }));
    }
    return isValid;
  }
  return (
    <div className=" my-3 add-edit">
      <h2>{addEdit} Mobile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3 ">
          <input
            type="text"
            className={
              inputs.modelError ? "form-control is-invalid" : "form-control"
            }
            name="model"
            required
            value={inputs.model}
            onChange={handleChange}
            placeholder="Model"
          />
          <label>Model</label>
        </div>
        {inputs.modelError && <p className="error-msg">*{inputs.modelError}</p>}
        <div className="form-floating mb-3">
          <input
            type="text"
            className={
              inputs.ramError ? "form-control is-invalid" : "form-control"
            }
            name="ram"
            required
            value={inputs.ram}
            onChange={handleChange}
            placeholder="RAM"
          />
          <label>RAM</label>
        </div>
        {inputs.ramError && <p className="error-msg">*{inputs.ramError}</p>}
        <div className="form-floating mb-3">
          <input
            type="text"
            className={
              inputs.romError ? "form-control is-invalid" : "form-control"
            }
            name="rom"
            required
            value={inputs.rom}
            onChange={handleChange}
            placeholder="Storage"
          />
          <label>Storage</label>
        </div>
        {inputs.romError && <p className="error-msg">*{inputs.romError}</p>}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="price"
            required
            value={inputs.price}
            onChange={handleChange}
            placeholder="Price"
          />
        <label>Price</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="img"
            required
            value={inputs.img}
            onChange={handleChange}
            placeholder="Image URL"
          />
        <label>Image URL</label>
        </div>
        <button className="btn btn-primary" type="submit">
          {addEdit}
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
  );
}

export default AddEdit;
