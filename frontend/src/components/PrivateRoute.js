import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRouter = ({ component: Component, ...reset }) => {
  const { userInfo } = useSelector((state) => state.userSignin)
  return (
    <Route
      {...reset}
      render={(props) =>
        userInfo ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  )
}

export default PrivateRouter
