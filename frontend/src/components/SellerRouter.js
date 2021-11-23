import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const SellerRoute = ({ component: Component, ...reset }) => {
  const { userInfo } = useSelector((state) => state.userSignin)
  return (
    <Route
      {...reset}
      render={(props) =>
        userInfo && userInfo.isSeller ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  )
}

export default SellerRoute
