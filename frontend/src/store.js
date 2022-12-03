import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
// import {productListReducer,  productDetailsReducer} from './reducers/productReducers'
// import { cartReducer } from './reducers/cartReducers'
import { userUpdateProfileReducer,userLoginReducer ,userDetailsReducer, userRegisterReducer } from './reducers/UserReducers'
import {departmentListReducer} from './reducers/DepartmentReducers'
import {alumniReducer} from './reducers/AlumniReducers'

// import { orderCreateReducer, orderDetailsReducer } from './reducers/orderReucers'


const reducer = combineReducers({
    addAlumni:alumniReducer,
    userLogin: userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails : userDetailsReducer,
    userUpdateProfile : userUpdateProfileReducer,
    listDepartments:departmentListReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')?
    JSON.parse(localStorage.getItem('userInfo')):null


const initialState = {
    userLogin : {userInfo: userInfoFromStorage}
}
const middleWare = [thunk]
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleWare)))

export default store