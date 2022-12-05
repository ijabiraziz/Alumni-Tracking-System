import {
    ALUMNI_FAIL,
    ALUMNI_REQUEST,
    ALUMNI_SUCCESS,

    BULK_ALUMNI_FAIL,
    BULK_ALUMNI_REQUEST,
    BULK_ALUMNI_SUCCESS,
    
} from '../constants/AlumniConstants'

export const alumniReducer= (state={},action)=> {
    switch(action.type){
        case ALUMNI_REQUEST:
            return {loading:true }
        case ALUMNI_SUCCESS:
            return {loading:false , alumni:action.payload}
        case ALUMNI_FAIL:
            return {loading:false ,error: action.payload}
        default :
        return state
    }
}

export const bulk_alumniReducer= (state={},action)=> {
    switch(action.type){
        case BULK_ALUMNI_REQUEST:
            return {loading:true }
        case BULK_ALUMNI_SUCCESS:
            return {loading:false , bulk_alumni:action.payload}
        case BULK_ALUMNI_FAIL:
            return {loading:false ,error: action.payload}
        default :
        return state
    }
}