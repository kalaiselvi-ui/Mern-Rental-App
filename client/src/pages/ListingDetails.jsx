import React, { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import '../Styles/listingDetails.scss';
import Heading from '../components/Heading';
import Loader from '../components/Loader';
import { facilities } from '../data';

const ListingDetails = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const { listingId } = useParams();
    const [listing, setListing] = useState(null)

    const getListingDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3001/properties/${listingId}`, {
                method: 'GET'
            })
            const data = await response.json();
            setListing(data)
            setLoading(false)
        }
        catch (err) {
            console.log('Fetch Listing Details failed', err.message);
        }
    }

    useEffect(() => {
        getListingDetails()
    }, [listingId])

    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ])
    const handSelect = (ranges) => {
        setDateRange([ranges.selection])
    }
    const start = new Date(dateRange[0].startDate)
    const end = new Date(dateRange[0].endDate)
    const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24)

    //submit booking
    const customerId = useSelector((state) => state?.user?._id)

    const handleSubmit = async () => {
        try {
            const bookingForm = {
                customerId,
                listingId,
                hostId: listing.creator._id,
                startDate: dateRange[0].startDate.toISOString(),
                endDate: dateRange[0].endDate.toISOString(),
                totalPrice: listing.price * dayCount
            }
            const response = await fetch('http://localhost:3001/bookings/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingForm)
            })
            if (response.ok) {
                navigate(`/${customerId}/trips`)
            }
        }
        catch (err) {
            console.log('Submit booking failed', err.message);
        }
    }

    return loading ? <Loader /> : (
        <>
            <div className='listing-details'>
                <div className='title'>
                    <h1>{listing.title}</h1>
                    <div></div>
                </div>
                {listing && listing.listingPhotoPaths && (
                    <div className='photos'>
                        {listing.listingPhotoPaths.map((photo) => (
                            <img src={`http://localhost:3001/${photo.replace('public', '')}`} alt='' />
                        ))}
                    </div>
                )}
                <div>
                    <h2>{listing.type} in {listing.city}, {listing.province}, {listing.country} </h2>
                    <p>{listing.guestCount} guests - {listing.bedroomCount} bedroom(s) - {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)</p>
                </div>
                <hr />
                <div className='profile'>
                    <img src={`http://localhost:3001/${listing.creator.profileImagePath.replace('public', '')}`} alt="" />
                    <h3>Hosted by {listing.creator.firstName}{listing.creator.lastName}</h3>

                </div>
                <hr />
                <Heading subtitle={'Description'} />
                <p>{listing.description}</p>
                <hr />

                <Heading subtitle={listing.highlight} />
                <p>{listing.highlightDesc}</p>
                <hr />

                <div className='booking'>
                    <div>
                        <h2>What this place offers?</h2>
                        <div className='amenities'>
                            {
                                (listing.amenities[0].split(',')?.map((item, index) => (
                                    <div className='facility' key={index}>
                                        <div>
                                            {
                                                facilities.find((facility) => facility.name === item)?.icon
                                            }
                                        </div>
                                        <p>{item}</p>
                                    </div>
                                )))
                            }

                        </div>
                    </div>
                    <div>
                        <h2>How long do you want to stay?</h2>
                        <div className='date-range-calendar'>
                            <DateRange ranges={dateRange} onChange={handSelect} />
                            {dayCount > 1 ? (
                                <h2>$ {listing.price} X {dayCount} night</h2>
                            ) : (
                                <h2>$ {listing.price} X {dayCount} night</h2>
                            )}
                            <h2>Total price: ${listing.price * dayCount}</h2>
                            <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
                            <p>End Date: {dateRange[0].endDate.toDateString()}</p>
                            <button className='button' onClick={handleSubmit} type='submit'>Booking</button>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default ListingDetails
