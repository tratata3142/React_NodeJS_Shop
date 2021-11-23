import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { detailsUser, updateUserProfile } from '../redux/actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../redux/constants/userConstants'

const ProfilePage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [sellerName, setSellerName] = useState('')
  const [sellerLogo, setSellerLogo] = useState('')
  const [sellerDescription, setSellerDescription] = useState('')

  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.userSignin)
  const { user, loading, error } = useSelector((state) => state.userDetails)
  const {
    success: successUpdate,
    loading: loadingUpdate,
    error: errorUpdate,
  } = useSelector((state) => state.userUpdateProfile)

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET })
      dispatch(detailsUser(userInfo._id))
    } else {
      setName(user.name)
      setEmail(user.email)
      if (user.isSeller) {
        setSellerName(user.seller.name)
        setSellerLogo(user.seller.logo)
        setSellerDescription(user.seller.description)
      }
    }
  }, [dispatch, userInfo, user])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Password and Confirm Password Are Not Matched')
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          name,
          email,
          password,
          sellerName,
          sellerLogo,
          sellerDescription,
        })
      )
    }
  }

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Profile Updated Successfully
              </MessageBox>
            )}
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Enter confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {user.isSeller && (
              <>
                <h2>Seller</h2>
                <div>
                  <label htmlFor="sellerName">Seller Name</label>
                  <input
                    type="text"
                    id="sellerName"
                    placeholder="Enter Seller Name"
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="sellerLogo">Seller Logo</label>
                  <input
                    type="text"
                    id="sellerLogo"
                    placeholder="Enter seller logo"
                    value={sellerLogo}
                    onChange={(e) => setSellerLogo(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="sellerDescription">Seller Description</label>
                  <input
                    type="text"
                    id="sellerDescription"
                    placeholder="Enter seller description"
                    value={sellerDescription}
                    onChange={(e) => setSellerDescription(e.target.value)}
                  />
                </div>
              </>
            )}
            <div>
              <label />
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}

export default ProfilePage
