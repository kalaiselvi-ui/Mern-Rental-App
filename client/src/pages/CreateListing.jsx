import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { IoIosImages } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../Styles/createListing.scss';
import Heading from '../components/Heading';
import { BASE_URL } from '../config';
import { categories, facilities, types } from '../data';

const CreateListing = () => {
    const navigate = useNavigate()
    const [photos, setPhotos] = useState([]);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [formLocation, setFormLocation] = useState({
        streetAddress: '',
        aptSuite: '',
        city: '',
        province: '',
        country: ''
    });

    const handleChangeLocation = (e) => {
        const { name, value } = e.target
        setFormLocation({
            ...formLocation,
            [name]: value
        })
    }
    // console.log(formLocation, 'formlocat');
    const [guestCount, setGuestCount] = useState(1);
    const [bedroomCount, setBedroomCount] = useState(1);
    const [bedCount, setBedCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [amenities, setAmenities] = useState([]);

    const handleSelectAmenities = (facility) => {
        if (amenities.includes(facility)) {
            setAmenities((prevAmenities) => prevAmenities.filter((option) => option !== facility))
        } else {
            setAmenities((prev) => [...prev, facility])
        }
    }

    console.log(amenities)

    const handleUploadPhotos = (e) => {
        const newPhotos = Array.from(e.target.files);
        console.log("Uploaded Photos:", newPhotos);
        setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos])
    }

    useEffect(() => {
        console.log("Updated Photos State:", photos);
    }, [photos]);

    const handleDragPhoto = (result) => {
        if (!result.destination) return
        const items = Array.from(photos)
        const [recordedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, recordedItem)
        setPhotos(items);
    }

    const handleRemovePhoto = (indexToRemove) => {
        setPhotos(
            (prevPhotos) => prevPhotos.filter((_, index) => index !== indexToRemove))
    }

    const [formDescription, setFormDescription] = useState({
        title: '',
        description: '',
        highlight: '',
        highlightDesc: '',
        price: 0
    })
    const handleChangeDescription = (e) => {
        const { name, value } = e.target
        setFormDescription({
            ...formDescription,
            [name]: value
        })
    }
    console.log(formDescription);

    const creatorId = useSelector((state) => state.user._id);

    const handlePost = async (e) => {
        e.preventDefault();

        try {
            const listingForm = new FormData()
            listingForm.append('creator', creatorId)
            listingForm.append('category', category)
            listingForm.append('type', type)
            listingForm.append('streetAddress', formLocation.streetAddress)
            listingForm.append('aptSuite', formLocation.aptSuite)
            listingForm.append('city', formLocation.city)
            listingForm.append('province', formLocation.province)
            listingForm.append('country', formLocation.country)
            listingForm.append('guestCount', guestCount)
            listingForm.append('bedroomCount', bedroomCount)
            listingForm.append('bedCount', bedCount)
            listingForm.append('bathroomCount', bathroomCount)
            listingForm.append('amenities', amenities)
            listingForm.append('title', formDescription.title)
            listingForm.append('description', formDescription.description)
            listingForm.append('highlight', formDescription.highlight)
            listingForm.append('highlightDesc', formDescription.highlightDesc)
            listingForm.append('price', formDescription.price)

            photos.forEach((photo) => {
                listingForm.append('listingPhotos', photo)
            })

            const response = await fetch(`${BASE_URL}/properties/create`, {
                method: 'POST',
                body: listingForm
            })
            if (response.ok) {
                navigate('/')
            }
            const data = await response.json();
            console.log("Upload success:", data);
        } catch (err) {
            console.log('Publish listing failed', err.message)

        }
    }
    return (
        <div className='create-listing'>
            <Heading title={'Publish Your Place'} />
            <form className='create-listing_step1' onSubmit={handlePost}>
                <h2>Step 1: Tell us about your place</h2>
                <hr />
                <Heading subtitle={'Which of these Categories best describes your place?'} />
                <div className='category-list'>
                    {
                        categories.map((item, index) => (
                            <div className={`category ${category === item.label ? 'selected' : ''}`} key={index} onClick={() => setCategory(item.label)}>
                                <div className='category_icon'>
                                    {item.icon}
                                </div>
                                <p>{item.label}</p>

                            </div>
                        ))
                    }

                </div>
                <Heading subtitle={'What type of place will guests have?'} />
                <div className='type-list'>
                    {
                        types.map((item, index) => (
                            <div className={`type ${type === item.name ? 'selected' : ''}`} key={index} onClick={() => setType(item.name)}>
                                <div className='type_text'>
                                    <h4>{item.name}</h4>
                                    <p>{item.description}</p>
                                </div>
                                <div className=''>{item.icon} </div>


                            </div>
                        ))
                    }

                </div>
                <Heading subtitle={'Where is your place located?'} />
                <div className='full'>
                    <div className='location'>
                        <p>Street Address</p>
                        <input type="text"
                            placeholder='Street address'
                            value={formLocation.streetAddress}
                            onChange={handleChangeLocation}
                            name="streetAddress" required />

                    </div>

                </div>
                <div className='half'>
                    <div className='location'>
                        <p>Appartment, Suite, etc.</p>
                        <input type="text"
                            placeholder='Apt, Suite, etc.'
                            value={formLocation.aptSuite}
                            onChange={handleChangeLocation}
                            name="aptSuite" required />

                    </div>
                    <div className='location'>
                        <p>City</p>
                        <input type="text"
                            placeholder='City'
                            value={formLocation.city}
                            onChange={handleChangeLocation}
                            name="city"
                            required />

                    </div>

                </div>
                <div className='half'>
                    <div className='location'>
                        <p>Province</p>
                        <input type="text"
                            placeholder='Province'
                            value={formLocation.province}
                            onChange={handleChangeLocation}
                            name="province" required />

                    </div>
                    <div className='location'>
                        <p>Country</p>
                        <input type="text"
                            placeholder='Country'
                            value={formLocation.country}
                            onChange={handleChangeLocation}
                            name="country" required />

                    </div>

                </div>
                <Heading subtitle={'Share some basics about your place'} />
                <div className='basics'>
                    <div className='basic'>
                        <p>Guests</p>
                        <div className='basic_count'>
                            <RemoveCircleOutline
                                onClick={() => guestCount > 1 && setGuestCount(guestCount - 1)}
                                sx={{ fontSize: '25px', cursor: 'pointer', "&:hover": { color: 'var(--pinkred)' } }} />
                            <p>{guestCount}</p>
                            <AddCircleOutline
                                onClick={() => setGuestCount(guestCount + 1)}
                                sx={{ fontSize: '25px', cursor: 'pointer', "&:hover": { color: 'var(--pinkred)' } }} />
                        </div>

                    </div>
                    <div className='basic'>
                        <p>Bedrooms</p>
                        <div className='basic_count'>
                            <RemoveCircleOutline
                                onClick={() => bedroomCount > 1 && setBedroomCount(bedroomCount - 1)}
                                sx={{ fontSize: '25px', cursor: 'pointer', "&:hover": { color: 'var(--pinkred)' } }} />
                            <p>{bedroomCount}</p>
                            <AddCircleOutline
                                onClick={() => setBedroomCount(bedroomCount + 1)}
                                sx={{ fontSize: '25px', cursor: 'pointer', "&:hover": { color: 'var(--pinkred)' } }} />
                        </div>

                    </div>
                    <div className='basic'>
                        <p>Beds</p>
                        <div className='basic_count'>
                            <RemoveCircleOutline
                                onClick={() => bedCount > 1 && setBedCount(bedCount - 1)}
                                sx={{ fontSize: '25px', cursor: 'pointer', "&:hover": { color: 'var(--pinkred)' } }} />
                            <p>{bedCount}</p>
                            <AddCircleOutline
                                onClick={() => setBedCount(bedCount + 1)}
                                sx={{ fontSize: '25px', cursor: 'pointer', "&:hover": { color: 'var(--pinkred)' } }} />
                        </div>

                    </div>
                    <div className='basic'>
                        <p>Bathrooms</p>
                        <div className='basic_count'>
                            <RemoveCircleOutline
                                onClick={() => bathroomCount > 1 && setBathroomCount(bathroomCount - 1)}
                                sx={{ fontSize: '25px', cursor: 'pointer', "&:hover": { color: 'var(--pinkred)' } }} />
                            <p>{bathroomCount}</p>
                            <AddCircleOutline
                                onClick={() => setBathroomCount(bathroomCount + 1)}
                                sx={{ fontSize: '25px', cursor: 'pointer', "&:hover": { color: 'var(--pinkred)' } }} />
                        </div>

                    </div>

                </div>
                <div className='create-listing_step2'>
                    <h2>Step 2: Make your place and stand out</h2>
                    <Heading subtitle={'Tell guests what your place has to offer'} />
                    <div className='amenities'>
                        {
                            facilities?.map((facility, index) => (
                                <div className={`facility ${amenities.includes(facility.name) ? 'selected' : ''}`} key={index} onClick={() => handleSelectAmenities(facility.name)}>
                                    <div className='facility_icon'>
                                        {facility.icon}
                                    </div>
                                    <p>{facility.name}</p>
                                </div>
                            ))
                        }
                    </div>

                    <Heading subtitle={'Add some photos of your place'} />
                    <DragDropContext onDragEnd={handleDragPhoto}>
                        <Droppable droppableId="photos" direction="horizontal">
                            {(provided) => (
                                <div
                                    className="photos"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {photos.length < 1 && (
                                        <>
                                            <input
                                                id="image"
                                                type="file"
                                                style={{ display: "none" }}
                                                accept="image/*"
                                                onChange={handleUploadPhotos}
                                                multiple
                                            />
                                            <label htmlFor="image" className="alone">
                                                <div className="icon">
                                                    <IoIosImages />
                                                </div>
                                                <p>Upload from your device</p>
                                            </label>
                                        </>
                                    )}

                                    {photos.length >= 1 && (
                                        <>
                                            {photos.map((photo, index) => {
                                                return (
                                                    <Draggable
                                                        key={index}
                                                        draggableId={index.toString()}
                                                        index={index}
                                                    >
                                                        {(provided) => (
                                                            <div
                                                                className="photo"
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <img
                                                                    src={URL.createObjectURL(photo)}
                                                                    alt="place"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemovePhoto(index)}
                                                                >
                                                                    <BiTrash />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                );
                                            })}
                                            <input
                                                id="image"
                                                type="file"
                                                style={{ display: "none" }}
                                                accept="image/*"
                                                onChange={handleUploadPhotos}
                                                multiple
                                            />
                                            <label htmlFor="image" className="together">
                                                <div className="icon">
                                                    <IoIosImages />
                                                </div>
                                                <p>Upload from your device</p>
                                            </label>
                                        </>
                                    )}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>

                    <Heading subtitle={'What make your place attractive and exciting?'} />
                    <div className='description'>
                        <p>Title</p>
                        <input type="text"
                            placeholder='Title'
                            name='title'
                            onChange={handleChangeDescription}
                            value={formDescription.title}
                            required />
                        <p>Description</p>
                        <textarea type="text"
                            placeholder='Description'
                            name='description'
                            onChange={handleChangeDescription}
                            value={formDescription.description}
                            required />
                        <p>Highlight</p>
                        <input type="text"
                            placeholder='Highlight'
                            name='highlight'
                            onChange={handleChangeDescription}
                            value={formDescription.highlight}
                            required />
                        <p>Highlight details</p>
                        <textarea type="text"
                            placeholder='Highlight details'
                            name='highlightDesc'
                            onChange={handleChangeDescription}
                            value={formDescription.highlightDesc}
                            required />
                        <p>Now, set your PRICE</p>
                        <span>$</span>
                        <input type="number"
                            placeholder='100'
                            name='price'
                            onChange={handleChangeDescription}
                            value={formDescription.price}
                            className='price' required />
                    </div>




                </div>

                <button className='submit_btn' type='submit'>CREATE YOUR LISTING</button>

            </form >
        </div >
    )
}

export default CreateListing