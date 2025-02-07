import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../Styles/TripList.scss'
import ListingCard from '../components/ListingCard'
import Loader from '../components/Loader'
import { setPropertyList } from '../redux/userSlice'

const PropertyList = () => {
    const [loading, setLoading] = useState(true)

    const user = useSelector((state) => state.user);
    const propertyList = user?.propertyList;
    const listings = useSelector((state) => state.listings) // Get full listing details

    const dispatch = useDispatch();

    const getPropertyList = async () => {
        try {
            const response = await fetch(`http://localhost:3001/users/${user._id}/properties`, {
                method: 'GET'
            })
            const data = await response.json()
            dispatch(setPropertyList(data))
            setLoading(false);

        }
        catch (err) {
            console.log('Fetch all properties failed', err.message)
        }
    }

    useEffect(() => {
        getPropertyList();
    }, [])
    return loading ? <Loader /> : (
        <>
            <div>
                <h1 className='title-list'>Your Wish List</h1>
                <div className='list'>
                    {propertyList.map((listingId) => {
                        const listing = listings.find(item => item._id === listingId); // Find full listing

                        if (!listing) return null; // Skip if no details found

                        return (
                            <ListingCard
                                key={listingId}
                                listingId={listing._id}
                                listingPhotoPaths={listing.listingPhotoPaths}
                                city={listing.city}
                                province={listing.province}
                                country={listing.country}
                                category={listing.category}
                                type={listing.type}
                                price={listing.price}
                                booking={false}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default PropertyList;
