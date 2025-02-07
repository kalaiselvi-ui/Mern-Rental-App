import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../Styles/listing.scss'
import { categories } from '../data'
import { setListing } from '../redux/userSlice'
import ListingCard from './ListingCard'
import Loader from './Loader'


const Listings = () => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    const [selectedCategory, setSelectedCategory] = useState("All");

    const listings = useSelector((state) => state.listings)

    const getFeedListings = async () => {
        try {
            const response = await fetch(selectedCategory !== 'All' ? `http://localhost:3001/properties?category=${selectedCategory}` : "http://localhost:3001/properties", {
                method: 'GET'
            });
            const data = await response.json();
            dispatch(setListing({ listings: data }))
            setLoading(false)
        }
        catch (err) {
            console.log('Fetch Listing failed', err.message);
        }

    }
    useEffect(() => {
        getFeedListings();
    }, [selectedCategory])

    console.log('listings', listings)
    return (
        <>
            <div className='category-list'>
                {
                    categories?.map((category, index) => (
                        <div className={`category ${category.label === selectedCategory ? 'selected' : ""}`} key={index} onClick={() => setSelectedCategory(category.label)}>
                            <div className='category_icon'>{category.icon}</div>
                            <p>{category.label}</p>
                        </div>
                    ))
                }

            </div>
            {
                loading ? <Loader /> : (
                    <div className='listings'>
                        {
                            listings.map(({ _id, creator, listingPhotoPaths, city, province, country, category, type, price, booking = false }) => <ListingCard listingId={_id} creator={creator} listingPhotoPaths={listingPhotoPaths} city={city} province={province} country={country} category={category} type={type} price={price} booking={booking} />)
                        }

                    </div>
                )
            }
        </>

    )
}

export default Listings