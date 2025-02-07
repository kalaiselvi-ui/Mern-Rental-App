import React from 'react'
import Categories from '../components/Categories'
import Hero from '../components/Hero'
import Listings from '../components/Listings'

const Home = () => {
    return (
        <div>
            <Hero />
            <Categories />
            <Listings />
        </div>
    )
}

export default Home