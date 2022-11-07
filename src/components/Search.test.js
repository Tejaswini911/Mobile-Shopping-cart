import { MobileContext } from "./model/MobileContext";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Search from "./Search";
import App from "../App";

describe("testing mobile search page by user", () => {
  let mobiles = [
    {
      id: "1663581511270",
      model: "a9",
      ram: "18gb",
      rom: "150gb",
      price: 12000,
      count: 1,
      img: [
        "https://www.businessinsider.in/photo/79527794/vivo-v20-pro-smartphone-with-64mp-camera-6-44-inch-display-launched-in-india.jpg?imgsize=84407",
        "https://mensgear.net/wp-content/uploads/2019/07/lg-stylus-2.jpg",
      ],
    },
  ];

  beforeEach(() => {
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        name: "teju",
        email: "acd@wa.com",
        password: "123",
        id: 9,
        userType: "user",
        totalPrice: 0,
        deliveryAdd: "",
        orderStatus: "No Order",
        cart: [],
      })
    );
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("mobile not found", () => {
    act(() => {
      render(
        <MemoryRouter>
          <MobileContext.Provider value={{ mobiles }}>
            <Search />
          </MobileContext.Provider>
        </MemoryRouter>
      );
    });
    expect(screen.getByText(/Mobile Not Found/i)).toBeInTheDocument();
    const button = screen.getAllByRole("button");
    expect(button.length).toBe(2);
    expect(button[1].textContent).toEqual("Close");
  });
  it("should test mobile details", () => {

      const addToCart = jest.fn()
      addToCart.mockImplementation(()=>{});
    act(() => {
      render(
     
        <MemoryRouter initialEntries={["/home/view/a9"]} >
          <MobileContext.Provider value={{ mobiles, addToCart }}>
            <Search />
          </MobileContext.Provider>
        </MemoryRouter>
      );
    });
    expect(screen.getByText(/Mobile Details/i)).toBeInTheDocument();
    const button = screen.getAllByRole("button");
  });
});

describe("testing mobile search page by admin", () => {
  let mobiles = [
    {
      id: "1663581511270",
      model: "a9",
      ram: "18gb",
      rom: "150gb",
      price: 12000,
      count: 1,
      img: [
        "https://www.businessinsider.in/photo/79527794/vivo-v20-pro-smartphone-with-64mp-camera-6-44-inch-display-launched-in-india.jpg?imgsize=84407",
        "https://mensgear.net/wp-content/uploads/2019/07/lg-stylus-2.jpg",
      ],
    },
  ];

  beforeEach(() => {
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        name: "teju",
        email: "acd@wa.com",
        password: "123",
        id: 9,
        userType: "admin",
        totalPrice: 0,
        deliveryAdd: "",
        orderStatus: "",
        cart: [],
      })
    );
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("mobile not found", () => {
    act(() => {
      render(
        <MemoryRouter>
          <MobileContext.Provider value={{ mobiles }}>
            <Search />
          </MobileContext.Provider>
        </MemoryRouter>
      );
    });
    expect(screen.getByText(/Mobile Not Found/i)).toBeInTheDocument();
    const button = screen.getAllByRole("button");
    expect(button.length).toBe(3);
    expect(button[2].textContent).toEqual("Close");
  });
});
