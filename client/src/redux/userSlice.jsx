import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    token: null,
    wishList: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        setLogout: (state) => {
            state.user = null
            state.token = null

        },
        setListing: (state, action) => {
            state.listings = action.payload.listings
        },
        setTripList: (state, action) => {
            console.log("Updating tripList in Redux:", action.payload);
            state.user.tripList = action.payload
        },
        setWishList: (state, action) => {
            console.log("📌 Redux WishList Before Update:", state.user?.wishList);
            console.log("📌 Redux WishList Received:", action.payload);

            if (state.user) {
                // ✅ Ensure all wishList items are stored as strings (no objects)
                state.user.wishList = action.payload.map(item =>
                    typeof item === "string" ? item : item?._id?.toString()
                );
            }

            console.log("📌 Redux WishList After Update:", state.user?.wishList);
        },
        setPropertyList: (state, action) => {
            console.log(action.payload);
            state.user.propertyList = action.payload
        },
        setReservationList: (state, action) => {
            console.log(action.payload);
            state.user.reservationList = action.payload
        }

    }
})

export const { setLogin, setLogout, setListing, setTripList, setWishList, setPropertyList, setReservationList } = userSlice.actions
export default userSlice.reducer