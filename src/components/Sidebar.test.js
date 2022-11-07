import { MobileContext } from "./model/MobileContext";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Sidebar from "./Sidebar";
import userEvent from "@testing-library/user-event";

describe('testing sidebar & nav menu of user screen',()=>{
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

    it('testing',()=>{
        act(()=>{
            render(
            <MemoryRouter initialEntries={['/home']}>
                <MobileContext.Provider value={{mobiles}}>
                    <Sidebar/>
                </MobileContext.Provider>
            </MemoryRouter>)
        });
        expect(screen.getByText(/Mobile Database/i)).toBeInTheDocument();

        const button = screen.getAllByRole('button');
        expect(button.length).toBe(1);
        expect(button[0].textContent).toEqual('Search')

        const search = screen.getByPlaceholderText(/search/i)
        expect(search).toBeInTheDocument();
        //typing 'a' in the search field
        userEvent.type(search,'a')
        expect(search.value).toBe('a');
        //checking the dynamic search filter result
        expect(screen.getAllByTestId('mobile').length).toBe(1);
        //clicking on the search result
        userEvent.click(screen.getAllByTestId('mobile')[0]);
           //expect(screen.getByText(/Mobile Database/i)).not.toBeInTheDocument()
        //clicking search button
        fireEvent.click(button[0]);
         //expect(screen.getByText(/Mobile Database/i)).not.toBeInTheDocument()


        expect(screen.getByText(/Cart/i)).toBeInTheDocument();
        // fireEvent.click(screen.getByText('Log Out'));
        // expect(screen.getByText(/Mobile Database/i)).not.toBeInTheDocument()
        
    })
})

describe('testing sidebar & nav menu of admin screen',()=>{
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
            orderStatus: "No Order",
            cart: [],
          })
        );
      });
    
      afterEach(() => {
        localStorage.clear();
      });

    it('testing',()=>{
        act(()=>{
            render(
            <MemoryRouter initialEntries={['/home']}>
                <MobileContext.Provider value={{mobiles}}>
                    <Sidebar/>
                </MobileContext.Provider>
            </MemoryRouter>)
        });
        expect(screen.getByText(/Mobile Database/i)).toBeInTheDocument();
        expect(screen.getByText('Mobile List')).toBeInTheDocument();
        expect(screen.getByText('Add/Edit Mobile')).toBeInTheDocument();
        expect(screen.getByText('Users List')).toBeInTheDocument();
        expect(screen.getByText('User Profile')).toBeInTheDocument();
        
    })
})