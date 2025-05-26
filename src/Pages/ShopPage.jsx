import React, { useEffect, useState } from 'react'
import BreadCrumb from '../Components/BreadCrumb'

import { getProduct } from "../Redux/ActionCreators/ProductActionCreator"
import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreator"
import { getSubcategory } from "../Redux/ActionCreators/SubcategoryActionCreator"
import { getBrand } from "../Redux/ActionCreators/BrandActionCreator"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'

export default function ShopPage() {
    let [data, setData] = useState([])

    let [mc, setMc] = useState("")
    let [sc, setSc] = useState("")
    let [br, setBr] = useState("")

    let [min, setMin] = useState(0)
    let [max, setMax] = useState(1000)

    let [search, setSearch] = useState("")

    let [flag, setFlag] = useState(false)

    let ProductStateData = useSelector(state => state.ProductStateData)
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)

    let dispatch = useDispatch()
    let [searchParams] = useSearchParams()

    useEffect(() => {
        dispatch(getMaincategory())
    }, [MaincategoryStateData.length])

    useEffect(() => {
        dispatch(getSubcategory())
    }, [SubcategoryStateData.length])

    useEffect(() => {
        dispatch(getBrand())
    }, [BrandStateData.length])

    function filterProducts(mc, sc, br, min = -1, max = -1) {
        setSearch("")
        setData(ProductStateData.filter(x => x.active &&
            (mc === "All" || mc === x.maincategory) &&
            (sc === "All" || sc === x.subcategory) &&
            (br === "All" || br === x.brand) &&
            (min === -1 || (x.finalPrice >= min && x.finalPrice <= max))
        ))
    }

    function sortFilter(option) {
        if (option === "1")
            setData(data.sort((x, y) => y.id.localeCompare(x.id)))
        else if (option === "2")
            setData(data.sort((x, y) => x.finalPrice - y.finalPrice))
        else
            setData(data.sort((x, y) => y.finalPrice - x.finalPrice))

        setFlag(!flag)
    }

    function postSearch(e) {
        e.preventDefault()
        search = search.toLowerCase()
        setData(ProductStateData.filter(x => x.active &&
            (
                x?.name?.toLowerCase()?.includes(search) ||
                x?.maincategory?.toLowerCase() === search ||
                x?.subcategory?.toLowerCase() === search ||
                x?.brand?.toLowerCase() === search ||
                x?.color?.toLowerCase() === search ||
                x?.description?.toLowerCase()?.includes(search)
            )
        ))
    }

    function postPriceFilter(e) {
        e.preventDefault()
        filterProducts(mc, sc, br, min, max)
    }

    useEffect(() => {
        let mc = searchParams.get("mc") ?? "All"
        let sc = searchParams.get("sc") ?? "All"
        let br = searchParams.get("br") ?? "All"
        dispatch(getProduct())
        if (ProductStateData.length) {
            setMc(mc)
            setSc(sc)
            setBr(br)
            filterProducts(mc, sc, br)
        }
    }, [searchParams, ProductStateData.length])

    return (
        <>
            <BreadCrumb title="Shop" />

            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-2">
                        <div className="list-group mb-3">
                            <p className="list-group-item list-group-item-action active" aria-current="true">
                                Maincategory
                            </p>
                            <Link to={`/shop?mc=All&sc=${sc}&br=${br}`} className="list-group-item list-group-item-action">All</Link>
                            {
                                MaincategoryStateData.filter(x => x.active).map((item) => {
                                    return <Link to={`/shop?mc=${item.name}&sc=${sc}&br=${br}`} key={item.id} href="#" className="list-group-item list-group-item-action">{item.name}</Link>
                                })
                            }
                        </div>

                        <div className="list-group mb-3">
                            <p className="list-group-item list-group-item-action active" aria-current="true">
                                Subcategory
                            </p>
                            <Link to={`/shop?mc=${mc}&sc=All&br=${br}`} className="list-group-item list-group-item-action">All</Link>
                            {
                                SubcategoryStateData.filter(x => x.active).map((item) => {
                                    return <Link to={`/shop?mc=${mc}&sc=${item.name}&br=${br}`} key={item.id} href="#" className="list-group-item list-group-item-action">{item.name}</Link>
                                })
                            }
                        </div>

                        <div className="list-group mb-3">
                            <p className="list-group-item list-group-item-action active" aria-current="true">
                                Brand
                            </p>
                            <Link to={`/shop?mc=${mc}&sc=${sc}&br=All`} className="list-group-item list-group-item-action">All</Link>
                            {
                                BrandStateData.filter(x => x.active).map((item) => {
                                    return <Link to={`/shop?mc=${mc}&sc=${sc}&br=${item.name}`} key={item.id} href="#" className="list-group-item list-group-item-action">{item.name}</Link>
                                })
                            }
                        </div>
                        <div className="mb-3">
                            <h5 className='bg-primary text-center p-2 text-light'>Price Filter</h5>
                            <form onSubmit={postPriceFilter}>
                                <div className="btn-group mb-3 w-100">
                                    <input type="range" name="min" onInput={(e) => parseInt(e.target.value) < max ? setMin(e.target.value) : null} min={0} max={50000} value={min} step={500} className='w-100' /><span>{min}</span>
                                </div>
                                <div className="btn-group mb-3 w-100">
                                    <input type="range" name="max" onInput={(e) => parseInt(e.target.value) > min ? setMax(e.target.value) : null} min={0} max={50000} value={max} step={500} className='w-100' /><span>{max}</span>
                                </div>
                                <button type="submit" className='btn btn-primary w-100'>Apply Filter</button>
                            </form>
                        </div>
                    </div>

                    <div className="col-md-10">
                        <div className="row">
                            <div className="col-md-9 mb-3">
                                <form onSubmit={postSearch}>
                                    <div className="btn-group w-100">
                                        <input type="search" value={search} name="search" onChange={(e) => setSearch(e.target.value)} className='form-control border-3 border-primary' placeholder='Search Products by Name, Category, Brand, Color etc..' />
                                        <button type="submit" className='btn btn-primary'>Search</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-3 mb-3">
                                <select onChange={(e) => sortFilter(e.target.value)} className='form-select border-3 border-primary'>
                                    <option value="1">Latest</option>
                                    <option value="2">Price : Low to High</option>
                                    <option value="3">Price : High to Low</option>
                                </select>
                            </div>
                        </div>
                        <section id='team' className='team section'>
                            <div className="row">
                                {
                                    data.map((item) => {
                                        return <div key={item.id} className="col-lg-3 col-md-4 col-sm-6">
                                            <div className="d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
                                                <div className="team-member">
                                                    <div className="member-img">
                                                        <img src={`${process.env.REACT_APP_BACKEND_SERVER}${item.pic[0]}`} style={{ height: 300 }} className="w-100" alt="" />
                                                    </div>

                                                    <div className="member-info">
                                                        <h4 style={{ height: 50 }}>{item.name}</h4>
                                                        <span>{item.stock ? `${item.stockQuantity} left in stock` : "Out Of Stock"}</span>
                                                        <p><strike>&#8377;{item.basePrice}</strike> &#8377;{item.finalPrice} <sup>{item.discount}% Off</sup></p>
                                                        <div className="">
                                                            <Link to={`/product/${item.id}`} className='btn btn-primary text-light w-100'><i className="bi bi-cart"></i> Add to Cart</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}
