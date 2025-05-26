import React from 'react'
import BreadCrumb from '../Components/BreadCrumb'
import Profile from '../Components/Profile'
import Cart from '../Components/Cart'

export default function CheckoutPage() {
    return (
        <>
            <BreadCrumb title="Checkout - Place Your Order" />

            <div className="container my-3">
                <div className="row">
                    <div className="col-md-6">
                        <Profile title="Billing Address" />
                    </div>
                    <div className="col-md-6">
                        <Cart title="Products in Cart" />
                    </div>
                </div>
            </div>
        </>
    )
}
