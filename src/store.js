import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
// import {productListReducer,  productDetailsReducer} from './reducers/productReducers'
// import { cartReducer } from './reducers/cartReducers'
import { userUpdateProfileReducer,userLoginReducer ,userDetailsReducer, userRegisterReducer,
    userUpdatePasswordReducer
} from './reducers/UserReducers'
import {departmentListReducer} from './reducers/DepartmentReducers'
import {DashboardReducer,recentAlumniListReducer} from './reducers/DashboardReducers'
import {alumniReducer, bulk_alumniReducer, ListAllAlumniReducer, ListBsAlumniReducer, ListMsAlumniReducer, ListPhdAlumniReducer,
ListBatchReducer,
ListProgramReducer,
alumniRetriveReducer,
alumniUpdateReducer,
ListSearchAlumniReducer,

} from './reducers/AlumniReducers'

import {generateReportReducers,reportListReducer} from './reducers/ReportReducers'
import { sendEmailReducers } from './reducers/EmailReducers'

// import { orderCreateReducer, orderDetailsReducer } from './reducers/orderReucers'


const reducer = combineReducers({
    add_bulk_Alumni:bulk_alumniReducer,
    addAlumni:alumniReducer,
    userLogin: userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails : userDetailsReducer,
    userUpdateProfile : userUpdateProfileReducer,
    listDepartments:departmentListReducer,
    getDashboardstats:DashboardReducer,
    listRecentAlumnis:recentAlumniListReducer,
    listAllAlumnis: ListAllAlumniReducer,
    listBsAlumnis: ListBsAlumniReducer,
    listMsAlumnis: ListMsAlumniReducer,
    listPhdAlumnis:ListPhdAlumniReducer,
    changePassword:userUpdatePasswordReducer,
    generateReport:generateReportReducers,
    listReports:reportListReducer,
    listBatches:ListBatchReducer,
    listPrograms:ListProgramReducer,
    updateAlumni:alumniUpdateReducer,
    retriveAlumni:alumniRetriveReducer,
    sendEMail:sendEmailReducers,
    searchAlumni:ListSearchAlumniReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')?
    JSON.parse(localStorage.getItem('userInfo')):null


const initialState = {
    userLogin : {userInfo: userInfoFromStorage}
}
const middleWare = [thunk]
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleWare)))

export default store