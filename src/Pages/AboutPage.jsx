import React from 'react'
import About from '../Components/About'
import Values from '../Components/Values'
import Facts from '../Components/Facts'
import Features from '../Components/Features'
import Testimonial from '../Components/Testimonial'
import BreadCrumb from '../Components/BreadCrumb'

export default function AboutPage() {
    return (
        <>
            <BreadCrumb title="About Us" />
            <About />
            <Values />
            <Facts />
            <Features />
            <Testimonial />
        </>
    )
}
