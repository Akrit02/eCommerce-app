import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BreadCrumb from '../Components/BreadCrumb'
import Profile from '../Components/Profile'
import { getWishlist, deleteWishlist } from '../Redux/ActionCreators/WishlistActionCreator'
import { getCheckout } from '../Redux/ActionCreators/CheckoutActionCreator'
import Cart from '../Components/Cart'

export default function ProfilePage() {
  let [wishlist, setWishlist] = useState([])
  let [orders, setOrders] = useState([])

  let WishlistStateData = useSelector((state) => state.WishlistStateData)
  let CheckoutStateData = useSelector((state) => state.CheckoutStateData)

  let dispatch = useDispatch()

  function deleteRecord(id) {
    if (window.confirm("Are you sure you want to delete that item : ")) {
      dispatch(deleteWishlist({ id: id }))
      getWishlistAPIData()
    }
  }

  function getWishlistAPIData() {
    dispatch(getWishlist())
    if (WishlistStateData.length)
      setWishlist(WishlistStateData.filter(x => x.user === localStorage.getItem("userid")))
    else
      setWishlist([])
  }

  useEffect(() => {
    getWishlistAPIData()
  }, [WishlistStateData.length])

  useEffect(() => {
    (() => {
      dispatch(getCheckout())
      if (CheckoutStateData.length) {
        setOrders(CheckoutStateData.filter(x => x.user === localStorage.getItem("userid")))
      }
    })()
  }, [CheckoutStateData.length])
  return (
    <>
      <BreadCrumb title="Profile" />
      <div className="container my-3">
        <Profile title="Buyer" />

        <h5 className='bg-primary p-2 text-light text-center'>Wishlist Section</h5>
        {
          wishlist.length ?
            <>
              <div className="table-responsive">
                <table className='table table-bordered table-striped table-hover'>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Brand</th>
                      <th>Color</th>
                      <th>Size</th>
                      <th>Stock</th>
                      <th>Price</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      wishlist.map((item) => {
                        return <tr key={item.id}>
                          <td>
                            <Link to={`${process.env.REACT_APP_BACKEND_SERVER}${item.pic}`} target='_blank' rel='noreferrer'>
                              <img src={`${process.env.REACT_APP_BACKEND_SERVER}${item.pic}`} width={80} height={50} /></Link>
                          </td>
                          <td>{item.name}</td>
                          <td>{item.brand}</td>
                          <td>{item.color}</td>
                          <td>{item.size}</td>
                          <td>{item.stockQuantity ? `${item.stockQuantity} Left in Stock` : "Out of Stock"}</td>
                          <td>&#8377;{item.price}</td>
                          <td><Link to={`/product/${item.product}`} className='btn btn-primary'><i className='bi bi-cart3 fs-4'></i></Link></td>
                          <td><button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='bi bi-trash'></i></button></td>
                        </tr>
                      })
                    }
                  </tbody>
                </table>
              </div>
            </> :
            <div className='text-center py-3'>
              <h3>No Items in Wishlist</h3>
              <Link to="/shop" className='btn btn-primary'>Shop Now</Link>
            </div>
        }

        <h5 className='bg-primary p-2 text-light text-center'>Order History Section</h5>
        {
          orders.length ?
            <>
              {
                orders.map(item => {
                  return <div className="row mt-2 border-bottom border-3 border-secondary" key={item.id}>
                    <div className="col-md-4">
                      <div className="table-responsive">
                        <table className='table table-bordered table-striped table-hover'>
                          <tbody>
                            <tr>
                              <th>Order Id</th>
                              <td>{item.id}</td>
                            </tr>
                            <tr>
                              <th>Order Status</th>
                              <td>{item.orderStatus}</td>
                            </tr>
                            <tr>
                              <th>Payment Mode</th>
                              <td>{item.paymentMode}</td>
                            </tr>
                            <tr>
                              <th>Payment Status</th>
                              <td>{item.paymentStatus}</td>
                            </tr>
                            <tr>
                              <th>Subtotal</th>
                              <td>&#8377;{item.subtotal}</td>
                            </tr>
                            <tr>
                              <th>Shipping</th>
                              <td>&#8377;{item.shipping}</td>
                            </tr>
                            <tr>
                              <th>Total</th>
                              <td>&#8377;{item.total}</td>
                            </tr>
                            <tr>
                              <th>Date</th>
                              <td>{new Date(item.date).toLocaleString()}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <Cart title="Products in Order" data={item.products} />
                    </div>
                  </div>
                })
              }
            </> :
            <div className='text-center py-3'>
              <h3>No Order History Found</h3>
              <Link to="/shop" className='btn btn-primary'>Shop Now</Link>
            </div>
        }
      </div>
    </>
  )
}