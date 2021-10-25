import { BrowserRouter, Route } from 'react-router-dom'
import ProductPage from './pages/ProductPage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <a className="brand" href="/">
              amazona
            </a>
          </div>
          <div>
            <a href="/cart">Cart</a>
            <a href="/signin">Sign In</a>
          </div>
        </header>
        <main>
          <Route path="/" component={HomePage} exact />
          <Route path="/product/:id" component={ProductPage} />
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  )
}

export default App
