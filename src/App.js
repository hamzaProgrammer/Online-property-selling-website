import './App.css';
import './styles.css';
import 'antd/dist/antd.css';
import {useEffect , useState } from 'react'
import { Routes , Route , useNavigate } from 'react-router-dom'


// Admin Sign In/Sign Up pages
import SignUp from './pages/signup/SignUp'
import SignIn from './pages/SignIn/SignIn'

// Home Page
import Home from './pages/home/Home'

// Single Property
import SingleProperty from './pages/singleProperty/SingleProperty'

// Cities Listings
import CityProperties from './pages/cityProperties/CityProperties'

// Sign up page
import SignUpCust from './pages/webSignUpPage/SignUp'

// Sign in page
import SignInCust from './pages/WebsignIn/SignIn'

// Forget Password
import ForgetPassword from './pages/forgetPassword/ForgetPassword'

// Profile Pages
import ProfilePage from './pages/userProfilePage/ProfilePage'

// Add Property
import AddProperty from './pages/addProperty/AddProducts'

// View Property of a User
import ViewUserProperty from './pages/viewUserProperty/ViewUserProperty'


// Add New Property page
import AddNewProperty from './pages/addNewProperty/AddProperty'

// New View Property
import NewViewProperty from './pages/newViewProperty/ViewProperty'


// Edit profile
import EditProfile from './pages/editprofile/EditProfile'


// All Sell Homes
import AllSellHomes from './pages/allSellHomes/AllSellHomes'


// All Rent Homes
import AllRentHomes from './pages/allRentProperties/AllRentProperties'

// Saved Searches
import SavedSearches from './pages/allSavedSearches/AllSavedSearches'


// Saved Searches Display page
import SavedSearchDisplay from './pages/getSavedSearchPage/SavedSearchData'

// All Saved Properties
import AllSavedProperties from './pages/allSavedProperties/AllSavedProperties'

// Change password page
import ChangePassword from './pages/changePassword/ChangePassword'

// Check Secret Code
import CheckCode from './pages/checkCode/CheckCode'

function App() {
    const [isAdmin, setAdminLogin] = useState(false)
    const location = useNavigate();

    //checking if admin logged in or not
    useEffect(() => {
      const checkAdmin = () => {
        const user = JSON.parse(localStorage.getItem('profile'))
        if (user) {
          setAdminLogin(true)
        } else {
          setAdminLogin(false)
        }
      }
      checkAdmin();
    }, [location])
  return (
    <>
        <Routes>
              <Route exact path="/" element={ <Home/> } />

              <Route exact path="/propertiesOfCity/:city" element={<CityProperties/>} />

              <Route exact path="/singleProperty/:id" element={<SingleProperty/>} />

              <Route exact path="/signup" element={
                  isAdmin ? (
                    <Home/>
                  ) : (
                    <SignUpCust/>
                  )
                }
              />

              <Route exact path="/signin" element={
                  isAdmin ? (
                    <Home/>
                  ) : (
                    <SignInCust/>
                  )
                }
              />

              <Route exact path="/forgetPassword" element={
                  isAdmin ? (
                    <Home/>
                  ) : (
                    <ForgetPassword/>
                  )
                }
              />

              <Route exact path="/checkCode" element={
                  isAdmin ? (
                    <Home/>
                  ) : (
                    <CheckCode/>
                  )
                }
              />

              <Route exact path="/changePassword" element={
                  isAdmin ? (
                    <Home/>
                  ) : (
                    <ChangePassword/>
                  )
                }
              />

              <Route exact path="/profile/:id" element={
                  isAdmin ? (
                    <ProfilePage/>
                  ) : (
                    <SignInCust/>
                  )
                }
              />

            <Route exact path="/viewUserProperty/:id" element={
                  isAdmin ? (
                    <NewViewProperty/>
                  ) : (
                    <SignInCust/>
                  )
                }
              />

              <Route exact path="/addNewProperty" element={<AddNewProperty/>} />

              <Route exact path="/editProfile/:id" element={
                  isAdmin ? (
                    <EditProfile/>
                  ) : (
                    <SignInCust/>
                  )
                }
              />

              <Route exact path="/allSellHomes/:city" element={<AllSellHomes/> } />

              <Route exact path="/allRentHomes/:city" element={<AllRentHomes/>} />

              <Route exact path="/getAllUserSavedSearches/:id" element={
                  isAdmin ? (
                    <SavedSearches/>
                  ) : (
                    <SignInCust/>
                  )
                }
              />

              <Route exact path="/showSavedSearchData" element={
                  isAdmin ? (
                    <SavedSearchDisplay/>
                  ) : (
                    <SignInCust/>
                  )
                }
                />

               <Route exact path="/allSavedProperties/:id" element={
                  isAdmin ? (
                    <AllSavedProperties/>
                  ) : (
                    <SignInCust/>
                  )
                }
              />

        </Routes>
    </>
  );
}

export default App;
