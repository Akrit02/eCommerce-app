import React, { useState } from 'react'
import BreadCrumb from '../Components/BreadCrumb'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginPage() {
  let [data, setData] = useState({
    username: "",
    password: "",
  })

  let [errorMessage, setErrorMessage] = useState("")
  let navigate = useNavigate()

  function getInputData(e) {
    let { name, value } = e.target
    setData((old) => {
      return {
        ...old,
        [name]: value
      }
    })
  }

  async function postData(e) {
    e.preventDefault()

    let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}user`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      },
    })
    response = await response.json()
    let item = response.find((x => x.username === data.username || x.email === data.username && x.password === data.password))
    if (item && item.active === false) {
      setErrorMessage("Your account is blocked for some reason. Please contact us to unblock")
    }
    else if (item) {
      localStorage.setItem("login", true)
      localStorage.setItem("name", item.name)
      localStorage.setItem("userid", item.id)
      localStorage.setItem("role", item.role)
      if (item.role === "Buyer")
        navigate("/profile")
      else
        navigate("/admin")
    }
    else
      setErrorMessage("Invalid Username or Password")
  }
  return (
    <>
      <BreadCrumb title='Login - To Your Account' />

      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-lg-7 col-md-9 col-sm-11 m-auto">
            <h5 className='bg-primary text-light text-center p-2 rounded'>Login to Your Account</h5>
            <form onSubmit={postData}>
              <div className="mb-3">
                <input type="text" name="username" onChange={getInputData} placeholder='Username' className={`form-control border-3 ${errorMessage.username ? 'border-danger' : 'border-primary'}`} />
                {errorMessage ? <p className="text-danger">{errorMessage}</p> : null}
              </div>

              <div className="mb-3">
                <input type="password" name="password" onChange={getInputData} placeholder='Password' className='form-control border-3 border-primary' />
              </div>

              <div className="mb-3">
                <button type="submit" className='btn btn-primary w-100'>Login</button>
              </div>
            </form>
            <div className="d-flex justify-content-between">
              <Link to="">Forget Password ?</Link>
              <Link to="/signup">Doesn't have an Account ? Please Signup</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}