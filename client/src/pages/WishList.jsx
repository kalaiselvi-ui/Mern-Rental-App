import React from 'react'
import { useSelector } from 'react-redux'
import '../Styles/TripList.scss'
import ListingCard from '../components/ListingCard'

const WishList = () => {
    const wishList = useSelector((state) => state.user.wishList) // Contains only listing IDs
    const listings = useSelector((state) => state.listings) // Get full listing details

    return (
        <div>
            <h1 className='title-list'>Your Wish List</h1>
            <div className='list'>
                {wishList.map((listingId) => {
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
    );
}

export default WishList;
