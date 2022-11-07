import { MobileContext } from "./model/MobileContext";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Profile from "./Profile";
import userEvent from "@testing-library/user-event";

describe("trsting user Profile page", () => {
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
  it("should contain user details", () => {
    const updateUser = jest.fn();
    updateUser.mockImplementation((user) => {
      localStorage.setItem("currentUser", JSON.stringify(user));
    });
    act(() => {
      render(
        <MemoryRouter>
          <MobileContext.Provider value={{ updateUser }}>
            <Profile />
          </MobileContext.Provider>
        </MemoryRouter>
      );
    });
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
    const button = screen.getAllByRole("button");
    expect(button.length).toBe(2);
    expect(screen.getAllByRole("textbox")[0]).toHaveValue("teju");

    expect(button[0].value).toEqual("Save Changes");
    expect(button[1]).toHaveValue("Log Out");

    let currentUser = JSON.parse(localStorage.getItem("currentUser") || "");
    expect(currentUser.name).toEqual("teju");
    userEvent.type(screen.getAllByRole("textbox")[0], "test");
    userEvent.type(button[0]);
    currentUser = JSON.parse(localStorage.getItem("currentUser") || "");
    expect(currentUser.name).toEqual("tejutest");
    expect(screen.getAllByRole("textbox")[0]).toHaveValue("tejutest");

    //Logout button testing
    userEvent.type(button[1]);
    expect(screen.getByRole("generic")).toBeInTheDocument();
    // expect(screen.getAllByRole("textbox")[0]).not.toHaveValue("teju");
  });
});
