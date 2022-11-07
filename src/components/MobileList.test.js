import MobileList from "./MobileList";
import { MobileContext } from "./model/MobileContext";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("testing Mobile list component of admin", () => {
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

  it("should test title and mobile list", async () => {
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        id: 3,
        name: "test",
        email: "test@test.com",
        password: "1234",
        userType: "admin",
        totalPrice: 0,
        deliveryAdd: "",
        orderStatus: "",
      })
    );
    act(() => {
      render(
        <MemoryRouter>
          <MobileContext.Provider value={{ mobiles }}>
            <MobileList />
          </MobileContext.Provider>
        </MemoryRouter>
      );
    });
    expect(screen.getByText(/List of Mobiles/i)).toBeInTheDocument();
    expect(screen.getAllByTestId("test").length).toBe(1);
  });

  it("should test buttons", async () => {
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        id: 3,
        name: "test",
        email: "test@test.com",
        password: "1234",
        userType: "admin",
        totalPrice: 0,
        deliveryAdd: "",
        orderStatus: "",
      })
    );
    act(() => {
      render(
        <MemoryRouter>
          <MobileContext.Provider value={{ mobiles }}>
            <MobileList />
          </MobileContext.Provider>
        </MemoryRouter>
      );
    });
    const button = screen.getAllByRole("button");
    expect(button.length).toBe(4);
    fireEvent.click(button[2]);
    //expect(screen.getByText('Edit Mobile')).toBeInTheDocument();
  });

  it("should test delete buttons", async () => {
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        id: 3,
        name: "test",
        email: "test@test.com",
        password: "1234",
        userType: "admin",
        totalPrice: 0,
        deliveryAdd: "",
        orderStatus: "",
      })
    );
    act(() => {
      const deleteMobiles = jest.fn();
      deleteMobiles.mockImplementationOnce(() => {
        mobiles = [];
      });
      render(
        <MemoryRouter>
          <MobileContext.Provider value={{ mobiles, deleteMobiles }}>
            <MobileList />
          </MobileContext.Provider>
        </MemoryRouter>
      );
    });
    const button = screen.getAllByRole("button");
    fireEvent.click(button[3]);
    expect(mobiles.length).toBe(0);
  });
});

describe("testing user", () => {
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

  it("should test mobile list and buttons", async () => {
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
        orderStatus: "",
        cart: [],
      })
    );
    act(() => {
      render(
        <MemoryRouter>
          <MobileContext.Provider value={{ mobiles }}>
            <MobileList />
          </MobileContext.Provider>
        </MemoryRouter>
      );
    });
    expect(screen.getByText(/List of Mobiles/i)).toBeInTheDocument();
    expect(screen.getAllByTestId("test").length).toBe(1);
    const button = screen.getAllByRole("button");
    expect(button.length).toBe(3);
  });

  it("should test mobile list and buttons", async () => {
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
        orderStatus: "",
        cart: [],
      })
    );
    let currentUser = JSON.parse(localStorage.getItem("currentUser") || "");
    const addToCart = jest.fn();
    addToCart.mockImplementation(() => {
      currentUser.cart = mobiles;
      currentUser.totalPrice = mobiles[0].price;
    });
    const setMessage = jest.fn();
    act(() => {
      render(
        <MemoryRouter>
          <MobileContext.Provider value={{ mobiles, addToCart, setMessage }}>
            <MobileList />
          </MobileContext.Provider>
        </MemoryRouter>
      );
    });
    expect(currentUser.cart.length).toBe(0);
    const button = screen.getAllByRole("button");
    fireEvent.click(button[2]);
    expect(currentUser.cart.length).toBe(1);
    expect(currentUser.totalPrice).toBe(12000);
  });
});
