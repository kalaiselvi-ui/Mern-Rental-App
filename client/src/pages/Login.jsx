import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../Styles/login.scss';
import { BASE_URL } from '../config';
import { setLogin } from '../redux/userSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    useEffect(() => {
        if (user && token) {
            navigate('/')
        }

    }, [user, token, navigate])

    const handleSubmit = async (e) => {
        console.log("BASE_URL:", BASE_URL);
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify({ email, password })
            })

            const loggedIn = await response.json()
            console.log("Token:", loggedIn.token);
            if (loggedIn && loggedIn.token && loggedIn.user) {
                dispatch(setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                }))
                navigate('/')
            }
        }
        catch (err) {
            console.log('login failed', err.message);
            alert("Login failed. Please try again.");
        }
    }
    return (
        <div className='login'>
            <div className='login_content'>
                <form className='login_content_form' onSubmit={handleSubmit}>
                    <input name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' type='email' required />
                    <input name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' type='password' required />
                    <button type='submit' >Login</button>

                </form>
                <a href="/register">Dont have an account? Create here</a>

            </div>
        </div>
    )
}

export default Login