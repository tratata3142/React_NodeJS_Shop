import React, { useEffect } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import Product from '../components/Product'
import MessageBox from '../components/MessageBox'
import LoadingBox from '../components/LoadingBox'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../redux/actions/productActions'
import { listTopSellers } from '../redux/actions/userActions'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const dispatch = useDispatch()
  const { loading, error, products } = useSelector((state) => state.productList)
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = useSelector((state) => state.userTopSellerList)

  useEffect(() => {
    dispatch(listProducts({}))
    dispatch(listTopSellers())
  }, [dispatch])

  return (
    <div>
      <h2>Top Sellers</h2>
      {loadingSellers ? (
        <LoadingBox></LoadingBox>
      ) : errorSellers ? (
        <MessageBox variant={'danger'}>{errorSellers}</MessageBox>
      ) : (
        <>
          {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
          <Carousel
            showArrows
            autoPlay
            showThumbs={false}
            infiniteLoop
            showStatus={false}
          >
            {sellers.map((seller) => (
              <div key={seller._id}>
                <Link to={`/seller/${seller._id}`}>
                  <img src={seller.seller.logo} alt={seller.seller.name} />
                  <p className="legend">{seller.seller.name}</p>
                </Link>
              </div>
            ))}
          </Carousel>
        </>
      )}
      <h2>Featured Products</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant={'danger'}>{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default HomePage
