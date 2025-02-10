import { Menu, Person, Search } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import '../Styles/navbar.scss'
import logo from '../assets/images/logo.png'
import { BASE_URL } from '../config'
import { setLogout } from '../redux/userSlice'

const Navbar = () => {
    const [dropdownMenu, setDropdownMenu] = useState(false)
    const user = useSelector((state) => state.user);
    const Dispatch = useDispatch();
    const [search, setSearch] = useState("")
    const navigate = useNavigate();

    return (
        <div className='container'>
            <div className='navbar'>
                <div>
                    <a href="/">
                        <img src={logo} alt="" />
                    </a>
                </div>
                <div className='navbar_search'>
                    <input type="text" placeholder='Search...' onChange={(e) => setSearch(e.target.value)} />
                    <IconButton disabled={search === ''}>
                        <Search sx={{ color: 'var(--pinkred)' }} onClick={() => { navigate(`/properties/search/${search}`) }} />
                    </IconButton>

                </div>

                <div className='navbar_right'>
                    {
                        user ? (
                            <a href='/create-listing' className='host'>Become a Host</a>
                        ) : (
                            <a href="/login">Become a Host</a>
                        )
                    }
                    <button className='navbar_right_account' onClick={() => setDropdownMenu(!dropdownMenu)}>
                        <Menu sx={{ color: 'var(darkgrey)' }} />
                        {
                            !user ?
                                <Person sx={{ color: 'var(darkgrey)' }} />
                                :
                                (
                                    <img src={`${BASE_URL}/${user.profileImagePath.replace("public", '')}`} style={{ objectFit: 'cover', borderRadius: '100%' }} alt='' />
                                )

                        }

                    </button>
                    {
                        dropdownMenu && !user && (
                            <div className='navbar_right_accountmenu'>
                                <Link to="/login">Log In </Link>
                                <Link to="/register">Register</Link>
                            </div>
                        )
                    }
                    {
                        dropdownMenu && user && (
                            <div className='navbar_right_accountmenu'>
                                <Link to={`/users/${user._id}/trips`}>Trip List </Link>
                                <Link to={`/users/${user._id}/wishList`}>Wish List</Link>
                                <Link to={`/users/${user._id}/propertyList`}>Property List</Link>
                                <Link to={`/users/${user._id}/reservationList`}>Reservation List</Link>
                                <Link to="/create-listing">Become a Host</Link>

                                <Link to='/' onClick={() => Dispatch(setLogout())}>Log Out</Link>

                            </div>
                        )
                    }

                </div>

            </div>
        </div >
    )
}

export default Navbar