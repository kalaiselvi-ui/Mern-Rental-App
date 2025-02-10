import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../Styles/TripList.scss'
import ListingCard from '../components/ListingCard'
import Loader from '../components/Loader'
import { BASE_URL } from '../config'
import { setTripList } from '../redux/userSlice'

const TripList = () => {
    const [loading, setLoading] = useState(true)
    const userId = useSelector((state) => state.user._id)
    const tripList = useSelector((state) => state.user.tripList)
    const dispatch = useDispatch();
    const getTripList = async () => {
        try {
            const response = await fetch(`${BASE_URL}/users/${userId}/trips`, {
                method: 'GET',
            })
            const data = await response.json();
            dispatch(setTripList(data))
            setLoading(false)
            console.log(data, 'trip');
        }
        catch (err) {
            console.log('Fetch trip list failed', err.message)
        }
    }
    useEffect(() => {
        getTripList()
    }, [])
    return loading ? <Loader /> : (
        <>
            <div className='title-list'>
                <div className='list'>
                    {tripList.map(({ listingId, startDate, endDate, totalPrice, booking = true }) => (
                        <ListingCard listingId={listingId._id} listingPhotoPaths={listingId.listingPhotoPaths} city={listingId.city} province={listingId.province} country={listingId.country} category={listingId.category} startDate={startDate} endDate={endDate} totalPrice={totalPrice} booking={booking} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default TripList