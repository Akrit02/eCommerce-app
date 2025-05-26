import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BreadCrumb from '../../../Components/BreadCrumb'
import Sidebar from '../Sidebar'
import { Link } from 'react-router-dom'

import $ from 'jquery'
import 'datatables.net'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'

import { getTestimonial, deleteTestimonial } from "../../../Redux/ActionCreators/TestimonialActionCreator"

export default function AdminTestimonial() {
    let dispatch = useDispatch()
    let TestimonialStateData = useSelector(state => state.TestimonialStateData)

    function deleteRecord(id) {
        if (window.confirm("Are you sure you want to delete that item : ")) {
            dispatch(deleteTestimonial({ id: id }))
            getAPIData()
        }
    }

    function getAPIData() {
        dispatch(getTestimonial())
        if (TestimonialStateData.length) {
            var time = setTimeout(() => {
                $('#myTable').DataTable()
            }, 300)
            return time
        }
    }
    useEffect(() => {
        let time = getAPIData()
        return () => clearTimeout(time)
    }, [TestimonialStateData.length])

    return (
        <>
            <BreadCrumb title="Admin" />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-light p-2 text-center'>Testimonials <Link to="/admin/testimonial/create"><i className='bi bi-plus-circle text-light float-end'></i></Link></h5>
                        <div className="table-responsive">
                            <table id='myTable' className='table table-bordered table-striped table-hover'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Pic</th>
                                        <th>Message</th>
                                        <th>Active</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        TestimonialStateData.map(item => {
                                            return <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td><Link to={`${process.env.REACT_APP_BACKEND_SERVER}${item.pic}`} target="_blank"><img src={`${process.env.REACT_APP_BACKEND_SERVER}${item.pic}`} height={80} width={80} /></Link></td>
                                                <td>
                                                    <div className='testimonial-message'>
                                                        {item.message}
                                                    </div>
                                                </td>
                                                <td>{item.active ? "Yes" : "No"}</td>
                                                <td><Link to={`/admin/testimonial/update/${item.id}`} className='btn btn-primary'><i className='bi bi-pencil-square'></i></Link></td>
                                                <td>{localStorage.getItem("role") === "Super Admin" ? <button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='bi bi-trash'></i></button> : null}</td>
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