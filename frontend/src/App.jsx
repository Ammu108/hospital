import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import About from './About/About'
import Contact from './Contact/Contact'
import Home from './Home/Home'
import SignUp from './components/SignUp/SignUp'
import BookAppointment from './BookAppointment/BookAppointment'
import AllDoctors from './AllDoctors/AllDoctors'
import Footer from './components/Footer/Footer'
import AboutDoctor from './AboutDoctor/AboutDoctor'


const App = () => {

  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <SignUp setShowLogin={setShowLogin} /> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/alldoctors" element={<AllDoctors />} />
          <Route path="/alldoctors/:speciality" element={<AllDoctors />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/signup" element={<SignUp />} /> */}
          <Route path="/bookappointment" element={<BookAppointment />} />
          <Route path="/aboutdoctor/:docId" element={<AboutDoctor />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App