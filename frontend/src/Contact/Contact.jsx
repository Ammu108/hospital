import React from 'react'
import './Contact.css'

const Contact = () => {
  return (
    <>
      <div className='contact-page-container'>
        <div className='inside-contact-page-container'>
          <div className='contact-box'>

            <div className='contact-box-img'>
              <img src="/contact_img.jpg" alt="img" />
            </div>

            <div className='contact-content-div'>
              <h5><strong>Contact Us</strong></h5>
              <p>We are here to assist you with all your healthcare needs. Please feel free to reach out to us through the 
                following channels:
              </p>
              <p className='addres'>Hospital Address: 123 Health Street, Wellness City, HC 56789.</p>
              
              <div className='infos phone-numbers-div'>
                 <p className='info-title phone-number'><strong>Phone Numbers :</strong></p>
                 <p>General Inquiries: +1 (123) 456-7890</p>
                 <p>Appointments: +1 (123) 456-7891</p>
                 <p>Emergency: +1 (123) 456-7899</p>   
              </div>

              <div className='infos email-div'>
                 <p className='info-title email'><strong>Email :</strong></p>
                 <p>Support: atomhospital@gmail.com</p>
              </div>

              {/* <div className='available-time'>
                 <img src="/24-hours.png" alt="img" />
              </div> */}
            </div>
          </div>
          
          <div className='adjustable-phone-div infos phone-numbers-div'>
                 <p className='info-title phone-number'><strong>Phone Numbers :</strong></p>
                 <p>General Inquiries: +1 (123) 456-7890</p>
                 <p>Appointments: +1 (123) 456-7891</p>
                 <p>Emergency: +1 (123) 456-7899</p>   
              </div>

          <div className='adjuistable-email-div infos email-div'>
                 <p className='info-title email'><strong>Email :</strong></p>
                 <p>Appointments: appointments@amenxhospital.com</p>
                 <p>Support: support@amenxhospital.com</p>
              </div>
        </div>
      </div>
    </>
  )
}

export default Contact