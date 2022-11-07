import { MobileContext } from "./model/MobileContext";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Order from "./Order";
import userEvent from "@testing-library/user-event";

describe("testing order page", () => {
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

  it("should test address form", () => {
    const updateUser = jest.fn();
    updateUser.mockImplementation((user) => {
      localStorage.setItem("currentUser", JSON.stringify(user));
    });
    act(() => {
      render(
        <MemoryRouter>
          <MobileContext.Provider value={{ updateUser }}>
                   <Order />
                 </MobileContext.Provider>
        </MemoryRouter>
      );
    });
    expect(screen.getByText(/Delivery Address/i)).toBeInTheDocument();
    const button = screen.getAllByRole("button");
    expect(button.length).toBe(2);
    expect(button[0].textContent).toEqual("Submit");
    expect(button[1].textContent).toEqual("Back");
    const form = screen.getByPlaceholderText(/address/i);
    expect(form).toBeInTheDocument();
    expect(form.value).toEqual("");
    userEvent.type(screen.getByRole("textbox"), "B");
    //expect(screen.getByText('Banglore')).toBeInTheDocument();

    let currentUser = JSON.parse(localStorage.getItem("currentUser") || "");
    expect(currentUser.deliveryAdd).toEqual("B");
    userEvent.click(button[0]);
    currentUser = JSON.parse(localStorage.getItem("currentUser") || "");
    expect(currentUser.orderStatus).toBe("Pending");
    //expect(screen.getByText(/Delivery Address/i)).not.toBeInTheDocument();

    //checking back button
    fireEvent.click(button[1]);
    //expect(screen.getByText(/Delivery Address/i)).not.toBeInTheDocument();
  });
});
