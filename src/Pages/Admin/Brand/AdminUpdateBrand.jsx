import React, { useEffect, useState } from 'react'
import BreadCrumb from '../../../Components/BreadCrumb'
import Sidebar from '../Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import FormValidator from '../../../Validators/FormValidator'
import ImageValidator from '../../../Validators/ImageValidator'

import { getBrand, updateBrand } from "../../../Redux/ActionCreators/BrandActionCreator"

export default function AdminUpdateBrand() {
    let { id } = useParams()
    let [data, setData] = useState({
        name: "",
        pic: "",
        active: true,
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "",
        pic: "",
    })

    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    let BrandStateData = useSelector(state => state.BrandStateData)
    let dispatch = useDispatch()

    function getInputData(e) {
        var name = e.target.name
        var value = e.target.files && e.target.files.length ? "brand/" + e.target.files[0].name : e.target.value
        // var value = e.target.files && e.target.files.length ? e.target.files[0] : e.target.value

        setErrorMessage((old) => {
            return {
                ...old,
                [name]: e.target.files ? ImageValidator(e) : FormValidator(e)
            }
        })
        setData((old) => {
            return {
                ...old,
                [name]: name === "active" ? (value === "1" ? true : false) : value
            }
        })
    }

    async function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            let item = BrandStateData.find(x => x.id !== id && x.name.toLowerCase() === data.name.toLowerCase())
            if (item) {
                setShow(true)
                setErrorMessage((old) => {
                    return {
                        ...old,
                        'name': 'Brand with same name already exists.'
                    }
                })
                return
            }
            dispatch(updateBrand({ ...data }))
            // let formData = new FormData()
            // formData.append("_id", data._id)
            // formData.append("name", data.name)
            // formData.append("pic", data.pic)
            // formData.append("active", data.active)
            // dispatch(createBrand(formData))

            navigate("/admin/brand")
        }
    }

    useEffect(() => {
        dispatch(getBrand())
        if (BrandStateData.length) {
            setData(BrandStateData.find(x => x.id === id))
        }
    }, [BrandStateData.length])
    return (
        <>
            <BreadCrumb title="Admin" />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-light p-2 text-center'>Update Brand<Link to="/admin/brand"><i className='bi bi-arrow-left-circle text-light float-end'></i></Link></h5>
                        <form onSubmit={postData}>
                            <div className="mb-3">
                                <label>Name</label>
                                <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='Brand Name' className={`form-control border-3 ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                                {show && errorMessage.name ? <p className='text-capitalize text-danger'>{errorMessage.name}</p> : null}
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Pic</label>
                                    <input type="file" name="pic" onChange={getInputData} className={`form-control border-3 ${show && errorMessage.pic ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.pic ? <p className='text-capitalize text-danger'>{errorMessage.pic}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Active</label>
                                    <select name="active" value={data.active ? "1" : "0"} onChange={getInputData} className='form-control border-3 border-primary'>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <button type='submit' className='btn btn-primary w-100'>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
