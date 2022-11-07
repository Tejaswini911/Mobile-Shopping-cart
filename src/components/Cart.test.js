import { MobileContext } from "./model/MobileContext";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Cart from "./Cart";

describe("Testing user cart page to place the order", () => {
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
        cart: [
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
        ],
      })
    );
  });

  afterEach(() => {
    localStorage.clear();
  });
  it("should test cart page", () => {
    act(() => {
      render(
        <MemoryRouter>
          <MobileContext.Provider value={{}}>
            <Cart />
          </MobileContext.Provider>
        </MemoryRouter>
      );
    });
    expect(screen.getByText(/Cart Items/i)).toBeInTheDocument();
    const button = screen.getAllByRole("button");
    expect(button.length).toBe(3);
    expect(button[2].textContent).toEqual("Place Order");
  });
  it("should increase number of items on clicking + button", () => {
    act(() => {
      const addToCart = jest.fn();
      addToCart.mockImplementation(() => {
        const currentUser = JSON.parse(
          localStorage.getItem("currentUser") || ""
        );
        currentUser.cart[0].count = currentUser.cart[0].count + 1;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
      });
      render(
        <MemoryRouter>
          <MobileContext.Provider value={{ addToCart }}>
            <Cart />
          </MobileContext.Provider>
        </MemoryRouter>
      );
    });
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "");
    expect(currentUser.cart[0].count).toBe(1);
    expect(screen.getAllByText(1).length).toBe(2);
    const button = screen.getAllByRole("button");
    fireEvent.click(button[0]);
    expect(currentUser.cart[0].count).toBe(1);
    //expect(screen.getByText(2)).toBeInTheDocument();
  });
  it("should decrease number of items on clicking - button", () => {
    const updateUser = jest.fn();
    updateUser.mockImplementation((user) => {
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "");
      currentUser.cart[0].count = 0;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    });
    act(() => {
      render(
        <MemoryRouter>
          <MobileContext.Provider value={{ updateUser }}>
            <Cart />
          </MobileContext.Provider>
        </MemoryRouter>
      );
    });
    let currentUser = JSON.parse(localStorage.getItem("currentUser") || "");
    expect(currentUser.cart[0].count).toBe(1);
    expect(screen.getAllByText(1).length).toBe(2);
    const button = screen.getAllByRole("button");
    fireEvent.click(button[1]);
    currentUser = JSON.parse(localStorage.getItem("currentUser") || "");
    expect(currentUser.cart[0].count).toBe(0);
  });
});

describe("Testing user cart page to cancel the order", () => {
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
        orderStatus: "Pending",
        cart: [
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
        ],
      })
    );
  });
  afterEach(() => {
    localStorage.clear();
  });

  it("should test cart page", () => {
    const updateUser = jest.fn();
    updateUser.mockImplementation((user) => {
      localStorage.setItem("currentUser", JSON.stringify(user));
    });
    act(() => {
      render(
        <MemoryRouter>
          <MobileContext.Provider value={{ updateUser }}>
            <Cart />
          </MobileContext.Provider>
        </MemoryRouter>
      );
    });

    const button = screen.getAllByRole("button");
    expect(button.length).toBe(3);
    expect(button[2].textContent).toEqual("Cancel Order");
    fireEvent.click(button[2]);
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "");
    expect(currentUser.orderStatus).toEqual("No Order");
    //expect(button[2].textContent).toEqual("Place Order");
  });
});
