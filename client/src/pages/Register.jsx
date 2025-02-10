import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/register.scss';
import uploadImage from '../assets/images/addImage.png';
import { BASE_URL } from '../config';

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [emailError, setEmailError] = useState("");
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
    }, [formData.password, formData.confirmPassword])
    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError("");

        try {
            const register_form = new FormData()
            for (var key in formData) {
                console.log(key);       // Logs each property name (key) in the formData object
                console.log(formData[key]);
                register_form.append(key, formData[key])
            }
            const response = await fetch(`${BASE_URL}/auth/register`, {
                method: 'POST',
                body: register_form
            })

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 409) {
                    // Email already exists
                    setEmailError(data.message || "This email is already registered.");
                } else {
                    throw new Error(data.message || "Registration failed");
                }
                return;
            }
            if (response.ok) {
                navigate('/login')
            }
        }
        catch (err) {
            console.log('Registration failed', err.message);
            setError(err.message);
        }
    }

    return (
        <div className='register'>
            <div className='register_content'>
                <form onSubmit={handleSubmit} className="register_content_form">
                    <input name='firstName' value={formData.firstName} placeholder='Enter First Name' onChange={handleChange} required />
                    <input name='lastName' value={formData.lastName} placeholder='Enter Last Name' onChange={handleChange} required />
                    <input name='email' value={formData.email} placeholder='Enter Email' type='email' onChange={handleChange} required />
                    {emailError && <p style={{ color: 'red', fontSize: '14px' }}>{emailError}</p>}
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