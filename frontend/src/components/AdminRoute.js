import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const AdminRoute = ({ component: Component, ...reset }) => {
  const { userInfo } = useSelector((state) => state.userSignin)
  return (
    <Route
      {...reset}
      render={(props) =>
        userInfo && userInfo.isAdmin ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  )
}

export default AdminRoute
