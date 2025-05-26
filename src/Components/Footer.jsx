import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getNewsletter, createNewsletter } from '../Redux/ActionCreators/NewsletterActionCreator'

export default function Footer() {
  let [email, setEmail] = useState("")
  let [message, setMessage] = useState("")

  let NewsletterStateData = useSelector(state => state.NewsletterStateData)
  let dispatch = useDispatch()

  function postData(e) {
    e.preventDefault()
    if (email) {
      let item = NewsletterStateData.find(x => x.email === email)
      if (item)
        setMessage("This email address is already registered with us.")
      else {
        dispatch(createNewsletter({
          email: email,
          active: true
        }))
        setMessage("Thanks to subscribe our Newsletter Service, Now we can send email regarding new products and best Offers.")
      }
      setEmail("")
    }
    else
      setMessage("Please enter a valid Email Address")
  }

  useEffect(() => {
    (() => {
      dispatch(getNewsletter())
    })()
  }, [NewsletterStateData.length])
  return (
    <>
      <footer id="footer" className="footer text-light">
        <div className="footer-newsletter">
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-lg-7">
                <h2 className='text-light'>Join Our Newsletter</h2>
                <p>{message ? message : "Subscribe to our newsletter and receive the latest news about our products and services!"}</p>
                <form onSubmit={postData}>
                  <div className="newsletter-form">
                    <input type="email" value={email} name="email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="submit" value="Subscribe" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="container footer-top">
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6 footer-about">
              <Link to="/" className="d-flex align-items-center">
                <span className="sitename text-light fs-3">{process.env.REACT_APP_SITE_NAME}</span>
              </Link>
              <div className="footer-contact pt-3 text-light">
                <p className='fs-5'>{process.env.REACT_APP_ADDRESS}</p>
                <p className="mt-3"><strong>Email:</strong> <span><Link className='text-light fs-5' to={`mailto:${process.env.REACT_APP_EMAIL}`}>{process.env.REACT_APP_EMAIL}</Link></span></p>
                <p><strong>Phone:</strong> <span><Link className='text-light fs-5' to={`tel:${process.env.REACT_APP_PHONE}`}>{process.env.REACT_APP_PHONE}</Link></span></p>
                <p><strong>WhatsApp:</strong> <span><Link className='text-light fs-5' to={`http://wa.me/${process.env.REACT_APP_WHATSAPP}`}>{process.env.REACT_APP_WHATSAPP}</Link></span></p>
              </div>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4 className='text-light'>Useful Links</h4>
              <ul>
                <li><i className="bi bi-chevron-right text-light"></i> <Link to="/" className='text-light'>Home</Link></li>
                <li><i className="bi bi-chevron-right text-light"></i> <Link to="/about" className='text-light'>About us</Link></li>
                <li><i className="bi bi-chevron-right text-light"></i> <Link to="/shop" className='text-light'>Shop</Link></li>
                <li><i className="bi bi-chevron-right text-light"></i> <Link to="/contactus" className='text-light'>Contact us</Link></li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-3 footer-links ">
              <h4 className='text-light'>Our Services</h4>
              <ul>
                <li><i className="bi bi-chevron-right text-light"></i> <Link to="/features" className='text-light'>Features</Link></li>
                <li><i className="bi bi-chevron-right text-light"></i> <Link to="/testimonial" className='text-light'>Testimonial</Link></li>
                <li><i className="bi bi-chevron-right text-light"></i> <Link to="#" className='text-light'>Privacy policy</Link></li>
                <li><i className="bi bi-chevron-right text-light"></i> <Link to="#" className='text-light'>Terms & Condition</Link></li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-12">
              <h4 className='text-light'>Follow Us</h4>
              <p className='text-light'>Cras fermentum odio eu feugiat lide par naso tierra videa magna derita valies</p>
              <div className="social-links d-flex">
                <Link to={process.env.REACT_APP_TWITTER} target='_blank' rel='noreferrer'><i className="bi bi-twitter-x"></i></Link>
                <Link to={process.env.REACT_APP_FACEBOOK} target='_blank' rel='noreferrer'><i className="bi bi-facebook"></i></Link>
                <Link to={process.env.REACT_APP_INSTAGRAM} target='_blank' rel='noreferrer'><i className="bi bi-instagram"></i></Link>
                <Link to={process.env.REACT_APP_LINKEDIN} target='_blank' rel='noreferrer'><i className="bi bi-linkedin"></i></Link>
              </div>
            </div>

          </div>
        </div>

        <div className="container copyright text-center mt-4 text-light">
          <p>© <span>Copyright</span> <strong className="px-1 sitename">{process.env.REACT_APP_SITE_NAME}</strong> <span>All Rights Reserved</span></p>
          <div className="credits">
          </div>
        </div>
      </footer>
    </>
  )
}
