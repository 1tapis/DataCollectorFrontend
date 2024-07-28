import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"

const FormPage = () => {
    const [formData,setFormData] = useState({
        name:"",
        age:"",
        gender:"",
        phone:"",
        address:"",
        pin:""
    })

    const navigate = useNavigate()

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        });
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const response = await fetch("https://datacollectorserver.onrender.com/api/users",{
                method:'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData)
            });
            if(response.ok){
                navigate("/data");

            }else{
                console.error("Failed to submit data");
            }
        } catch (error) {
            console.error(error);
        }
    }
  return (
    <div className="form__container">
        <h2>Submit Your Details</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" name='name' value={formData.name} onChange={handleChange} placeholder='Name'required />
            <input type="number" name ="age" value={formData.age} onChange={handleChange} placeholder='Age' required />

            <select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>

            <input type="text" name='phone' value={formData.phone} onChange={handleChange} placeholder='phone' required  />
            <input type="text" name='address' value={formData.address} onChange={handleChange} placeholder='Address' required  />
            <input type="text" name='pin' value={formData.pin} onChange={handleChange} placeholder='Pin'required  />
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default FormPage;
