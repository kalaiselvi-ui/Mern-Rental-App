import {
    ArrowBackIosNew,
    ArrowForwardIos,
    Favorite,
} from "@mui/icons-material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setWishList } from "../redux/userSlice";
import "../styles/ListingCard.scss";

const ListingCard = ({
    listingId,
    listingPhotoPaths,
    city,
    province,
    country,
    category,
    type,
    price,
    startDate,
    endDate,
    totalPrice,
    booking,
}) => {
    if (!listingId) {
        console.warn("⚠️ Warning: listingId is undefined for a ListingCard.");
        return null; // ✅ Prevents rendering a broken component
    }

    /* SLIDER FOR IMAGES */
    const [currentIndex, setCurrentIndex] = useState(0);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    /* Fetch User & Wishlist */
    const user = useSelector((state) => state.user);
    const wishList = useSelector((state) => state.user?.wishList ?? []);

    console.log("📌 Current wishList from Redux:", wishList);

    /* Check if the listing is in the wishlist */
    const isLiked = listingId ? wishList.some(id => id?.toString() === listingId?.toString()) : false;

    console.log("📌 Checking isLiked for listing:", listingId, "Result:", isLiked);

    /* Toggle Wishlist */
    const patchWishList = async () => {
        if (!user?._id || !listingId) {
            console.error("❌ Missing userId or listingId, request will not send");
            return;
        }

        console.log("📌 Sending request to:", `http://localhost:3001/users/${user._id}/${listingId}`);

        try {
            const response = await fetch(
                `http://localhost:3001/users/${user._id}/${listingId}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (!response.ok) {
                console.error("❌ API Request Failed");
                return;
            }

            const data = await response.json();
            console.log("📌 API Response Received:", data);

            if (!data.wishList) {
                console.error("❌ API did not return an updated wishList");
                return;
            }

            console.log("📌 Updating Redux WishList with:", data.wishList);
            dispatch(setWishList([...data.wishList])); // ✅ Ensures new reference
        } catch (error) {
            console.error("❌ Error updating wishlist:", error);
        }
    };

    return (
        <div className="listing-card" onClick={() => navigate(`/properties/${listingId}`)}>
            <div className="slider-container">
                <div className="slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {listingPhotoPaths?.map((photo, index) => (
                        <div key={index} className="slide">
                            <img
                                src={`http://localhost:3001/${photo?.replace("public", "")}`}
                                alt={`photo ${index + 1}`}
                            />
                            <div className="prev-button" onClick={(e) => { e.stopPropagation(); setCurrentIndex((prevIndex) => (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length); }}>
                                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
                            </div>
                            <div className="next-button" onClick={(e) => { e.stopPropagation(); setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length); }}>
                                <ArrowForwardIos sx={{ fontSize: "15px" }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <h3>{city}, {province}, {country}</h3>
            <p>{category}</p>

            {!booking ? (
                <>
                    <p>{type}</p>
                    <p><span>${price}</span> per night</p>
                </>
            ) : (
                <>
                    <p>{new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}</p>
                    <p><span>${totalPrice}</span> total</p>
                </>
            )}

            <button className="favorite" onClick={(e) => { e.stopPropagation(); patchWishList(); }}>
                {isLiked ? <Favorite sx={{ color: "red" }} /> : <Favorite sx={{ color: "white" }} />}
            </button>
        </div>
    );
};

export default ListingCard;
