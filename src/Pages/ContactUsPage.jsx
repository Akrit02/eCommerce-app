import React, { useState } from 'react'
import BreadCrumb from '../Components/BreadCrumb'
import { Link } from 'react-router-dom'
import FormValidator from '../Validators/FormValidator'
import { createContactus } from '../Redux/ActionCreators/ContactusActionCreator'
import { useDispatch } from 'react-redux'

export default function ContactUsPage() {
    let [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "Name field is mandatory.",
        email: "Email Address is mandatory.",
        phone: "Phone number is mandatory.",
        subject: "Subject field is mandatory.",
        message: "Message field is mandatory."
    })

    let [show, setShow] = useState(false)
    let [message, setMessage] = useState("")
    let disptach = useDispatch()

    function getInputData(e) {
        let { name, value } = e.target

        setErrorMessage((old) => {
            return {
                ...old,
                [name]: FormValidator(e)
            }
        })
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            disptach(createContactus({
                ...data,
                active: true,
                date: new Date()
            }))
            setData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: ""
            })
            setErrorMessage({
                name: "Name field is mandatory.",
                email: "Email Address is mandatory.",
                phone: "Phone number is mandatory.",
                subject: "Subject field is mandatory.",
                message: "Message field is mandatory."
            })
            setMessage("Thanks to share your query with us. Our team will contact you soon.")
        }
    }

    return (
        <>
            <BreadCrumb title="Contact Us" />
            <section id="contact" className="contact section">
                <div className="container section-title" data-aos="fade-up">
                    <p>Contact Us</p>
                </div>

                <div className="container" data-aos="fade-up" data-aos-delay="100">
                    <div className="row gy-4">
                        <div className="col-lg-6">
                            <div className="row gy-4">
                                <div className="col-md-6">
                                    <div className="info-item text-center" data-aos="fade" data-aos-delay="200">
                                        <i className="bi bi-geo-alt"></i>
                                        <h3>Address</h3>
                                        <p>{process.env.REACT_APP_ADDRESS}</p>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="info-item text-center" data-aos="fade" data-aos-delay="300">
                                        <i className="bi bi-telephone"></i>
                                        <h3>Call Us</h3>
                                        <Link to={`${process.env.REACT_APP_PHONE}`} target='_blank' rel='noreferrer'>{process.env.REACT_APP_PHONE}</Link>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="info-item text-center" data-aos="fade" data-aos-delay="400">
                                        <i className="bi bi-envelope"></i>
                                        <h3>Email Us</h3>
                                        <Link to={`${process.env.REACT_APP_EMAIL}`} target='_blank' rel='noreferrer'>{process.env.REACT_APP_EMAIL}</Link>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="info-item text-center" data-aos="fade" data-aos-delay="500">
                                        <i className="bi bi-clock"></i>
                                        <h3>WhatsApp</h3>
                                        <Link to={`http://wa.me/${process.env.REACT_APP_WHATSAPP}`} target='_blank' rel='noreferrer'>{process.env.REACT_APP_WHATSAPP}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="info-item">
                                <p className='text-center mb-3'>{message ? message : "Do You have any queries? Please write to us."}</p>
                                <form onSubmit={postData} data-aos="fade-up" data-aos-delay="200">
                                    <div className="row gy-4">

                                        <div className="col-12">
                                            <input type="text" onChange={getInputData} className={`form-control ${show && errorMessage.name ? 'border-danger' : ''}`} name="name" value={data.name} placeholder="Your Name" />
                                            {show && errorMessage.name ? <p>{errorMessage.name}</p> : null}
                                        </div>

                                        <div className="col-md-6 ">
                                            <input type="email" onChange={getInputData} className={`form-control ${show && errorMessage.email ? 'border-danger' : ''}`} name="email" value={data.email} placeholder="Your Email" />
                                            {show && errorMessage.email ? <p>{errorMessage.email}</p> : null}
                                        </div>

                                        <div className="col-md-6 ">
                                            <input type="text" onChange={getInputData} className={`form-control ${show && errorMessage.phone ? 'border-danger' : ''}`} name="phone" value={data.phone} placeholder="Your Phone Number" />
                                            {show && errorMessage.phone ? <p>{errorMessage.phone}</p> : null}
                                        </div>

                                        <div className="col-12">
                                            <input type="text" onChange={getInputData} className={`form-control ${show && errorMessage.subject ? 'border-danger' : ''}`} name="subject" value={data.subject} placeholder="Subject" />
                                            {show && errorMessage.subject ? <p>{errorMessage.subject}</p> : null}
                                        </div>

                                        <div className="col-12">
                                            <textarea onChange={getInputData} className={`form-control ${show && errorMessage.message ? 'border-danger' : ''}`} name="message" value={data.message} rows="5" placeholder="Message" ></textarea>
                                            {show && errorMessage.message ? <p>{errorMessage.message}</p> : null}
                                        </div>

                                        <div className="col-12 text-center">
                                            <button type="submit" className='btn btn-primary'>Send Message</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div >
                </div >

                <div className="w-100 mt-5">
                    <iframe width="100%" height="300" id="gmap_canvas" src="https://maps.google.com/maps?q=A-43%20sector%2016%20noida&t=&z=13&ie=UTF8&iwloc=&output=embed"></iframe>
                </div>
            </section >
        </>
    )
}