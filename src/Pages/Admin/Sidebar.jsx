import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
    return (
        <>
            <div className="list-group">
                <Link to="/admin" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='bi bi-house-door text-light fs-5'></i><span className='text-light float-end'>Home</span></Link>
                <Link to="/admin/maincategory" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='bi bi-list text-light fs-5'></i><span className='text-light float-end'>Main Category</span></Link>
                <Link to="/admin/subcategory" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='bi bi-list text-light fs-5'></i><span className='text-light float-end'>Sub Category</span></Link>
                <Link to="/admin/brand" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='bi bi-list text-light fs-5'></i><span className='text-light float-end'>Brand</span></Link>
                <Link to="/admin/product" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='bi bi-list text-light fs-5'></i><span className='text-light float-end'>Products</span></Link>
                <Link to="/admin/testimonial" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='bi bi-stars text-light fs-5'></i><span className='text-light float-end'>Testimonial</span></Link>
                <Link to="/admin/user" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='bi bi-person-circle text-light fs-5'></i><span className='text-light float-end'>User</span></Link>
                <Link to="/admin/newsletter" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='bi bi-newspaper text-light fs-5'></i><span className='text-light float-end'>NewsLetter</span></Link>
                <Link to="/admin/contactus" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='bi bi-telephone text-light fs-5'></i><span className='text-light float-end'>Contact Us</span></Link>
                <Link to="/admin/checkout" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='bi bi-cart3 text-light fs-5'></i><span className='text-light float-end'>Checkout</span></Link>
            </div>
        </>
    )
}
