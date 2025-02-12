import React from 'react'
import HeroSection from '../components/HeroSection/HeroSection'
import SpecialistMenu from '../components/SpecialistMenu/SpecialistMenu'
import TopDoctors from '../components/TopDoctors/TopDoctors'
// import Banner from '../components/Banner/Banner'

const Home = () => {
  return (
    <>
      <div className='body'>
        <HeroSection/>
        <SpecialistMenu/>
        <TopDoctors/>
        {/* <Banner/> */}
      </div>
    </>
  )
}

export default Home