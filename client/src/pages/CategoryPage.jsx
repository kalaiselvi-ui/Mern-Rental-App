import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../Styles/TripList.scss';
import ListingCard from '../components/ListingCard';
import Loader from '../components/Loader';
import { BASE_URL } from '../config';
import { setListing } from '../redux/userSlice';

const CategoryPage = () => {
    const [loading, setLoading] = useState(true);

    const { category } = useParams();
    const dispatch = useDispatch();
    const listings = useSelector((state) => state.listings)

    const getFeedListings = async () => {
        try {
            const response = await fetch(`${BASE_URL}/properties?category=${category}`, {
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
    }, [category])
    return loading ? <Loader /> :
        (
            <>
                <div>
                    <h1 className='title-list'>{category} Listing </h1>
                    <div className='list'>
                        {listings?.map(
                            ({
                                _id,
                                creator,
                                listingPhotoPaths,
                                city,
                                province,
                                country,
                                category,
                                type,
                                price,
                                booking = false,
                            }) => (
                                <ListingCard
                                    key={_id}
                                    listingId={_id}
                                    creator={creator}
                                    listingPhotoPaths={listingPhotoPaths}
                                    city={city}
                                    province={province}
                                    country={country}
                                    category={category}
                                    type={type}
                                    price={price}
                                    booking={booking}
                                />
                            )
                        )}
                    </div>
                </div>
            </>
        )
}

export default CategoryPage