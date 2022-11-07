import { MobileContext } from "../model/MobileContext";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import UsersList from "./UsersList";

describe("testing user-list page", () => {
  let users = [
    {
      name: "teju",
      email: "acd@wa.com",
      password: "123",
      id: 9,
      userType: "user",
      totalPrice: 0,
      deliveryAdd: "",
      orderStatus: "",
      cart: [],
    },
    {
      id: 3,
      name: "test",
      email: "test@test.com",
      password: "1234",
      userType: "admin",
      totalPrice: 0,
      deliveryAdd: "",
      orderStatus: "",
    },
  ];

  it("should test list of user", () => {
    act(() => {
      render(
        <MemoryRouter>
          <MobileContext.Provider value={{ users }}>
            <UsersList />
          </MobileContext.Provider>
        </MemoryRouter>
      );
    });
    expect(screen.getByText(/List of Users/i)).toBeInTheDocument();
    expect(screen.getAllByTestId("user-data").length).toBe(2);
    const button = screen.getAllByRole("button");
    expect(button.length).toBe(2);
  });

  it("should delete the user", () => {
    const deleteUser = jest.fn();
    deleteUser.mockImplementation(() => {
      users = users.filter((user) => user.id === 9);
    });
    act(() => {
      render(
        <MemoryRouter>
          <MobileContext.Provider value={{ users, deleteUser }}>
            <UsersList />
          </MobileContext.Provider>
        </MemoryRouter>
      );
    });
    expect(screen.getAllByTestId("user-data").length).toBe(2);
    const button = screen.getAllByRole("button");
    fireEvent.click(button[0]);
    expect(users.length).toBe(1);
    // expect(screen.getAllByTestId("user-data").length).toBe(1)
  });
});

describe("testing user-list page", () => {
  let users = [
    {
      name: "teju",
      email: "acd@wa.com",
      password: "123",
      id: 9,
      userType: "user",
      totalPrice: 123,
      deliveryAdd: "",
      orderStatus: "Pending",
      cart: [],
    },
  ];

  it("should test Pending order status", () => {
    const updateUser = jest.fn();
    updateUser.mockImplementation(() => {
      users[0].orderStatus = "Order Confirmed";
      users[0].totalPrice = 0;
      users[0].cart = [];
    });
    act(() => {
      render(
        <MemoryRouter>
          <MobileContext.Provider value={{ users, updateUser }}>
            <UsersList />
          </MobileContext.Provider>
        </MemoryRouter>
      );
    });

    expect(screen.getAllByTestId("user-data").length).toBe(1);
    expect(users[0].orderStatus).toEqual("Pending");
    const button = screen.getAllByRole("button");
    expect(button.length).toBe(2);
    fireEvent.click(button[0]);
    expect(users[0].orderStatus).toEqual("Order Confirmed");
    //expect(button.length).toBe(1)
  });
});
