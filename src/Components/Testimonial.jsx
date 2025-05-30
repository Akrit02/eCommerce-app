import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, FreeMode, Pagination } from 'swiper/modules';

import { getTestimonial } from "../Redux/ActionCreators/TestimonialActionCreator"

export default function Testimonial() {
    const TestimonialStateData = useSelector(state => state.TestimonialStateData)
    const dispatch = useDispatch()

    const [showPerPage, setShowPerPage] = useState(window.innerWidth < 768 ? 1 : 3);
    const [slidesToRender, setSlidesToRender] = useState([]);

    useEffect(() => {
        dispatch(getTestimonial());
    }, []);

    useEffect(() => {
        const filtered = TestimonialStateData.filter(x => x.active);
        let slides = [...filtered];

        if (filtered.length > 0 && filtered.length < showPerPage + 1) {
            const times = Math.ceil((showPerPage + 1) / filtered.length);
            slides = Array(times).fill(filtered).flat();
        }

        setSlidesToRender(slides);
    }, [TestimonialStateData, showPerPage]);

    useEffect(() => {
        const handleResize = () => {
            setShowPerPage(window.innerWidth < 768 ? 1 : 3);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (slidesToRender.length < 1) {
        return <p>Loading...</p>;
    }

    const isLoopEnabled = slidesToRender.length > showPerPage;

    const options = {
        slidesPerView: showPerPage,
        spaceBetween: 50,
        freeMode: !isLoopEnabled,
        loop: isLoopEnabled,
        pagination: { clickable: true },
        modules: [EffectCoverflow, FreeMode, Pagination],
        className: "mySwiper",
        effect: 'coverflow',
        grabCursor: true,
    };

    return (
        <section id="testimonials" className="testimonials section">
            <div className="container section-title" data-aos="fade-up">
                <h2>Testimonials</h2>
                <p>What they are saying about us<br /></p>
            </div>

            <div className="container" data-aos="fade-up" data-aos-delay="100">
                <Swiper
                    key={`${slidesToRender.length}-${showPerPage}-${isLoopEnabled}`}
                    {...options}
                >
                    {slidesToRender.map((item, idx) => (
                        <SwiperSlide key={`${item.id}-${idx}`}>
                            <div className="testimonial-item">
                                <div className="stars">
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                </div>
                                <p className='slider-message'>{item.message}</p>
                                <div className="profile mt-auto">
                                    <img
                                        src={`${process.env.REACT_APP_BACKEND_SERVER}${item.pic}`}
                                        className="testimonial-img"
                                        alt=""
                                    />
                                    <h3>{item.name}</h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                    <div className="swiper-pagination"></div>
                </Swiper>
            </div>
        </section>
    )
}