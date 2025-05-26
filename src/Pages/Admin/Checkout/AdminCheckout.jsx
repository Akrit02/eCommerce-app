import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BreadCrumb from '../../../Components/BreadCrumb'
import Sidebar from '../Sidebar'

import $ from 'jquery'
import 'datatables.net'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'

// import { getCheckout, deleteCheckout, updateCheckout } from "../../../Redux/ActionCreators/CheckoutActionCreator"
import { getCheckout } from "../../../Redux/ActionCreators/CheckoutActionCreator"
import { Link } from 'react-router-dom'

export default function AdminCheckout() {
    let dispatch = useDispatch()
    let CheckoutStateData = useSelector(state => state.CheckoutStateData)

    // function deleteRecord(id) {
    //     if (window.confirm("Are you sure you want to delete that item : ")) {
    //         dispatch(deleteCheckout({ id: id }))
    //         getAPIData()
    //     }
    // }

    function getAPIData() {
        dispatch(getCheckout())
        if (CheckoutStateData.length) {
            var time = setTimeout(() => {
                $('#myTable').DataTable()
            }, 300)
            return time
        }
    }
    useEffect(() => {
        let time = getAPIData()
        return () => clearTimeout(time)
    }, [CheckoutStateData.length])

    return (
        <>
            <BreadCrumb title="Admin" />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-light p-2 text-center'>Checkout</h5>
                        <div className="table-responsive">
                            <table id='myTable' className='table table-bordered table-striped table-hover'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Date</th>
                                        <th>User</th>
                                        <th>Order Status</th>
                                        <th>Payment Mode</th>
                                        <th>Payment Status</th>
                                        <th>Subtotal</th>
                                        <th>Shipping</th>
                                        <th>Total</th>
                                        <th>RPPID</th>
                                        <th></th>
                                        {/* <th></th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        CheckoutStateData.map(item => {
                                            return <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{new Date(item.date).toLocaleString()}</td>
                                                <td>{item.user}</td>
                                                <td>{item.orderStatus}</td>
                                                <td>{item.PaymentMode}</td>
                                                <td>{item.PaymentStatus}</td>
                                                <td>&#8377;{item.subtotal}</td>
                                                <td>&#8377;{item.shipping}</td>
                                                <td>&#8377;{item.total}</td>
                                                <td>{item.rppid ? item.rppid : "N/A"}</td>
                                                <td><Link to={`/admin/checkout/show/${item.id}`} className='btn btn-primary'><i className='bi bi-eye'></i></Link></td>
                                                {/* <td>{item.active === false ? <button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='bi bi-trash'></i></button> : null}</td> */}
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}