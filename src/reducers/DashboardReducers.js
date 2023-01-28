import {
    DASHBOARD_FAIL,
    DASHBOARD_REQUEST,
    DASHBOARD_SUCCESS,

    DASHBOARD_TABLE_FAIL,
    DASHBOARD_TABLE_REQUEST,
    DASHBOARD_TABLE_SUCCESS,
    
} from '../constants/DashboardConstants'

export const DashboardReducer= (state={},action)=> {
    switch(action.type){
        case DASHBOARD_REQUEST:
            return {loading:true }
        case DASHBOARD_SUCCESS:
            return {loading:false , dashboard:action.payload}
        case DASHBOARD_FAIL:
            return {loading:false ,error: action.payload}
        default :
        return state
    }
}


export const recentAlumniListReducer= (state={alumnis:[]},action)=> {
    switch(action.type){
        case DASHBOARD_TABLE_REQUEST:
            return {loading:true , alumnis:[]}
        case DASHBOARD_TABLE_SUCCESS:
            return {loading:false , alumnis:action.payload}
        case DASHBOARD_TABLE_FAIL:
            return {loading:false ,error: action.payload}

        default :
        return state
    }
}

