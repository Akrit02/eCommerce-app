import React from 'react'
import BreadCrumb from '../Components/BreadCrumb'
import Cart from '../Components/Cart'

export default function CartPage() {
    return (
        <>
            <BreadCrumb title="Cart" />

            <div className="container-fluid my-3">
                <Cart title="Cart"/>
            </div>
        </>
    )
}
