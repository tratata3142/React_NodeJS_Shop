import { BrowserRouter, Link, Route } from 'react-router-dom'
import ProductPage from './pages/ProductPage'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import { useDispatch, useSelector } from 'react-redux'
import SigninPage from './pages/SigninPage'
import { signout } from './redux/actions/userActions'
import RegisterPage from './pages/RegisterPage'
import ShippingAddressPage from './pages/ShippingAddressPage'
import PaymentMethodPage from './pages/PaymentMethodPage'
import PlaceOrderPage from './pages/PlaceOrderPage'
import OrderPage from './pages/OrderPage'
import OrderHistoryPage from './pages/OrderHistoryPage'
import ProfilePage from './pages/ProfilePage'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import ProductListPage from './pages/ProductListPage'
import ProductEditPage from './pages/ProductEditPage'
import OrderListPage from './pages/OrderListPage'
import UserListPage from './pages/UserListPage'
import UserEditPage from './pages/UserEditPage'
import SellerPage from './pages/SellerPage'
import SellerRoute from './components/SellerRouter'
import SearchBox from './components/SearchBox'
import ChatBox from './components/ChatBox'
import SearchPage from './pages/SearchPage'
import { useEffect, useState } from 'react'
import { listProductCategories } from './redux/actions/productActions'
import MessageBox from './components/MessageBox'
import LoadingBox from './components/LoadingBox'
import MapPage from './pages/MapPage'
import SupportPage from './pages/SupportPage'

function App() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)
  const { cartItems } = useSelector((state) => state.cart)
  const { userInfo } = useSelector((state) => state.userSignin)
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = useSelector((state) => state.productCategoryList)
  const dispatch = useDispatch()

  const signoutHandler = () => {
    dispatch(signout())
  }

  useEffect(() => {
    dispatch(listProductCategories())
  }, [dispatch])

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <button
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars" />
            </button>
            <Link className="brand" to="/">
              amazona
            </Link>
          </div>
          <div>
            <Route render={({ history }) => <SearchBox history={history} />} />
          </div>
          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down" />{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#seller">
                  Seller <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orderlist/seller">Orders</Link>
                  </li>
                  <li>
                    <Link to="/productlist/seller">Products</Link>
                  </li>
                </ul>
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                  <li>
                    <Link to="/support">Support</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                className="close-sidebar"
                onClick={() => setSidebarIsOpen(false)}
              >
                <i className="fa fa-close" />
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
        <main>
          <Route path="/" component={HomePage} exact />
          <Route path="/product/:id" component={ProductPage} exact />
          <Route path="/product/:id/edit" component={ProductEditPage} exact />
          <Route path="/cart/:id?" component={CartPage} />
          <Route path="/signin" component={SigninPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/shipping" component={ShippingAddressPage} />
          <Route path="/payment" component={PaymentMethodPage} />
          <Route path="/placeorder" component={PlaceOrderPage} />
          <Route path="/order/:id" component={OrderPage} />
          <Route path="/orderhistory" component={OrderHistoryPage} />
          <Route path="/seller/:id" component={SellerPage} />
          <Route path="/search/name/:name?" component={SearchPage} exact />
          <Route
            path="/search/name/:name?"
            component={SearchPage}
            exact
          ></Route>
          <Route
            path="/search/category/:category"
            component={SearchPage}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            component={SearchPage}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
            component={SearchPage}
            exact
          ></Route>
          <PrivateRoute path="/profile" component={ProfilePage} />
          <PrivateRoute path="/map" component={MapPage} />
          <AdminRoute path="/productlist" component={ProductListPage} exact />
          <AdminRoute
            path="/productlist/pageNumber/:pageNumber"
            component={ProductListPage}
            exact
          />
          <AdminRoute path="/orderlist" component={OrderListPage} exact />
          <AdminRoute path="/userlist" component={UserListPage} />
          <AdminRoute path="/support" component={SupportPage} />
          <AdminRoute path="/user/:id/edit" component={UserEditPage} />
          <SellerRoute path="/productlist/seller" component={ProductListPage} />
          <SellerRoute path="/orderlist/seller" component={OrderListPage} />
        </main>
        <footer className="row center">
          {userInfo && !userInfo.isAdmin && (
            <ChatBox userInfo={userInfo}></ChatBox>
          )}
          <div>All right reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
