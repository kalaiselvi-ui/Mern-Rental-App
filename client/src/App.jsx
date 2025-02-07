import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import CategoryPage from './pages/CategoryPage'
import CreateListing from './pages/CreateListing'
import Home from './pages/Home'
import ListingDetails from './pages/ListingDetails'
import Login from './pages/Login'
import PropertyList from './pages/PropertyList'
import Register from './pages/Register'
import ReservationList from './pages/ReservationList'
import SearchPage from './pages/SearchPage'
import TripList from './pages/TripList'
import WishList from './pages/WishList'

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/create-listing' element={<CreateListing />} />
            <Route path='/properties/:listingId' element={<ListingDetails />} />
            <Route path='/properties/category/:category' element={<CategoryPage />} />
            <Route path='/properties/search/:search' element={<SearchPage />} />
            <Route path='/:userId/trips' element={<TripList />} />
            <Route path='/:userId/wishList' element={<WishList />} />
            <Route path='/:userId/propertyList' element={<PropertyList />} />
            <Route path='/:userId/reservationList' element={<ReservationList />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
