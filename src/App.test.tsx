import { MemoryRouter } from 'react-router-dom';
const { render, screen } = require('@testing-library/react');
import App from './App';
import AddEdit from './components/Admin/AddEdit';
import Auth from './components/Auth/Auth';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Home';
import MobileList from './components/MobileList';
import PageNotFound from './components/PageNotFound';
import Profile from './components/Profile';
import UsersList from './components/Admin/UsersList';
import Search from './components/Search';
import Order from './components/Order';
import Cart from './components/Cart';

jest.mock('./components/Auth/Auth.tsx')
jest.mock('./components/Auth/Login')
jest.mock('./components/Auth/Register')
jest.mock('./components/Home')
jest.mock('./components/MobileList')
jest.mock('./components/Profile')
jest.mock('./components/Admin/AddEdit')
jest.mock('./components/Admin/UsersList')
jest.mock('./components/Cart')
jest.mock('./components/Order')
jest.mock('./components/Search')
jest.mock('./components/PageNotFound')

describe('testing the routes',()=>{
  test("testing default page",()=>{
    const mockedAuth = Auth  as jest.MockedFunction<typeof Auth>
    mockedAuth.mockImplementation(() =>{return (<div>HomePage Mock</div>)})
    render(<MemoryRouter><App /></MemoryRouter>);
    expect(screen.getByText("HomePage Mock")).toBeInTheDocument();
  });
  test("testing Login page",()=>{
    const mockedLogin = Auth as jest.MockedFunction<typeof Login>
    mockedLogin.mockImplementation(() =>{return (<div>Login page</div>)});
    render(<MemoryRouter initialEntries={['/login']}><App /></MemoryRouter>);
    expect(screen.getByText("Login page")).toBeInTheDocument();
  });
  test("testing Signup page",()=>{
    const mockedsignup = Auth as jest.MockedFunction<typeof Register>
    mockedsignup.mockImplementation(() =>{return (<div>signup page</div>)})
    render(<MemoryRouter initialEntries={['/sign-up']}><App /></MemoryRouter>);
    expect(screen.getByText("signup page")).toBeInTheDocument();
  });
  test("testing Home page",()=>{
    const mockedHome = Home as jest.MockedFunction<typeof Home>
    mockedHome.mockImplementation(() =>{return (<div >Home page</div>)})
    render(<MemoryRouter initialEntries={['/home']}><App /></MemoryRouter>)
    expect(screen.getByText("Home page")).toBeInTheDocument();
  });
  test("testing MobileList page",()=>{
    const mockedMobileList = Home  as jest.MockedFunction<typeof MobileList>
    mockedMobileList.mockImplementation(() =>{return (<div>MobileList page</div>)})
    render(<MemoryRouter initialEntries={['/home/mobile-list']}><App /></MemoryRouter>);
    expect(screen.getByText("MobileList page")).toBeInTheDocument();
  });
  test("testing AddEdit page",()=>{
    const mockedAddEdit = Home as jest.MockedFunction<typeof AddEdit>
    mockedAddEdit.mockImplementation(() =>{return (<div>AddEdit page</div>)})
    render(<MemoryRouter initialEntries={['/home/add']}><App /></MemoryRouter>);
    expect(screen.getByText("AddEdit page")).toBeInTheDocument();
  });
  test("testing UserList page",()=>{
    const mockedUsersList = Home as jest.MockedFunction<typeof UsersList>
    mockedUsersList.mockImplementation(() =>{return (<div>UsersList page</div>)})
    render(<MemoryRouter initialEntries={['/home/users-list']}><App /></MemoryRouter>);
    expect(screen.getByText("UsersList page")).toBeInTheDocument();
  });
  test("testing Edit page",()=>{
    const mockedEdit = Home as jest.MockedFunction<typeof AddEdit>
    mockedEdit.mockImplementation(() =>{return (<div>Edit page</div>)})
    render(<MemoryRouter initialEntries={['/home/edit/test']}><App /></MemoryRouter>);
    expect(screen.getByText("Edit page")).toBeInTheDocument();
  });
  test("testing Profile page",()=>{
    const mockedProfile = Home as jest.MockedFunction<typeof Profile>
    mockedProfile.mockImplementation(() =>{return (<div>Profile page</div>)})
    render(<MemoryRouter initialEntries={['/home/profile']}><App /></MemoryRouter>);
    expect(screen.getByText("Profile page")).toBeInTheDocument();
  });
  test("testing Search page",()=>{
    const mockedSearch = Home as jest.MockedFunction<typeof Search>
    mockedSearch.mockImplementation(() =>{return (<div>Search page</div>)})
    render(<MemoryRouter initialEntries={['/home/view/test']}><App /></MemoryRouter>);
    expect(screen.getByText("Search page")).toBeInTheDocument();
  });
  test("testing Cart page",()=>{
    const mockedCart = Home as jest.MockedFunction<typeof Cart>
    mockedCart.mockImplementation(() =>{return (<div>Cart page</div>)})
    render(<MemoryRouter initialEntries={['/home/cart']}><App /></MemoryRouter>);
    expect(screen.getByText("Cart page")).toBeInTheDocument();
  })
  test("testing Order page",()=>{
    const mockedOrder = Home as jest.MockedFunction<typeof Order>
    mockedOrder.mockImplementation(() =>{return (<div>Order page</div>)})
    render(<MemoryRouter initialEntries={['/home/cart/order']}><App /></MemoryRouter>);
    expect(screen.getByText("Order page")).toBeInTheDocument();
  });
  test('valid path should not redirect to 404', () => {
    const mocked404 = PageNotFound as jest.MockedFunction<typeof PageNotFound>
    mocked404.mockImplementation(() =>{return (<div>PageNotFound</div>)})
    render(<MemoryRouter initialEntries={[ '/test' ]}> <App/></MemoryRouter>);
    expect(screen.getByText('PageNotFound')).toBeInTheDocument
  });
})

