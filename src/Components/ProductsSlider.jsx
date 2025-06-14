import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

export default function ProductsSlider({ title, data }) {
    let [showPerPage, setShowPerPage] = useState(4)

    let options = {
        slidesPerView: showPerPage,
        spaceBetween: 50,
        freeMode: true,
        loop: (data.length <= showPerPage) ? false : true,
        pagination: false,
        modules: [FreeMode, Pagination],
        className: "mySwiper",
    }

    function handelWindowResize() {
        if (window.innerWidth < 576)
            setShowPerPage(1)
        else if (window.innerWidth < 768)
            setShowPerPage(2)
        else if (window.innerWidth < 1200)
            setShowPerPage(3)
        else
            setShowPerPage(4)
    }
    window.addEventListener("resize", handelWindowResize)

    return (
        <>
            <section id="team" className="team section">
                <div className="container section-title" data-aos="fade-up">
                    <h2>{title}</h2>
                    <p>Checkout Our Latest {title} Products</p>
                </div>

                <div className="container">
                    <div className="gy-4">
                        <Swiper {...options}>
                            {
                                data.map((item) => {
                                    return <SwiperSlide key={item.id}>
                                        <div className="d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
                                            <div className="team-member">
                                                <div className="member-img">
                                                    <img src={`${process.env.REACT_APP_BACKEND_SERVER}${item.pic[0]}`} style={{ height: 300 }} className="w-100" alt="" />
                                                </div>

                                                <div className="member-info">
                                                    <h4 style={{height:50}}>{item.name}</h4>
                                                    <span>{item.stock ? `${item.stockQuantity} left in stock` : "Out Of Stock"}</span>
                                                    <p><strike>&#8377;{item.basePrice}</strike> &#8377;{item.finalPrice} <sup>{item.discount}% Off</sup></p>
                                                    <div className="">
                                                        <Link to={`/product/${item.id}`} className='btn btn-primary text-light w-100'><i className="bi bi-cart"></i> Add to Cart</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                })
                            }
                        </Swiper>
                    </div>
                </div>
            </section>
        </>
    )
}
