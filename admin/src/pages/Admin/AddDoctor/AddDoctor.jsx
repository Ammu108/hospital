import React, { useContext, useRef, useState } from 'react'
import './AddDoctor.css'
import { AdminContext } from '../../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from "axios";

const AddDoctor = () => {

  const [name, setName] = useState("");
  const [speciality, setSpeciality] = useState("General Physicians");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [degree, setDegree] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [aboutDoctor, setAboutDoctor] = useState("");
  const [image, setImage] = useState(null); // State for Image
  const fileInputRef = useRef(null); // Create a ref for file input
  const [loading, setLoading] = useState(false);

  const handleImageClick = () => {
    fileInputRef.current.click(); // Trigger file input on image click
  };

  const { backendUrl, aToken } = useContext(AdminContext);

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData to send image + text data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("password", password);
    formData.append("speciality", speciality);
    formData.append("degree", degree);
    formData.append("experience", experience);
    formData.append("about", aboutDoctor);
    formData.append("address", address);
    formData.append("date", new Date().toISOString().split("T")[0]);

    if (image) {
      formData.append("image", image); // Attach image if selected
    }

    setLoading(true);

    try {
      const response = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${aToken}`,
        },
      });

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div className='admin-addDoctor-header'>
        <p className='add-doctor-header-title'>Add Doctor</p>
        <div className='admin-addDoctor-container'>
          <div className='admin-addDoctor-inside-container'>
            {loading ? (
              <div className='loading-div-parent'>
                <div className='loading-div'>
                  <h2>Adding Doctor...</h2>
                  <span class="loader"></span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="row g-3 adding-doctor-form">
                <div className='image-handler'>
                  <div className='adding-form-header'>
                    <div className='upload-img-div'>
                      <img src={image ? URL.createObjectURL(image) : "user.png"} onClick={handleImageClick} alt='user-img' className='doctor-img' style={{ cursor: "pointer" }}/>
                      <input type="file" ref={fileInputRef} onChange={(e) => setImage(e.target.files[0])} className="form-control" id="doctorImage" required hidden />
                    </div>
                    <div className='upload-img-placeholder'>
                      <p>Upload Doctor <br /> Picture</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputName" className="form-label">Doctor Name</label>
                  <input type="text" onChange={(e) => setName(e.target.value)} value={name} name="name" className="form-control" id="inputName" placeholder='Full Name' required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="speciality" className="form-label">Speciality</label>
                  <select id="speciality" onChange={(e) => setSpeciality(e.target.value)} value={speciality} name="speciality" className="form-control" required>
                    <option value="General Physicians">General Physicians</option>
                    <option value="Gynaecologist">Gynaecologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Pediatrician">Pediatrician</option>
                    <option value="Neurologists">Neurologists</option>
                    <option value="Gastroenterologist">Gastroenterologist</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputEmail" className="form-label">Doctor Email</label>
                  <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} name='email' className="form-control" id="inputEmail" placeholder="Email Addrerss" required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputDegree" className="form-label">Degree</label>
                  <input type="text" name='degree' onChange={(e) => setDegree(e.target.value)} value={degree} className="form-control" id="inputDegree" placeholder="Degree" required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputSetPassword" className="form-label">Set Password</label>
                  <input type="text" onChange={(e) => setPassword(e.target.value)} value={password} name='password' className="form-control" id="inputSetPassword" placeholder="Password" required />
                </div>
                <div className="col-md-6">
                  <div className="col-12">
                    <label htmlFor="inputAddress" className="form-label">Address</label>
                    <input type="text" onChange={(e) => setAddress(e.target.value)} value={address} name='address' className="form-control" id="inputAddress" placeholder='Address' required />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="experience" className="form-label">Experience</label>
                  <select id="experience" onChange={(e) => setExperience(e.target.value)} value={experience} name="experience" className="form-control" required>
                    <option value="1 Year">1 Year</option>
                    <option value="2 Year">2 Years</option>
                    <option value="3 Year">3 Years</option>
                    <option value="4 Year">4 Years</option>
                    <option value="5 Year">5 Years</option>
                    <option value="6 Year">6 Years</option>
                    <option value="7 Year">7 Years</option>
                    <option value="8 Year">8 Years</option>
                    <option value="9 Year">9 Years</option>
                    <option value="10 Year">10 Years</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputSetPhoneNumber" className="form-label">Phone No.</label>
                  <input type="number" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} name='phoneNumber' className="form-control" id="inputSetPhoneNo" placeholder="phone number" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="aboutDoctor" className="form-label">About Doctor</label>
                  <textarea className="form-control" onChange={(e) => setAboutDoctor(e.target.value)} value={aboutDoctor} name='aboutDoctor' id="aboutDoctor" rows="3" placeholder="write about doctor..."></textarea>
                </div>
                <div className="col-12 btn">
                  <button type='submit' className='add-btn' disabled={loading}>{loading ? "Adding Doctor..." : "Add Doctor"}</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AddDoctor
