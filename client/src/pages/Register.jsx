import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/register.scss';
import uploadImage from '../assets/images/addImage.png';

const Register = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState(
        {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            profileImage: null,

        }
    )
    console.log(formData, 'formdata');

    const handleChange = (e) => {
        const { name, value, files, type } = e.target;
        setFormData({
            ...formData,
            // [name]: value,
            // [name]: name === 'profileImage' ? files[0] : value
            [name]: type === 'file' ? files[0] : value,
        })
    }
    const [passwordMatch, setPasswordMatch] = useState(true);

    useEffect(() => {
        setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === '');
    })
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const register_form = new FormData()
            for (var key in formData) {
                console.log(key);       // Logs each property name (key) in the formData object
                console.log(formData[key]);
                register_form.append(key, formData[key])
            }
            const response = await fetch('http://localhost:3001/auth/register', {
                method: 'POST',
                body: register_form
            })
            if (response.ok) {
                navigate('/login')
            }
        }
        catch (err) {
            console.log('Registration failed', err.message)
        }
    }

    return (
        <div className='register'>
            <div className='register_content'>
                <form onSubmit={handleSubmit} className="register_content_form">
                    <input name='firstName' value={formData.firstName} placeholder='Enter First Name' onChange={handleChange} required />
                    <input name='lastName' value={formData.lastName} placeholder='Enter Last Name' onChange={handleChange} required />
                    <input name='email' value={formData.email} placeholder='Enter Email' type='email' onChange={handleChange} required />
                    <input name='password' value={formData.password} placeholder='Enter Password' type='password' onChange={handleChange} required />
                    <input name='confirmPassword' value={formData.confirmPassword} placeholder='Enter ConfirmPassword' onChange={handleChange} type='password' required />
                    {
                        !passwordMatch && (
                            <p style={{ color: 'red' }}>Passwords are not matched</p>
                        )
                    }
                    <input id='image' onChange={handleChange} name='profileImage' accept='image/*' type='file' style={{ display: "none" }} />
                    <label htmlFor="image">
                        <img src={uploadImage} alt="" />
                        <p>Upload your Image</p>
                    </label>
                    {
                        formData.profileImage && (
                            <img src={URL.createObjectURL(formData.profileImage)} alt=''
                                style={{ maxWidth: '80px', borderRadius: '100%' }} />
                        )
                    }
                    <button type='submit' disabled={!passwordMatch}>REGISTER</button>
                </form>
                <a href="/login">Already have an account? Login here</a>
            </div>
        </div>
    )
}

export default Register