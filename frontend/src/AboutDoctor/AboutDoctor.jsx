import React, { useContext, useEffect, useState } from 'react'
import "./AboutDoctor.css"
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const AboutDoctor = () => {

  const { docId } = useParams();
  const { doctorsDetails } = useContext(AppContext);
  const [filteredAboutDoctor, setFilteredAboutDoctor] = useState([])

  const fetchDocInfo = async () => {
    const filteredDoctor = doctorsDetails.find(doc => doc._id === docId);
      setFilteredAboutDoctor(filteredDoctor);
      console.log(filteredDoctor);
  }

  useEffect(() => {
    fetchDocInfo()
  },[doctorsDetails, docId])


  return filteredAboutDoctor && (
    <>
    <div className='doctorsAbout-container'>
        <div className='inside-DoctorAbout-container'>

          <div className='aboutDoctor-box'>

            <div className='about-doctor-img-box'>
              <img src={filteredAboutDoctor.image} alt='img'/>
            </div>

            <div className='about-doctor-div'>
              <h2>{filteredAboutDoctor.name}</h2>

              <div className='qualifications'>
                <p>{filteredAboutDoctor.degree} -</p>
                <p>{filteredAboutDoctor.speciality}</p>
              </div>

              <div className="about-doctors-ratings">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                  <i className="fa-regular fa-star"></i>
              </div>

              <div className='contact-information-div'>
                <p><strong>Contact Information</strong></p>
                 <div className='contact-information'>
                    <p>9823748596</p>
                    <p>stephenJames@gmail.com</p>
                 </div>
              </div>

               <div className='description-header'>
                <p><strong>About</strong></p>
                <i className="fa-solid fa-circle-info"></i>
               </div>

              <div className='description'>
                <p>{filteredAboutDoctor.about}</p>
              </div>
            </div>
          </div>

          <div className='adjustable-description-container'>

            <div className='adjustable-description-header'>
              <p><strong>About</strong></p>
              <i className="fa-solid fa-circle-info"></i>
            </div>

            <div className='adjustable-description'>
                <p>{filteredAboutDoctor.about}</p>
              </div>
          </div>
            
        </div>
    </div>
    </>
  )
}

export default AboutDoctor